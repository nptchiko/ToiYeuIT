package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.lesson.Grammar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrammarRespository extends JpaRepository<Grammar, Integer> {
   Optional<Grammar> findByLessonId(Long lessonId);
}
