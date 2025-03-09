package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.ExerciseSubmission;
import com.example.toiyeuit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseSubmissionRepository extends JpaRepository<ExerciseSubmission, Long> {
    @Query(
            value = "SELECT es " +
                  //  "es.score, es.last_answered_at, es.exercise.id " +
                    "FROM ExerciseSubmission es " +
                    "JOIN FETCH es.exercise " +
                    "WHERE es.user.id = :id"
    )
    List<ExerciseSubmission> findAllByUser(Long id);
}
