package com.example.toiyeuit.service.lesson;

import com.example.toiyeuit.dto.request.QuizUserSubmissionRequest;
import com.example.toiyeuit.dto.response.lesson.GrammarDTO;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.lesson.*;
import com.example.toiyeuit.exception.LessonServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.repository.lesson.*;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final GrammarRespository grammarRespository;
    private final QuizUserSubmissionRepository quizUserSubmissionRepository;
    private final UserRepository userRepository;
    private final GrammarQuizRepository grammarQuizRepository;
    private final QuizOptionRepository quizOptionRepository;

    // Map to store user-lesson specific locks to handle concurrent submissions
    private final Map<String, Lock> userLessonLocks = new ConcurrentHashMap<>();

    public List<Lesson> findAllLessonByCourseId(Integer courseId) {
        return lessonRepository.findAllByCourseId(courseId);
    }

    public GrammarDTO findGrammarByLessonId(Integer courseId, Long lessonId) throws ResourceNotFoundException {
        validateCourseAndLesson(courseId, lessonId);

        Grammar grammar = grammarRespository.findByLessonId(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Grammar for lesson with id " + lessonId + " not found"));

        return GrammarDTO.fromEntity(grammar);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public QuizUserSubmission saveUserSubmission(Integer courseId, Long lessonId, QuizUserSubmissionRequest request)
            throws ResourceNotFoundException, LessonServiceLogicException {

        // Get current user first for the lock key
        User user = getCurrentUser();
        // Create a unique key for this user-lesson combination
        String lockKey = user.getId() + "-" + lessonId;

        // Get or create a lock for this user-lesson combination
        Lock userLessonLock = userLessonLocks.computeIfAbsent(lockKey, k -> new ReentrantLock());

        try {
            // Acquire lock to prevent concurrent modifications for the same user-lesson
            userLessonLock.lock();
            log.debug("Acquired lock for user {} on lesson {}", user.getId(), lessonId);

            if (!courseRepository.existsById(courseId)) {
                throw new ResourceNotFoundException("Course with id " + courseId + " not found");
            }

            Lesson lesson = lessonRepository.findById(lessonId)
                    .orElseThrow(() -> new ResourceNotFoundException("Lesson with id " + lessonId + " not found"));

            validateCourseAndLesson(courseId, lessonId);

            QuizUserSubmission submission = processQuizSubmission(user, lesson, request);

            return submission;
        } finally {
            userLessonLock.unlock();
            log.debug("Released lock for user {} on lesson {}", user.getId(), lessonId);
        }
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    protected QuizUserSubmission processQuizSubmission(User user, Lesson lesson, QuizUserSubmissionRequest request)
            throws ResourceNotFoundException {
        try {
            QuizUserSubmission submission = findOrCreateSubmission(user, request);

//            quizUserSubmissionRepository.flush();
            checkAndUpdateLessonCompletion(lesson, user);

            return submission;
        } catch (DataAccessException e) {
            log.error("Database error while processing quiz submission: {}", e.getMessage());
            throw new LessonServiceLogicException("Error processing quiz submission. Please try again.");
        }
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    protected void checkAndUpdateLessonCompletion(Lesson lesson, User user) {
        try {
            Lesson freshLesson = lessonRepository.findById(lesson.getId()).orElse(null);
            if (freshLesson == null) return;

            if (freshLesson.getIsSubmitted()) {
                return;
            }

            Optional<Grammar> grammarOptional = grammarRespository.findByLessonId(freshLesson.getId());
            if (!grammarOptional.isPresent()) return;

            Grammar grammar = grammarOptional.get();
            List<GrammarQuiz> allQuizzes = grammarQuizRepository.findAllByGrammarId(grammar.getId());

            log.debug("Checking completion for lesson {}. Total quizzes: {}", lesson.getId(), allQuizzes.size());

            // Check each quiz submission
            boolean allCompleted = true;
            for (GrammarQuiz quiz : allQuizzes) {
                boolean submitted = quizUserSubmissionRepository.existsByUserIdAndQuestionId(user.getId(), quiz.getId());
                log.debug("Quiz {} submission status: {}", quiz.getId(), submitted);
                if (!submitted) {
                    allCompleted = false;
                    break;
                }
            }

            if (allCompleted) {
                log.info("All quizzes completed for lesson {}. Marking as submitted.", lesson.getId());
                freshLesson.setIsSubmitted(true);
                lessonRepository.saveAndFlush(freshLesson);
            }
        } catch (Exception e) {
            log.error("Error checking lesson completion: {}", e.getMessage());
        }
    }

    private void validateCourseAndLesson(Integer courseId, Long lessonId) throws ResourceNotFoundException {
        lessonRepository.findByIdAndCourseId(lessonId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Course id and lesson id do not match. Please verify that the course contains this lesson"));
    }

    private User getCurrentUser() throws LessonServiceLogicException {
        return userRepository.findByEmail(SecurityUtils.getCurrentUserLogin())
                .orElseThrow(() -> new LessonServiceLogicException("You must be logged in to save your answer"));
    }

    private QuizUserSubmission findOrCreateSubmission(User user, QuizUserSubmissionRequest request)
            throws ResourceNotFoundException {
        Optional<QuizUserSubmission> existingSubmission =
                quizUserSubmissionRepository.findByUserIdAndQuestionId(user.getId(), request.getQuizId());

        if (existingSubmission.isPresent()) {
            return updateUserSubmission(existingSubmission.get(), request);
        } else {
            return createNewSubmission(user, request);
        }
    }

    private QuizUserSubmission updateUserSubmission(QuizUserSubmission submission, QuizUserSubmissionRequest request)
            throws ResourceNotFoundException {
        QuizOption option = quizOptionRepository.findById(request.getOptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Option with id " + request.getOptionId() + " not found"));

        submission.setSelectedOption(option);
        return quizUserSubmissionRepository.save(submission);
    }

    private QuizUserSubmission createNewSubmission(User user, QuizUserSubmissionRequest request)
            throws ResourceNotFoundException {
        if (!quizOptionRepository.existsByIdAndQuestionId(request.getOptionId(), request.getQuizId())) {
            throw new ResourceNotFoundException("Selected option must match the quiz options");
        }

        GrammarQuiz grammarQuiz = grammarQuizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz with id " + request.getQuizId() + " not found"));

        QuizOption quizOption = quizOptionRepository.findById(request.getOptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz option with id " + request.getOptionId() + " not found"));

        QuizUserSubmission quizUserSubmission = QuizUserSubmission.builder()
                .user(user)
                .question(grammarQuiz)
                .selectedOption(quizOption)
                .build();

        return quizUserSubmissionRepository.save(quizUserSubmission);
    }
}