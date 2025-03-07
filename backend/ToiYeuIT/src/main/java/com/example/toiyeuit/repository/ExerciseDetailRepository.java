package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.ExerciseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseDetailRepository extends JpaRepository<ExerciseDetail, Long> {
}
