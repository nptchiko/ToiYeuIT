package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.exercise.Exercise;
import com.example.toiyeuit.entity.exercise.ExerciseDetail;
import com.example.toiyeuit.entity.key.ExerciseKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDetailRepository extends JpaRepository<ExerciseDetail, ExerciseKey> {
    List<ExerciseDetail> findByExcerise(Exercise excerise);
}
