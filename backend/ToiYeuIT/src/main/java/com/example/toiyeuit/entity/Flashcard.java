package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //E
@Table(name = "flashcards")
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    Integer id;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    FlashcardDeck deck;

    @Column(name = "front_content", nullable = false)
    String frontContent;

    @Column(name = "back_content")
    String backContent;

    @CreationTimestamp
    @Column(name = "created_at")
    LocalDateTime creationTime;

    Boolean isViewed;
}
