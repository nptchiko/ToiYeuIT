package com.example.toiyeuit.controller.admin;


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

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminCourseController {

    AdminCourseService courseService;

    @GetMapping
    public ApiResponse<Page<Course>> getAllCourses(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page-1, size);
    //    Page<Course> course = courseService.
        return null;
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
    public ApiResponse<?> toggleCourseVisibility(@PathVariable("id") int id, @RequestParam boolean isEnabled){

    }

}
