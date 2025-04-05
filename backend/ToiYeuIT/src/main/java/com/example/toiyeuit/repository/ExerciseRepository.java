package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Exercise;
import com.example.toiyeuit.entity.ExerciseKey;
import com.example.toiyeuit.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findAllByLesson_Id(Integer lesson_Id);
}
