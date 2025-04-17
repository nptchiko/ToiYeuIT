package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.exercise.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findAllByLesson_Id(Integer lesson_Id);
}
