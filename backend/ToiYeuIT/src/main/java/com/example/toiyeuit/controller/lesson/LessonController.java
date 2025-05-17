package com.example.toiyeuit.controller.lesson;

import com.example.toiyeuit.dto.request.QuizUserSubmissionRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.lesson.GrammarDTO;
import com.example.toiyeuit.entity.lesson.Grammar;
import com.example.toiyeuit.entity.lesson.Lesson;
import com.example.toiyeuit.entity.lesson.QuizUserSubmission;
import com.example.toiyeuit.service.lesson.LessonService;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/lessons")
@AllArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/{courseId}")
    public ApiResponse<List<Lesson>> findAllLessonByCourseId(@PathVariable Integer courseId) {

        List<Lesson> lessons = lessonService.findAllLessonByCourseId(courseId);
        return ApiResponse.<List<Lesson>>builder()
                .message("Successfully retrieved all lessons")
                .code(200)
                .body(lessons)
                .build();
    }

    @GetMapping("/{courseId}/{lessonId}")
    public ApiResponse<GrammarDTO> findGrammarByLessonIdAndCourseId(@PathVariable Integer courseId, @PathVariable Long lessonId) {

        return ApiResponse.<GrammarDTO>builder()
                .message("Successfully retrieved grammar")
                .code(200)
                .body(lessonService.findGrammarByLessonId(lessonId))
                .build();
    }

    @PostMapping("/{courseId}/{lessonId}")
    public ApiResponse<QuizUserSubmission> saveUserAnswer(@PathVariable Integer courseId, @PathVariable Long lessonId, @RequestBody QuizUserSubmissionRequest request) {

        return ApiResponse.<QuizUserSubmission>builder()
                .message("Your answer was saved successfully")
                .code(HttpStatus.CREATED.value())
                .body(lessonService.saveUserSubmission(courseId, lessonId, request))
                .build();
    }
}
