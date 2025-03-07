package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.TestCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestCollectionRepository extends JpaRepository<TestCollection, Long> {
}
