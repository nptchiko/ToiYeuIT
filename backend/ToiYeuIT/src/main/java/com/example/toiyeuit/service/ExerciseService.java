package com.example.toiyeuit.service;

import com.example.toiyeuit.entity.Exercise;
import com.example.toiyeuit.exception.ExerciseServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// TODO: remember to uncomment this to inject into spring context
//@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> findAll() {
        return exerciseRepository.findAll();
    }

    public List<Exercise> findAllByLesson_Id(Integer lesson_Id) throws ExerciseServiceLogicException {
        try {
            return exerciseRepository.findAllByLesson_Id(lesson_Id);
        } catch (Exception e) {
            throw new ExerciseServiceLogicException("Cannot find exercises by lesson id: " + lesson_Id);
        }
    }

    public Exercise findById(Integer id) throws ResourceNotFoundException {
       return exerciseRepository.findById(id).orElseThrow(
               () -> new ResourceNotFoundException("Cannot find exercise with id " + id)
       );
    }

    public void delete(Integer id) throws ResourceNotFoundException {
        if (!exerciseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Exercise does not exist with id " + id);
        }

        exerciseRepository.deleteById(id);
    }

    public Exercise create(Exercise exercise) throws ResourceNotFoundException {
        // TODO: complete later
        return null;
    }
}
