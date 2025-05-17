package com.example.toiyeuit.dto.response;

import com.example.toiyeuit.entity.lesson.Grammar;
import com.example.toiyeuit.entity.lesson.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LessonResponse {
    private Long lessonId;
    private String title;
    private String description;
    private Integer sections;
    private Boolean isSubmitted;
    private Integer orderIndex;
    private String videoUrl;
    private String materialsUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer courseId;
    private Grammar grammar;

}
