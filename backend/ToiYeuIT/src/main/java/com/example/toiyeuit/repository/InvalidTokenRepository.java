package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.UUID;

@Repository
@Transactional
public interface InvalidTokenRepository extends JpaRepository<InvalidToken, UUID> {

    @Modifying
    @Query(
            nativeQuery = true,
            value = "delete from invalid_token as i where i.expiry_time < NOW()"
    )
    void deleteInvalidTokenSince();

    boolean existsById(String uuid);
}
