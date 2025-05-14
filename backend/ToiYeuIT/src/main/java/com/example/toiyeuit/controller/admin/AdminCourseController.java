package com.example.toiyeuit.controller.admin;


import com.example.toiyeuit.dto.admin.UpdateCourseRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.service.admin.AdminCourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminCourseController {

    AdminCourseService courseService;

    @GetMapping
    public ApiResponse<List<Course>> getAllCourses(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size){
        Pageable pageable = PageRequest.of(page-1, size);
        Page<Course> course = courseService.getAll(pageable);

        return ApiResponse.<List<Course>>builder()
                .code(200)
                .message("All available course")
                .body(course.getContent())
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<Course> updateCourse(@PathVariable("id") int id, @RequestBody UpdateCourseRequest request){
        var body = courseService.updateCourse(id, request);
        return ApiResponse.<Course>builder()
                .code(200)
                .message("Update course okay!")
                .body(body)
                .build();
    }

    @GetMapping("/revenue")
    public ApiResponse<Long> getRevenue(){
        return ApiResponse.<Long>builder()
                .code(200)
                .message("Monthly revenue")
                .body(courseService.getRevenue())
                .build();
    }

    @PatchMapping("/{id}/visibility")
    public ApiResponse<?> toggleCourseVisibility(@PathVariable("id") int id, boolean isEnabled){
        courseService.toggleVisiable(id, isEnabled);
        return ApiResponse.builder()
                .code(200)
                .message("Toggle course okay!")
                .build();
    }

}
