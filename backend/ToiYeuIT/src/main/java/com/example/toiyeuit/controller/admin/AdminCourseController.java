package com.example.toiyeuit.controller.admin;


import com.example.toiyeuit.dto.admin.CrudCourseRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.OrderCourseResponse;
import com.example.toiyeuit.dto.response.admin.AdminOrderCourseResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.service.admin.AdminCourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

   @PostMapping
    public ApiResponse<Course> addCourse(@RequestBody CrudCourseRequest request){
        return ApiResponse.<Course>builder()
                .code(200)
                .body(courseService.saveCourse(request))
                .message("Course created successfully")
                .build();
    }
    @PutMapping("/{id}")
    public ApiResponse<Course> updateCourse(@PathVariable("id") int id, @RequestBody CrudCourseRequest request){
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
    public ApiResponse<?> toggleCourseVisibility(@PathVariable("id") int id,@RequestParam("isEnabled") boolean isEnabled){
        courseService.toggleVisiable(id, isEnabled);
        return ApiResponse.builder()
                .code(200)
                .message("Toggle course okay!")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteCourse(@PathVariable("id") int id){
        courseService.deleteCourse(id);
        return ApiResponse.<Void>builder()
                .code(200)
                .message(String.format("Deleted course with id=%d", id))
                .build();
    }

    @GetMapping("/order-history")
    public ApiResponse<AdminOrderCourseResponse> getOrderHistory(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        Sort sort = Sort.by(Sort.Direction.DESC,"createdAt");
        Pageable pageable = PageRequest.of(page-1, size, sort);

        var result = courseService.getOrderHistory(pageable);

        return ApiResponse.<AdminOrderCourseResponse>builder()
                .code(200)
                .body(result)
                .build();

    }

}
