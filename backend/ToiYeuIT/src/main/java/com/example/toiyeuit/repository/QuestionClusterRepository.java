package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.QuestionCluster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionClusterRepository extends JpaRepository<QuestionCluster, Integer> {

    @Query(
            nativeQuery = true,
            value = "SELECT * FROM ToiYeuIT.question_cluster qc " +
                    "WHERE qc.test_id = ?1 " +
                    "AND qc.part = ?2"
    )
    List<QuestionCluster> findAllByTestIdAndPart(long testId, int part);

}
