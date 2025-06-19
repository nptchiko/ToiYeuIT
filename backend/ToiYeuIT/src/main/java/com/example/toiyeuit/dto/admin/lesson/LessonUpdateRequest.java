package com.example.toiyeuit.dto.admin.lesson;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class LessonUpdateRequest {

    @NotBlank(message = "Lesson title is required")
    private String title;

    private String description;

    @Positive(message = "Order index must be positive")
    private Integer orderIndex;

    private String videoUrl;

    private String materialsUrl;

    @Valid
    private GrammarUpdateRequest grammar;

    @Data
    public static class GrammarUpdateRequest {

        private Integer id; // For updating existing grammar

        @NotBlank(message = "Grammar title is required")
        private String title;

        @NotBlank(message = "Grammar content is required")
        private String content;

        @Valid
        private List<QuizUpdateRequest> quizzes;

        @Data
        public static class QuizUpdateRequest {

            private Long id; // For updating existing quiz

            @NotBlank(message = "Question text is required")
            private String questionText;

            @Positive(message = "Quiz order index must be positive")
            private Integer orderIndex;

            @Valid
            private List<QuizOptionUpdateRequest> options;

            // Flag to indicate if this quiz should be deleted
            private Boolean toDelete = false;

            @Data
            public static class QuizOptionUpdateRequest {

                private Long id; // For updating existing option

                @NotBlank(message = "Option text is required")
                private String optionText;

                private Boolean isCorrect;

                // Flag to indicate if this option should be deleted
                private Boolean toDelete = false;
            }
        }
    }
}