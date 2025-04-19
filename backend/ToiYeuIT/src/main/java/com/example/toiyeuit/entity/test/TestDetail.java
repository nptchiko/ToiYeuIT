package com.example.toiyeuit.entity.test;

import com.example.toiyeuit.entity.Question;
import com.example.toiyeuit.entity.key.TestKey;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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
    @EmbeddedId
    TestKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "belong_to")
    @MapsId(value = "test_id")
    Test test;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @MapsId(value = "ques_id")
    Question question;

    @Column(nullable = false)
    int index;

    @Size(min = 1, max = 7)
    int part;
}

