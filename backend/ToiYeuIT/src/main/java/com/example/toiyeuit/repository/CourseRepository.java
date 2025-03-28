package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Override
    Optional<Course> findById(Integer integer);
    Optional<Course> findByTitle(String title);
}
