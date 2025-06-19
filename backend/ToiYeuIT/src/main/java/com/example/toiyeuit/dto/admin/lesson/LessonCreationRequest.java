package com.example.toiyeuit.dto.admin.lesson;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class LessonCreationRequest {

    @NotBlank(message = "Lesson title is required")
    private String title;

    private String description;

    @NotNull(message = "Course ID is required")
    @Positive(message = "Course ID must be positive")
    private Integer courseId;

    @NotNull(message = "Order index is required")
    @Positive(message = "Order index must be positive")
    private Integer orderIndex;

    private String videoUrl;

    private String materialsUrl;

    @Valid
    private GrammarCreationRequest grammar;

    @Data
    public static class GrammarCreationRequest {

        @NotBlank(message = "Grammar title is required")
        private String title;

        @NotBlank(message = "Grammar content is required")
        private String content;

        @Valid
        private List<QuizCreationRequest> quizzes;

        @Data
        public static class QuizCreationRequest {

            @NotBlank(message = "Question text is required")
            private String questionText;

            @NotNull(message = "Quiz order index is required")
            @Positive(message = "Quiz order index must be positive")
            private Integer orderIndex;

            @Valid
            @NotNull(message = "Quiz options are required")
            private List<QuizOptionCreationRequest> options;

            @Data
            public static class QuizOptionCreationRequest {

                @NotBlank(message = "Option text is required")
                private String optionText;

                @NotNull(message = "isCorrect flag is required")
                private Boolean isCorrect;
            }
        }
    }
}