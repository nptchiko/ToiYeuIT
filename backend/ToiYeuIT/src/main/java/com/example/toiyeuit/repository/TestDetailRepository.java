package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.test.TestDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestDetailRepository extends JpaRepository<TestDetail, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT td.part, td.question_id, td.`index`, td.belong_to FROM ToiYeuIT.test_detail td " +
                    "JOIN test t ON td.belong_to = t.id " +
                    "WHERE t.id = ?1"
    )
    List<TestDetail> findAllByTestId(@Param("test") Long testId);
}
