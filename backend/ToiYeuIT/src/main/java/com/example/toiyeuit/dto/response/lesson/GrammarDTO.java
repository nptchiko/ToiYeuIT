package com.example.toiyeuit.dto.response.lesson;

import java.time.LocalDateTime;

import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.lesson.Grammar;
import com.example.toiyeuit.entity.lesson.GrammarQuiz;
import com.example.toiyeuit.entity.lesson.QuizUserSubmission;
import com.example.toiyeuit.repository.lesson.UserLessonProgressRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Data
public class GrammarDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LessonDTO lesson;
    private Set<GrammarQuizDTO> quizQuestions;

    public static GrammarDTO fromEntity(Grammar grammar, UserLessonProgressRepository userLessonProgressRepository, Course course) {
        GrammarDTO dto = new GrammarDTO();
        dto.setId(grammar.getId());
        dto.setTitle(grammar.getTitle());
        dto.setContent(grammar.getContent());
        dto.setCreatedAt(grammar.getCreatedAt());
        dto.setUpdatedAt(grammar.getUpdatedAt());

        // Convert lesson if exists
        if (grammar.getLesson() != null) {
            dto.setLesson(LessonDTO.fromEntity(grammar.getLesson(), userLessonProgressRepository, course));
        }

        // Convert quiz questions if exist, filtering user submissions
        if (grammar.getQuizQuestions() != null) {
            dto.setQuizQuestions(grammar.getQuizQuestions().stream()
                    .map(GrammarQuizDTO::fromEntity)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }

/*    @Data
    public static class LessonDTO {
        private Long id;
        private String title;
        private String description;
        private Boolean isSubmitted;
        private Integer orderIndex;
        private String videoUrl;
        private String materialsUrl;

        public static LessonDTO fromEntity(com.example.toiyeuit.entity.lesson.Lesson lesson) {
            LessonDTO dto = new LessonDTO();
            dto.setId(lesson.getId());
            dto.setTitle(lesson.getTitle());
            dto.setDescription(lesson.getDescription());
            dto.setIsSubmitted(lesson.getIsSubmitted());
            dto.setOrderIndex(lesson.getOrderIndex());
            dto.setVideoUrl(lesson.getVideoUrl());
            dto.setMaterialsUrl(lesson.getMaterialsUrl());
            return dto;
        }
    }*/

    @Data
    public static class GrammarQuizDTO {
        private Long id;
        private String questionText;
        private Integer orderIndex;
        private Set<QuizOptionDTO> options;
        private Set<QuizUserSubmissionDTO> userSubmissions;

        public static GrammarQuizDTO fromEntity(GrammarQuiz quiz) {
            GrammarQuizDTO dto = new GrammarQuizDTO();
            dto.setId(quiz.getId());
            dto.setQuestionText(quiz.getQuestionText());
            dto.setOrderIndex(quiz.getOrderIndex());

            // Convert options if exist
            if (quiz.getOptions() != null) {
                dto.setOptions(quiz.getOptions().stream()
                        .map(QuizOptionDTO::fromEntity)
                        .collect(Collectors.toSet()));
            }

            // Filter submissions for current user
            if (quiz.getQuizUserSubmissions() != null) {
                // Get current username from Spring Security context
//                String username = SecurityContextHolder.getContext().getAuthentication().getName();
                String email = SecurityUtils.getCurrentUserLogin();

                dto.setUserSubmissions(quiz.getQuizUserSubmissions().stream()
                        .filter(submission -> submission.getUser().getEmail().equals(email))
                        .map(QuizUserSubmissionDTO::fromEntity)
                        .collect(Collectors.toSet()));
            }

            return dto;
        }
    }

    @Data
    public static class QuizOptionDTO {
        private Long id;
        private String optionText;
        private Boolean isCorrect;

        public static QuizOptionDTO fromEntity(com.example.toiyeuit.entity.lesson.QuizOption option) {
            QuizOptionDTO dto = new QuizOptionDTO();
            dto.setId(option.getId());
            dto.setOptionText(option.getOptionText());
            dto.setIsCorrect(option.getIsCorrect());
            return dto;
        }
    }

    @Data
    public static class QuizUserSubmissionDTO {
        private Long id;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private Long selectedOptionId;

        public static QuizUserSubmissionDTO fromEntity(QuizUserSubmission submission) {
            QuizUserSubmissionDTO dto = new QuizUserSubmissionDTO();
            dto.setId(submission.getId());
            dto.setCreatedAt(submission.getCreatedAt());
            dto.setUpdatedAt(submission.getUpdatedAt());

            // Only set selected option ID if it exists
            if (submission.getSelectedOption() != null) {
                dto.setSelectedOptionId(submission.getSelectedOption().getId());
            }

            return dto;
        }
    }
}