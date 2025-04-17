package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAll();

    Optional<Question> findById(Long id);

    @Query(
            nativeQuery = true,
            value = "SELECT q.ques_id, q.description, q.correct_ans, audio_src, img_src " +
                    "FROM ToiYeuIT.question q " +
                    "JOIN ToiYeuIT.test_detail td " +
                    "ON q.ques_id = td.question_id " +
                    "AND td.belong_to = :testId"
    )
    List<Question> findAllByTestID(Long testId);
}
