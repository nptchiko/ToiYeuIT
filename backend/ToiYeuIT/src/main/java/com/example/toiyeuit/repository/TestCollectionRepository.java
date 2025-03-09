package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.TestCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestCollectionRepository extends JpaRepository<TestCollection, Integer> {
    List<TestCollection> findAll();

    Optional<TestCollection> findById(Integer id);


}
