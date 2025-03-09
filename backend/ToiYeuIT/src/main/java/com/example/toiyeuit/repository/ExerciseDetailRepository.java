package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Exercise;
import com.example.toiyeuit.entity.ExerciseDetail;
import com.example.toiyeuit.entity.ExerciseKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDetailRepository extends JpaRepository<ExerciseDetail, ExerciseKey> {
    List<ExerciseDetail> findByExcerise(Exercise excerise);
}
