package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //E
@Table(name = "flashcard_decks")
public class FlashcardDeck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="deck_id")
    Integer id;

    @Column(name = "deck_name")
    String name;

    @Column(name = "description")
    String description;

    @CreationTimestamp
    @Column(name = "created_at")
    LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    User creator;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Flashcard> flashcards = new ArrayList<>();
}
