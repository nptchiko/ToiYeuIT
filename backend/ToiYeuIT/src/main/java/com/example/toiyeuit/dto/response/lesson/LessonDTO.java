package com.example.toiyeuit.dto.response.lesson;

import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.lesson.Grammar;
import com.example.toiyeuit.entity.lesson.GrammarQuiz;
import com.example.toiyeuit.entity.lesson.Lesson;
import com.example.toiyeuit.entity.lesson.UserLessonProgress;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.lesson.GrammarRespository;
import com.example.toiyeuit.repository.lesson.UserLessonProgressRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.Data;

@Data
public class LessonDTO {
    private Long id;
    private String title;
    private String description;
    private Boolean isSubmitted;
    private Integer orderIndex;
    private String videoUrl;
    private String materialsUrl;
    private Course course;
    private Integer sections;

    public static LessonDTO fromEntity(Lesson lesson, UserLessonProgressRepository userLessonProgressRepository, Course course) {
        LessonDTO dto = new LessonDTO();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setOrderIndex(lesson.getOrderIndex());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setMaterialsUrl(lesson.getMaterialsUrl());
        dto.setCourse(course);

        // Get current user's submission status for this lesson
        String currentUserEmail = SecurityUtils.getCurrentUserLogin();
        if (currentUserEmail != null) {
            userLessonProgressRepository.findByUserEmailAndLessonId(currentUserEmail, lesson.getId())
                    .ifPresent(progress -> dto.setIsSubmitted(progress.getIsSubmitted()));
        } else {
            dto.setIsSubmitted(false);
        }

        return dto;
    }
}