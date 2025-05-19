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
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final GrammarRespository grammarRespository;
    private final QuizUserSubmissionRepository quizUserSubmissionRepository;
    private final UserRepository userRepository;
    private final GrammarQuizRepository grammarQuizRepository;
    private final QuizOptionRepository quizOptionRepository;

    public List<Lesson> findAllLessonByCourseId(Integer courseId) {
        return lessonRepository.findAllByCourseId(courseId);
    }

    public GrammarDTO findGrammarByLessonId(Integer courseId, Long lessonId) throws ResourceNotFoundException {
        checkValidCourseIdAndLessonId(courseId, lessonId);

        Grammar grammar = grammarRespository.findByLessonId(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson with id " + lessonId + " not found"));
        return GrammarDTO.fromEntity(grammar);
    }

    @Transactional
    public QuizUserSubmission updateUserSubmission(QuizUserSubmission quiz, QuizUserSubmissionRequest request)
            throws ResourceNotFoundException {
        QuizOption option = quizOptionRepository
                .findById(request.getOptionId()).orElseThrow(() -> new ResourceNotFoundException("Option with id " + request.getOptionId() + " not found"));
        quiz.setSelectedOption(option);
        return quizUserSubmissionRepository.save(quiz);
    }

    @Transactional
    public QuizUserSubmission saveUserSubmission(Integer courseId, Long lessonId, QuizUserSubmissionRequest request) throws
            ResourceNotFoundException {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Course with id " + courseId + " not found");
        }

        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty()) {
            throw new ResourceNotFoundException("Lesson with id " + lessonId + " not found");
        }

        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserLogin()).orElseThrow(
                () -> new LessonServiceLogicException("You must logged in to save your answer")
        );

        checkValidCourseIdAndLessonId(courseId, lessonId);

       Optional<QuizUserSubmission> existedQuizUserSubmission = quizUserSubmissionRepository.findByUserIdAndQuestionId(user.getId(), request.getQuizId());
        if (existedQuizUserSubmission.isPresent()) {
            return updateUserSubmission(existedQuizUserSubmission.get(), request);
        }

        if (!quizOptionRepository.existsByIdAndQuestionId(request.getOptionId(), request.getQuizId())) {
            throw new ResourceNotFoundException("Selected option must match quiz option.");
        }

        GrammarQuiz grammarQuiz = grammarQuizRepository
                .findById(request.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz with id " + request.getQuizId() + " not found"));

        QuizOption quizOption = quizOptionRepository
                .findById(request.getOptionId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Quiz option with id " + request.getOptionId() + " not found"));
        QuizUserSubmission quizUserSubmission = QuizUserSubmission.builder()
                .user(user)
                .question(grammarQuiz)
                .selectedOption(quizOption)
                .build();

        QuizUserSubmission returnedQuizUserSubmission = quizUserSubmissionRepository.save(quizUserSubmission);

        Optional<Grammar> grammar = grammarRespository.findByLessonId(lessonId);
        if (grammar.isPresent()) {
            List<GrammarQuiz> quizzes = grammarQuizRepository.findAllByGrammarId(grammar.get().getId());
            for (var quiz : quizzes) {
                if (!quizUserSubmissionRepository.existsByUserIdAndQuestionId(user.getId(), quiz.getId())) {
                    return returnedQuizUserSubmission;
                }
            }
        }

        lesson.get().setIsSubmitted(true);
        lessonRepository.save(lesson.get());
        return returnedQuizUserSubmission;
    }

    public void checkValidCourseIdAndLessonId(Integer courseId, Long lessonId) throws ResourceNotFoundException {
        lessonRepository.findByIdAndCourseId(lessonId, courseId).orElseThrow(() ->
                new ResourceNotFoundException("Course id and lesson id not match. Please recheck if your course is consists of this lesson"));
    }
}
