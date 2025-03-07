package com.example.toiyeuit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseResultRepository extends JpaRepository<ExerciseResultRepository, Long> {

}
