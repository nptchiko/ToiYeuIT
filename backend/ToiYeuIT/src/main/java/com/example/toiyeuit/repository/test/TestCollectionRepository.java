package com.example.toiyeuit.repository.test;

import com.example.toiyeuit.entity.test.TestCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestCollectionRepository extends JpaRepository<TestCollection, Integer> {

    List<TestCollection> findAll();

    Optional<TestCollection> findById(long id);

    @Query(
            nativeQuery = true,
            value = "SELECT * FROM ToiYeuIT.test_collection as tc " +
                    "WHERE tc.skill_id = :id "

    )
    List<TestCollection> findAllBySkillId(@Param("id") Integer id);

    void deleteTestCollectionById(long id);
}
