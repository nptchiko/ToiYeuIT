package com.example.toiyeuit.service;

import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.exception.AlreadyExistsException;
import com.example.toiyeuit.exception.CourseServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.CourseRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final Logger logger = LoggerFactory.getLogger(CourseService.class);

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
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

    @Transactional
    public Course create(Course course) throws AlreadyExistsException,
            CourseServiceLogicException {
        if (courseRepository.existsById(course.getId())) {
            throw new AlreadyExistsException("Course already exists with id " + course.getId());
        }

        try {
            return courseRepository.save(course);
        } catch (Exception e) {
            logger.error("Failed to create course " + course.getTitle());
            throw new CourseServiceLogicException("Failed to create course " + course.getTitle());
        }
    }

    @Transactional
    public Course update(Course course) throws ResourceNotFoundException {
        Optional<Course> courseOptional = courseRepository.findById(course.getId());
        if (!courseOptional.isPresent()) {
            throw new ResourceNotFoundException("Course not found with id " + course.getId());
        }
        return courseRepository.save(course);
    }

    public void delete(Integer id) {
        Course course = courseRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Course not found with id " + id));

        courseRepository.deleteById(id);
    }
}
