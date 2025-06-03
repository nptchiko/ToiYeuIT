package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.lesson.QuizUserSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizUserSubmissionRepository extends JpaRepository<QuizUserSubmission, Long> {
    Optional<QuizUserSubmission> findByUserIdAndQuestionId(Long userId, Long quizId);
    List<QuizUserSubmission> findAllByUserId(Long userId);
    Boolean existsByUserIdAndQuestionId(Long userId, Long questionId);
}
