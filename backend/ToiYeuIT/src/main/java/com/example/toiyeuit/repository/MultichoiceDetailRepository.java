package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.MultichoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultichoiceDetailRepository extends JpaRepository<MultichoiceDetail, Long> {
}
