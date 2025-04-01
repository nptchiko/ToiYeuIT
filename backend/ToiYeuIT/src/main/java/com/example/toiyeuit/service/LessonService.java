package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.LessonRequestDTO;
import com.example.toiyeuit.entity.Course;
import com.example.toiyeuit.entity.Lesson;
import com.example.toiyeuit.entity.Skill;
import com.example.toiyeuit.exception.AlreadyExistsException;
import com.example.toiyeuit.exception.LessonServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.LessonRepository;
import com.example.toiyeuit.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final SkillRepository skillRepository;

    public LessonService(LessonRepository lessonRepository, CourseRepository courseRepository, SkillRepository skillRepository) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
        this.skillRepository = skillRepository;
    }

    public List<Lesson> findAll() {
        return lessonRepository.findAll();
    }

    public Lesson findById(Long id) throws ResourceNotFoundException {

        return lessonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cannot find Lesson with id " + id));
    }

    @Transactional
    public Lesson create(LessonRequestDTO lessonRequest) throws AlreadyExistsException, LessonServiceLogicException,
            ResourceNotFoundException {

        if (lessonRepository.existsLessonByTitle(lessonRequest.getTitle())) {
            throw new AlreadyExistsException("Lesson already exists with title " + lessonRequest.getTitle());
        }

        Skill skill = skillRepository.findById(lessonRequest.getSkillId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find Skill with id " + lessonRequest.getSkillId()));

        Course course = courseRepository.findById(lessonRequest.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find Course with id " + lessonRequest.getCourseId()));

        Lesson lesson = Lesson.builder()
                .title(lessonRequest.getTitle())
                .description(lessonRequest.getDescription())
                .imageUrl(lessonRequest.getImageUrl())
                .videoUrl(lessonRequest.getVideoUrl())
                .course(course)
                .skill(skill)
                .build();

        try {
            return lessonRepository.save(lesson);
        } catch (Exception e) {
            throw new LessonServiceLogicException(e.getMessage());
        }
    }

    @Transactional
    public Lesson update(Integer id, LessonRequestDTO lessonRequest) throws ResourceNotFoundException, AlreadyExistsException, LessonServiceLogicException {
        if (!lessonRepository.existsLessonById(id)) {
            throw new ResourceNotFoundException("Lesson does not exist with id " + id);
        }

        Skill skill = skillRepository.findById(lessonRequest.getSkillId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find Skill with id " + lessonRequest.getSkillId()));

        Course course = courseRepository.findById(lessonRequest.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find Course with id " + lessonRequest.getCourseId()));

        Lesson lesson = Lesson.builder()
                .title(lessonRequest.getTitle())
                .description(lessonRequest.getDescription())
                .imageUrl(lessonRequest.getImageUrl())
                .videoUrl(lessonRequest.getVideoUrl())
                .course(course)
                .skill(skill)
                .build();


        try {
            return lessonRepository.save(lesson);
        } catch (Exception e) {
            throw new LessonServiceLogicException("Failed to update Lesson with id " + lesson.getId());
        }
    }

    public void delete(Long id) throws ResourceNotFoundException {
       if (!lessonRepository.existsById(id)) {
           throw new ResourceNotFoundException("Lesson does not exist with id " + id);
       }

        lessonRepository.deleteById(id);
    }
}
