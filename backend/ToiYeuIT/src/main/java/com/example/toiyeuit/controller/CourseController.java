package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.CourseRequestDTO;
import com.example.toiyeuit.entity.Course;
import com.example.toiyeuit.enums.Level;
import com.example.toiyeuit.exception.AlreadyExistsException;
import com.example.toiyeuit.exception.CourseServiceLogicException;
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
    public ResponseEntity<List<Course>> findAll() {
        List<Course> courses = courseService.findAll();

        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable Integer id) {
        Course course = courseService.findById(id);

        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Course> create(@RequestBody CourseRequestDTO course) throws CourseServiceLogicException,
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
}
