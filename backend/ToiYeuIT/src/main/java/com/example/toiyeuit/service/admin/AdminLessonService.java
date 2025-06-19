package com.example.toiyeuit.service.admin;

import com.example.toiyeuit.dto.admin.lesson.LessonCreationRequest;
import com.example.toiyeuit.dto.admin.lesson.LessonUpdateRequest;
import com.example.toiyeuit.dto.response.lesson.LessonDTO;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.lesson.*;
import com.example.toiyeuit.exception.LessonServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.lesson.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminLessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final GrammarRespository grammarRepository;
    private final GrammarQuizRepository grammarQuizRepository;
    private final QuizOptionRepository quizOptionRepository;
    private final UserLessonProgressRepository userLessonProgressRepository;

    public Page<LessonDTO> getAllLessons(Pageable pageable) {
        Page<Lesson> lessonsPage = lessonRepository.findAll(pageable);
        List<LessonDTO> lessonDTOs = lessonsPage.getContent().stream()
                .map(lesson -> LessonDTO.fromEntity(lesson, userLessonProgressRepository, lesson.getCourse()))
                .collect(Collectors.toList());

        return new PageImpl<>(lessonDTOs, pageable, lessonsPage.getTotalElements());
    }

    public Page<LessonDTO> getAllLessonsByCourseId(Integer courseId, Pageable pageable) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        Page<Lesson> lessonsPage = lessonRepository.findAllByCourseId(courseId, pageable);
        List<LessonDTO> lessonDTOs = lessonsPage.getContent().stream()
                .map(lesson -> LessonDTO.fromEntity(lesson, userLessonProgressRepository, course))
                .collect(Collectors.toList());

        return new PageImpl<>(lessonDTOs, pageable, lessonsPage.getTotalElements());
    }

    public LessonDTO getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));

        return LessonDTO.fromEntity(lesson, userLessonProgressRepository, lesson.getCourse());
    }

    @Transactional
    public LessonDTO createLesson(LessonCreationRequest request) {
        log.info("Creating lesson: {}", request.getTitle());

        // Validate course exists
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        // Check if order index is already taken
        if (lessonRepository.existsByCourseIdAndOrderIndex(request.getCourseId(), request.getOrderIndex())) {
            throw new LessonServiceLogicException("Order index " + request.getOrderIndex() + " is already taken for this course");
        }

        // Create lesson
        Lesson lesson = Lesson.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .course(course)
                .orderIndex(request.getOrderIndex())
                .videoUrl(request.getVideoUrl())
                .materialsUrl(request.getMaterialsUrl())
                .build();

        lesson = lessonRepository.save(lesson);
        log.info("Lesson created with id: {}", lesson.getId());

        // Create grammar if provided
        if (request.getGrammar() != null) {
            createGrammarForLesson(lesson, request.getGrammar());
        }

        return LessonDTO.fromEntity(lesson, userLessonProgressRepository, course);
    }

    @Transactional
    public LessonDTO updateLesson(Long lessonId, LessonUpdateRequest request) {
        log.info("Updating lesson with id: {}", lessonId);

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));

        // Check if new order index conflicts with existing lessons (excluding current lesson)
        if (request.getOrderIndex() != null &&
            !request.getOrderIndex().equals(lesson.getOrderIndex()) &&
            lessonRepository.existsByCourseIdAndOrderIndexAndIdNot(
                lesson.getCourse().getId(), request.getOrderIndex(), lessonId)) {
            throw new LessonServiceLogicException("Order index " + request.getOrderIndex() + " is already taken for this course");
        }

        // Update lesson fields
        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        if (request.getOrderIndex() != null) {
            lesson.setOrderIndex(request.getOrderIndex());
        }
        lesson.setVideoUrl(request.getVideoUrl());
        lesson.setMaterialsUrl(request.getMaterialsUrl());

        lesson = lessonRepository.save(lesson);

        // Update grammar if provided
        if (request.getGrammar() != null) {
            updateGrammarForLesson(lesson, request.getGrammar());
        }

        return LessonDTO.fromEntity(lesson, userLessonProgressRepository, lesson.getCourse());
    }

    @Transactional
    public void deleteLesson(Long lessonId) {
        log.info("Deleting lesson with id: {}", lessonId);

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));

        // Delete user progress records
        userLessonProgressRepository.deleteByLessonId(lessonId);

        // JPA cascade will handle grammar, quizzes, options, and submissions
        lessonRepository.delete(lesson);

        log.info("Lesson deleted successfully: {}", lessonId);
    }

    @Transactional
    public List<LessonDTO> reorderLessons(Integer courseId, List<Long> lessonIds) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        List<Lesson> lessons = lessonRepository.findAllById(lessonIds);

        // Validate all lessons belong to the course
        boolean allBelongToCourse = lessons.stream()
                .allMatch(lesson -> lesson.getCourse().getId().equals(courseId));

        if (!allBelongToCourse) {
            throw new LessonServiceLogicException("Some lessons do not belong to the specified course");
        }

        // Update order indices
        for (int i = 0; i < lessonIds.size(); i++) {
            Long lessonId = lessonIds.get(i);
            Lesson lesson = lessons.stream()
                    .filter(l -> l.getId().equals(lessonId))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + lessonId));

            lesson.setOrderIndex(i + 1);
        }

        List<Lesson> savedLessons = lessonRepository.saveAll(lessons);

        return savedLessons.stream()
                .map(lesson -> LessonDTO.fromEntity(lesson, userLessonProgressRepository, course))
                .collect(Collectors.toList());
    }

    @Transactional
    public LessonDTO duplicateLesson(Long lessonId, Integer targetCourseId) {
        Lesson originalLesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));

        Course targetCourse = courseRepository.findById(targetCourseId)
                .orElseThrow(() -> new ResourceNotFoundException("Target course not found with id: " + targetCourseId));

        // Find next available order index
        Integer nextOrderIndex = lessonRepository.findMaxOrderIndexByCourseId(targetCourseId)
                .map(max -> max + 1)
                .orElse(1);

        // Create new lesson
        Lesson newLesson = Lesson.builder()
                .title(originalLesson.getTitle() + " (Copy)")
                .description(originalLesson.getDescription())
                .course(targetCourse)
                .orderIndex(nextOrderIndex)
                .videoUrl(originalLesson.getVideoUrl())
                .materialsUrl(originalLesson.getMaterialsUrl())
                .build();

        newLesson = lessonRepository.save(newLesson);

        // Duplicate grammar if exists
        if (originalLesson.getGrammar() != null) {
            duplicateGrammarForLesson(originalLesson.getGrammar(), newLesson);
        }

        return LessonDTO.fromEntity(newLesson, userLessonProgressRepository, targetCourse);
    }

    private void createGrammarForLesson(Lesson lesson, LessonCreationRequest.GrammarCreationRequest grammarRequest) {
        Grammar grammar = Grammar.builder()
                .title(grammarRequest.getTitle())
                .content(grammarRequest.getContent())
                .lesson(lesson)
                .build();

        grammar = grammarRepository.save(grammar);
        log.info("Grammar created with id: {}", grammar.getId());

        if (grammarRequest.getQuizzes() != null) {
            createQuizzesForGrammar(grammar, grammarRequest.getQuizzes());
        }
    }

    private void updateGrammarForLesson(Lesson lesson, LessonUpdateRequest.GrammarUpdateRequest grammarRequest) {
        Grammar grammar;

        if (grammarRequest.getId() != null) {
            // Update existing grammar
            grammar = grammarRepository.findById(grammarRequest.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Grammar not found with id: " + grammarRequest.getId()));
        } else {
            // Create new grammar
            grammar = Grammar.builder()
                    .lesson(lesson)
                    .build();
        }

        grammar.setTitle(grammarRequest.getTitle());
        grammar.setContent(grammarRequest.getContent());
        grammar = grammarRepository.save(grammar);

        if (grammarRequest.getQuizzes() != null) {
            updateQuizzesForGrammar(grammar, grammarRequest.getQuizzes());
        }
    }

    private void createQuizzesForGrammar(Grammar grammar, List<LessonCreationRequest.GrammarCreationRequest.QuizCreationRequest> quizRequests) {
        for (LessonCreationRequest.GrammarCreationRequest.QuizCreationRequest quizRequest : quizRequests) {
            GrammarQuiz quiz = GrammarQuiz.builder()
                    .questionText(quizRequest.getQuestionText())
                    .orderIndex(quizRequest.getOrderIndex())
                    .grammar(grammar)
                    .build();

            quiz = grammarQuizRepository.save(quiz);
            log.info("Quiz created with id: {}", quiz.getId());

            if (quizRequest.getOptions() != null) {
                createOptionsForQuiz(quiz, quizRequest.getOptions());
            }
        }
    }

    private void updateQuizzesForGrammar(Grammar grammar, List<LessonUpdateRequest.GrammarUpdateRequest.QuizUpdateRequest> quizRequests) {
        for (LessonUpdateRequest.GrammarUpdateRequest.QuizUpdateRequest quizRequest : quizRequests) {
            if (Boolean.TRUE.equals(quizRequest.getToDelete()) && quizRequest.getId() != null) {
                // Delete existing quiz
                grammarQuizRepository.deleteById(quizRequest.getId());
                continue;
            }

            GrammarQuiz quiz;
            if (quizRequest.getId() != null) {
                // Update existing quiz
                quiz = grammarQuizRepository.findById(quizRequest.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizRequest.getId()));
            } else {
                // Create new quiz
                quiz = GrammarQuiz.builder()
                        .grammar(grammar)
                        .build();
            }

            quiz.setQuestionText(quizRequest.getQuestionText());
            quiz.setOrderIndex(quizRequest.getOrderIndex());
            quiz = grammarQuizRepository.save(quiz);

            if (quizRequest.getOptions() != null) {
                updateOptionsForQuiz(quiz, quizRequest.getOptions());
            }
        }
    }

    private void createOptionsForQuiz(GrammarQuiz quiz, List<LessonCreationRequest.GrammarCreationRequest.QuizCreationRequest.QuizOptionCreationRequest> optionRequests) {
        for (LessonCreationRequest.GrammarCreationRequest.QuizCreationRequest.QuizOptionCreationRequest optionRequest : optionRequests) {
            QuizOption option = QuizOption.builder()
                    .optionText(optionRequest.getOptionText())
                    .isCorrect(optionRequest.getIsCorrect())
                    .question(quiz)
                    .build();

            quizOptionRepository.save(option);
        }
    }

    private void updateOptionsForQuiz(GrammarQuiz quiz, List<LessonUpdateRequest.GrammarUpdateRequest.QuizUpdateRequest.QuizOptionUpdateRequest> optionRequests) {
        for (LessonUpdateRequest.GrammarUpdateRequest.QuizUpdateRequest.QuizOptionUpdateRequest optionRequest : optionRequests) {
            if (Boolean.TRUE.equals(optionRequest.getToDelete()) && optionRequest.getId() != null) {
                // Delete existing option
                quizOptionRepository.deleteById(optionRequest.getId());
                continue;
            }

            QuizOption option;
            if (optionRequest.getId() != null) {
                // Update existing option
                option = quizOptionRepository.findById(optionRequest.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Option not found with id: " + optionRequest.getId()));
            } else {
                // Create new option
                option = QuizOption.builder()
                        .question(quiz)
                        .build();
            }

            option.setOptionText(optionRequest.getOptionText());
            option.setIsCorrect(optionRequest.getIsCorrect());
            quizOptionRepository.save(option);
        }
    }

    private void duplicateGrammarForLesson(Grammar originalGrammar, Lesson newLesson) {
        Grammar newGrammar = Grammar.builder()
                .title(originalGrammar.getTitle())
                .content(originalGrammar.getContent())
                .lesson(newLesson)
                .build();

        newGrammar = grammarRepository.save(newGrammar);

        // Duplicate quizzes
        if (originalGrammar.getQuizQuestions() != null) {
            for (GrammarQuiz originalQuiz : originalGrammar.getQuizQuestions()) {
                duplicateQuizForGrammar(originalQuiz, newGrammar);
            }
        }
    }

    private void duplicateQuizForGrammar(GrammarQuiz originalQuiz, Grammar newGrammar) {
        GrammarQuiz newQuiz = GrammarQuiz.builder()
                .questionText(originalQuiz.getQuestionText())
                .orderIndex(originalQuiz.getOrderIndex())
                .grammar(newGrammar)
                .build();

        newQuiz = grammarQuizRepository.save(newQuiz);

        // Duplicate options
        if (originalQuiz.getOptions() != null) {
            for (QuizOption originalOption : originalQuiz.getOptions()) {
                QuizOption newOption = QuizOption.builder()
                        .optionText(originalOption.getOptionText())
                        .isCorrect(originalOption.getIsCorrect())
                        .question(newQuiz)
                        .build();

                quizOptionRepository.save(newOption);
            }
        }
    }
}