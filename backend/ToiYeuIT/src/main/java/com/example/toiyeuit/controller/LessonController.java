package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.LessonRequestDTO;
import com.example.toiyeuit.entity.course.Lesson;
import com.example.toiyeuit.exception.AlreadyExistsException;
import com.example.toiyeuit.exception.LessonServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable Long id) throws ResourceNotFoundException {

        return lessonService.findById(id);
    }

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.findAll();
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateLesson(@PathVariable Integer id, @RequestBody LessonRequestDTO lesson) throws ResourceNotFoundException,
            AlreadyExistsException, LessonServiceLogicException {

        return new ResponseEntity<>(lessonService.update(id, lesson), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteLessonById(@PathVariable Long id) throws ResourceNotFoundException {
        lessonService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
   public ResponseEntity<?> createLesson(@RequestBody LessonRequestDTO lessonRequest) throws ResourceNotFoundException {

        return new ResponseEntity<>(lessonService.create(lessonRequest), HttpStatus.CREATED);
    }
}
