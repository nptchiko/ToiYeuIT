package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.TestSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestSubmissionRepository extends JpaRepository<TestSubmission, Long> {
    Optional<TestSubmission> findById(Long id);
}
