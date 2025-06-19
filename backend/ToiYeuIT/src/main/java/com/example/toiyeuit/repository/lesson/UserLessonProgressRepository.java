package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.lesson.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, Long> {
    Optional<UserLessonProgress> findByUserIdAndLessonId(Long userId, Long lessonId);

    Optional<UserLessonProgress> findByUserEmailAndLessonId(String email, Long lessonId);

    List<UserLessonProgress> findAllByUserId(Long userId);

    List<UserLessonProgress> findAllByLessonId(Long lessonId);
    Boolean existsByUserIdAndLessonIdAndIsSubmitted(Long userId, Long lessonId, Boolean isSubmitted);
    void deleteByLessonId(Long lessonId);
}
