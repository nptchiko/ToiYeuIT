package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.Course;
import com.example.toiyeuit.entity.Enrollment;
import com.example.toiyeuit.entity.EnrollmentKey;
import com.example.toiyeuit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentKey> {

    Boolean existsByCourseAndUser(Course course, User user);

    List<Enrollment> findEnrollmentByUser(User user);
}
