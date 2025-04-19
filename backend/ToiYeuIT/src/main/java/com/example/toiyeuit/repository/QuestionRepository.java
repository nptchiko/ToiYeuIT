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
            value = "SELECT q.*  " +
                    "FROM ToiYeuIT.question q " +
                    "JOIN ToiYeuIT.test_detail td " +
                    "ON q.ques_id = td.question_id " +
                    "WHERE td.belong_to = :testId " +
                    "AND td.part = :part"
    )
    List<Question> findAllByTestIDAndPart(Long testId, Integer part);


    @Query(
            nativeQuery = true,
            value = "SELECT * FROM ToiYeuIT.question q " +
                    "WHERE q.question_cluster_id IN (SELECT qc.id FROM ToiYeuIT.question_cluster qc " +
                    "WHERE qc.test_id = ?1 " +
                    "AND qc.part = ?2 " +
                    "AND qc.indexes = ?3)"
    )
    List<Question> findAllByQuestionCluster(long testId, int part, int index);
}
