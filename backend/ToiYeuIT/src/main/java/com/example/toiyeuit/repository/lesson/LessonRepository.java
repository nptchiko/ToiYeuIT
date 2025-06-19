package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.lesson.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findAllByCourseId(Integer courseId);
    Optional<Lesson> findByIdAndCourseId(Long lessonId, Integer courseId);
    Page<Lesson> findAllByCourseId(Integer courseId, Pageable pageable);
    Boolean existsByCourseIdAndOrderIndex(Integer courseId, Integer orderIndex);
    Boolean existsByCourseIdAndOrderIndexAndIdNot(Integer courseId, Integer orderIndex, Long lessonId);

    @Query("SELECT MAX(l.orderIndex) FROM Lesson l WHERE l.course.id = :courseId")
    Optional<Integer> findMaxOrderIndexByCourseId(@Param("courseId") Integer courseId);

}
