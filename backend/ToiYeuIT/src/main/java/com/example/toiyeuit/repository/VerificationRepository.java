package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE VerificationToken v set v.confirmAt = ?2 WHERE v.token = ?1")
    int updateConfirmAt(String token, LocalDateTime localDateTime);
}
