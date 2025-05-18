package com.example.toiyeuit.entity.test;

import com.example.toiyeuit.entity.question.Question;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //E
@Table(name = "test_detail")
// có thể dùng khóa phức nhưng dài ko làm
public class TestDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "belong_to")
    Test test;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "question_id")
    Question question;

    @Column(name = "indexx", nullable = false)
    int index;

    int part;
}

