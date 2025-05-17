package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.lesson.QuizOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizOptionRepository extends JpaRepository<QuizOption, Long> {
    Optional<QuizOption> findByIdAndQuestionId(Long id, Long questionId);
   Boolean existsByIdAndQuestionId(Long id, Long questionId);
}
