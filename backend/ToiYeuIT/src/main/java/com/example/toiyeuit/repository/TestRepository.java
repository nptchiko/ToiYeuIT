package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    @Override
    List<Test> findAll();
    Optional<Test> findById(Long id);

}
