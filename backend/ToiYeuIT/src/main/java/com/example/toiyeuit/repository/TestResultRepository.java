package com.example.toiyeuit.repository;

import com.example.toiyeuit.dto.response.AnswerResponse;
import com.example.toiyeuit.entity.test.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {

    @Query(
           nativeQuery = true,
           value = "SELECT ts.* FROM ToiYeuIT.test_result ts " +
                   "WHERE ts.submit_id = ?1 AND " +
                   "ts.part = ?2 " +
                   "ORDER BY question_id"
    )
    List<TestResult> getBySubmitIdAndPart(long submitId, int part);
    
    void deleteTestResultsByTestSubmission_Id(Long testSubmissionId);
}
