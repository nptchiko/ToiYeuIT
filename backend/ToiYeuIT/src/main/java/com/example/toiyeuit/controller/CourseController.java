package com.example.toiyeuit.controller;
import com.example.toiyeuit.dto.request.CourseRequestDTO;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.enums.Level;
import com.example.toiyeuit.exception.AlreadyExistsException;
import com.example.toiyeuit.exception.CourseServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final CourseRepository courseRepository;

    public CourseController(CourseService courseService, CourseRepository courseRepository) {
        this.courseService = courseService;
        this.courseRepository = courseRepository;
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

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseRequestDTO course) throws CourseServiceLogicException,
            AlreadyExistsException {

        Course courseEntity = Course.builder()
                .title(course.getTitle())
                .description(course.getDescription())
                .level(Level.fromString(course.getLevel()))
                .price(course.getPrice())
                .enabled(course.getEnabled())
                .duration(course.getDuration())
                .build();

        Course createdCourse = courseRepository.save(courseEntity);
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Course> updateCourse(@RequestBody Course course) throws CourseServiceLogicException,
            ResourceNotFoundException {

        return new ResponseEntity<>(courseService.update(course), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) throws ResourceNotFoundException {
        courseRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
