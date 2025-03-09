package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.ExerciseKey;
import com.example.toiyeuit.entity.ExerciseResult;
import com.example.toiyeuit.entity.ResultKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseResultRepository extends JpaRepository<ExerciseResult, ResultKey> {

    @Query(value = "select * from exercise_result er where er.id = :id",
    nativeQuery = true)
    List<ExerciseResult> resultOfSubmision(Long id);

}
