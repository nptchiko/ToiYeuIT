package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.course.Enrollment;
import com.example.toiyeuit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {


    @Override
    List<Enrollment> findAll();

    Boolean existsByCourseAndUser(Course course, User user);

    List<Enrollment> findEnrollmentByUser(User user);

    @Modifying
    @Query(nativeQuery = true,
        value = "UPDATE ToiYeuIT.enrollment as e " +
                "SET e.expired_at = DATE_ADD(e.enrolled_at, INTERVAL :duration WEEK) " +
                "where e.course_id = :course_id AND e.user_id = :user_id"
    )
    void updateExpiry(@Param(value = "user_id") Long user_id,
                      @Param(value = "course_id") Integer course_id,
                      int duration
                      );

}
