package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.course.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Boolean existsLessonById(Integer id);
    Boolean existsLessonByTitle(String title);
}
