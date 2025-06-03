package com.example.toiyeuit.repository.lesson;

import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findAllByCourseId(Integer courseId);
    Optional<Lesson> findByIdAndCourseId(Long lessonId, Integer courseId);

}
