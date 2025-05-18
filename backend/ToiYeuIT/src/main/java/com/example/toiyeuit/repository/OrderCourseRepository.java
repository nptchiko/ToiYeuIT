package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.course.CourseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderCourseRepository extends JpaRepository<CourseOrder, Long> {

    List<CourseOrder> findByUserId(Long userId);
}
