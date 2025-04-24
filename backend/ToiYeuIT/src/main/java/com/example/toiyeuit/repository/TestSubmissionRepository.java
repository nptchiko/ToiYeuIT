package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.test.TestSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestSubmissionRepository extends JpaRepository<TestSubmission, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT s.* " +
                    "FROM ToiYeuIT.test_submission s " +
                    "WHERE s.last_answered_by = ?2 " +
                    "AND s.test_id = ?1"
    )
    Optional<TestSubmission> findByWhoMadeIt(long testId, long userId);

    @Query(
            nativeQuery = true,
            value = "SELECT (COUNT(*)>0) " +
                    "FROM ToiYeuIT.test_submission t " +
                    "WHERE t.test_id = ?1 " +
                    "AND t.last_answered_by = ?2 "
    )
    int existsByTest_IdAndUser_Id(Integer testId, Long userId);
}
