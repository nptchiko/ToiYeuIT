package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Override
    Optional<Course> findById(Integer integer);

    Optional<Course> findByTitle(String title);

    @Query(
            nativeQuery = true,
            value = "SELECT * FROM course as c where c.enabled = TRUE"
    )
    List<Course> findAllActiveCourse();
}
