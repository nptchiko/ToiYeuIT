package com.example.toiyeuit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonRequestDTO {
    private String title;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private Integer courseId;
    private Integer skillId;
}
