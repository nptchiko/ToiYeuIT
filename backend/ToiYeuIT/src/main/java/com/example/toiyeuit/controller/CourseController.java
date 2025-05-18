package com.example.toiyeuit.controller;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

    @GetMapping
    public ApiResponse<List<Course>> getAllCourses() {
        List<Course> courses = courseService.findAllActiveCourse();

        return ApiResponse.<List<Course>>builder()
                .body(courses)
                .message("All active courses")
                .code(200)
                .build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Integer id) throws ResourceNotFoundException {
        Course course = courseService.findById(id);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }
}
