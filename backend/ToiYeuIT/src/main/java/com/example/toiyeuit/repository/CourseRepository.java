package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.course.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
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

    @Query(
            nativeQuery = true,
            value = "SELECT c.* FROM course c " +
                    "LEFT JOIN ToiYeuIT.enrollment e on c.course_id = e.course_id " +
                    "WHERE e.user_id = :id"
    )
    List<Course> retrieveAllCourseOfUser(long id);

    @Override
    Page<Course> findAll(Pageable pageable);


    @Query(nativeQuery = true,
            value = "SELECT COALESCE(SUM(c.price), 0) " +
                    "FROM enrollment e " +
                    "JOIN course c ON c.course_id = e.course_id " +
                    "WHERE YEAR(NOW()) = YEAR(e.enrolled_at) " +
                    "AND MONTH(:date) = MONTH(e.enrolled_at)")
    Long retrieveEachMonthRevenue(LocalDate date);

    @Modifying
    @Query(
            nativeQuery = true,
            value = "UPDATE ToiYeuIT.course c " +
                    "SET c.enabled = :isEnabled " +
                    "WHERE  c.course_id = :id"
    )
    int toggleVisiable(int id, int isEnabled);


}
