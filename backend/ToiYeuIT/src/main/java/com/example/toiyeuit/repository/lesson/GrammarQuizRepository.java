package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.lesson.GrammarQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrammarQuizRepository extends JpaRepository<GrammarQuiz, Long> {
    List<GrammarQuiz> findAllByGrammarId(Long grammarId);
}
