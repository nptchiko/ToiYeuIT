package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.FlashcardDeck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashcardDeckRepository extends JpaRepository<FlashcardDeck, Long> {
}
