package com.example.toiyeuit.controller.admin;

import com.example.toiyeuit.dto.admin.lesson.LessonCreationRequest;
import com.example.toiyeuit.dto.admin.lesson.LessonUpdateRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.lesson.LessonDTO;
import com.example.toiyeuit.service.admin.AdminLessonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/admin/lessons")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminLessonController {

    AdminLessonService adminLessonService;

    /**
     * Get all lessons with pagination
     */
    @GetMapping
    public ApiResponse<List<LessonDTO>> getAllLessons(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "courseId", required = false) Integer courseId
    ) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<LessonDTO> lessons;

        if (courseId != null) {
            lessons = adminLessonService.getAllLessonsByCourseId(courseId, pageable);
        } else {
            lessons = adminLessonService.getAllLessons(pageable);
        }

        return ApiResponse.<List<LessonDTO>>builder()
                .code(HttpStatus.OK.value())
                .message("Successfully retrieved lessons")
                .body(lessons.getContent())
                .build();
    }

    /**
     * Get lesson by ID with all details
     */
    @GetMapping("/{lessonId}")
    public ApiResponse<LessonDTO> getLessonById(@PathVariable Long lessonId) {
        LessonDTO lesson = adminLessonService.getLessonById(lessonId);

        return ApiResponse.<LessonDTO>builder()
                .code(HttpStatus.OK.value())
                .message("Successfully retrieved lesson")
                .body(lesson)
                .build();
    }

    /**
     * Create a new lesson with grammar and quiz options
     */
    @PostMapping
    public ApiResponse<LessonDTO> createLesson(@Valid @RequestBody LessonCreationRequest request) {
        log.info("Creating new lesson: {}", request.getTitle());

        LessonDTO createdLesson = adminLessonService.createLesson(request);

        return ApiResponse.<LessonDTO>builder()
                .code(HttpStatus.CREATED.value())
                .message("Lesson created successfully")
                .body(createdLesson)
                .build();
    }

    /**
     * Update an existing lesson
     */
    @PutMapping("/{lessonId}")
    public ApiResponse<LessonDTO> updateLesson(
            @PathVariable Long lessonId,
            @Valid @RequestBody LessonUpdateRequest request
    ) {
        log.info("Updating lesson with ID: {}", lessonId);

        LessonDTO updatedLesson = adminLessonService.updateLesson(lessonId, request);

        return ApiResponse.<LessonDTO>builder()
                .code(HttpStatus.OK.value())
                .message("Lesson updated successfully")
                .body(updatedLesson)
                .build();
    }

    /**
     * Delete a lesson and all associated data
     */
    @DeleteMapping("/{lessonId}")
    public ApiResponse<Void> deleteLesson(@PathVariable Long lessonId) {
        log.info("Deleting lesson with ID: {}", lessonId);

        adminLessonService.deleteLesson(lessonId);

        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Lesson deleted successfully")
                .build();
    }

    /**
     * Reorder lessons within a course
     */
    @PutMapping("/course/{courseId}/reorder")
    public ApiResponse<List<LessonDTO>> reorderLessons(
            @PathVariable Integer courseId,
            @RequestBody List<Long> lessonIds
    ) {
        log.info("Reordering lessons for course ID: {}", courseId);

        List<LessonDTO> reorderedLessons = adminLessonService.reorderLessons(courseId, lessonIds);

        return ApiResponse.<List<LessonDTO>>builder()
                .code(HttpStatus.OK.value())
                .message("Lessons reordered successfully")
                .body(reorderedLessons)
                .build();
    }

    /**
     * Duplicate a lesson to another course
     */
    @PostMapping("/{lessonId}/duplicate")
    public ApiResponse<LessonDTO> duplicateLesson(
            @PathVariable Long lessonId,
            @RequestParam Integer targetCourseId
    ) {
        log.info("Duplicating lesson {} to course {}", lessonId, targetCourseId);

        LessonDTO duplicatedLesson = adminLessonService.duplicateLesson(lessonId, targetCourseId);

        return ApiResponse.<LessonDTO>builder()
                .code(HttpStatus.CREATED.value())
                .message("Lesson duplicated successfully")
                .body(duplicatedLesson)
                .build();
    }
}
