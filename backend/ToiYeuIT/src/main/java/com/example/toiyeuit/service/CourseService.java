package com.example.toiyeuit.service;

import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.exception.*;
import com.example.toiyeuit.mapper.CourseMapper;
import com.example.toiyeuit.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final Logger logger = LoggerFactory.getLogger(CourseService.class);
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    public List<Course> findAllActiveCourse(){
        return courseRepository.findAllActiveCourse();
    }

    public Course findById(Integer id) throws ResourceNotFoundException {
        return courseRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Course not found with id " + id)
        );
    }

    public Course findByTitle(String title) throws ResourceNotFoundException {
        return courseRepository.findByTitle(title).orElseThrow(
                () -> new ResourceNotFoundException("Course not found with title " + title)
        );
    }

    public Course addCourse(Course course){
        assert course.getTitle() != null;

        if (existByTiltle(course.getTitle()))
            throw new AppException(ErrorCode.COURSE_EXISTED);

        return courseRepository.save(course);
    }

    public boolean existByTiltle(String title){
        return courseRepository.findByTitle(title).isPresent();
    }

    public void delete(int id) {
        Course course = courseRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Course not found with id " + id));

        courseRepository.deleteById(id);
    }
}
