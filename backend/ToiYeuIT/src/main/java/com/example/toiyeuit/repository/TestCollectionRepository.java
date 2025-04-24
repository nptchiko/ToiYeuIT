package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.test.TestCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestCollectionRepository extends JpaRepository<TestCollection, Integer> {

//    @Query(//nativeQuery = true,
//   value =
//           "SELECT tc.title, tc.skill, tc.tests, tc.description, tc.id FROM TestCollection tc " +
//                   "JOIN FETCH tc.tests tct " +
//                   "JOIN FETCH tc.skill tcs "
//    )
    List<TestCollection> findAll();

    Optional<TestCollection> findById(Integer id);

    @Query(
            nativeQuery = true,
            value = "SELECT * FROM ToiYeuIT.test_collection as tc " +
                    "WHERE tc.skill_id = :id "

    )
    List<TestCollection> findAllBySkillId(@Param("id") Integer id);

}
