package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.course.CourseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderCourseRepository extends JpaRepository<CourseOrder, Long> {
}
