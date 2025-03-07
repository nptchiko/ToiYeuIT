package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.TestDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestDetailRepository extends JpaRepository<TestDetail, Long> {
}
