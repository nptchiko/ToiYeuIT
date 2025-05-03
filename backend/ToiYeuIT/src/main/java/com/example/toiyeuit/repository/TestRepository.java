package com.example.toiyeuit.repository;

import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.entity.test.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {


    @Override
    Page<Test> findAll(Pageable pageable);

    Optional<Test> findById(Long id);

    @Modifying
    @Query(
            nativeQuery = true,
            value = "update ToiYeuIT.test t set t.enabled = ?1, t.title = ?2 " +
                    "where t.id = ?3"
    )
    int update(boolean isEnable, String title, long id);

    @Query(
            "select new com.example.toiyeuit.dto.response.TestResponse(t.id, t.title) " +
                    "from Test t " +
                    "left join TestSubmission ts on ts.test.id = t.id " +
                    "where ts.user.id = :userId"
    )
    List<TestResponse> retrieveBySubmission(long userId);

    long countAllByTestCollection_Id(Integer testCollectionId);

    @Query(
            "SELECT new com.example.toiyeuit.dto.response.TestResponse(t.id, t.title, t.index, " +
                    "case when exists (select 1 from TestSubmission ts where ts.test.id = t.id and ts.user.id = :userId ) " +
                    "then 1 " +
                    "else 0 end)" +
                    "FROM Test t " +
                    "where t.title like '%đầu vào%'"
    )
    List<TestResponse> retrieveInputTest(long userId);
}
