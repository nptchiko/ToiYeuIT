package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.OrderCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderCourseRepository extends JpaRepository<OrderCourse, Long> {
}
