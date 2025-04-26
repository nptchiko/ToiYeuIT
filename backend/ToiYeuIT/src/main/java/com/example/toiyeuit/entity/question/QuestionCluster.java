package com.example.toiyeuit.entity.question;


import com.example.toiyeuit.entity.test.Test;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionCluster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(nullable = false)
    int part;

    @Column(nullable = false)
    int indexes;

    @Column(name = "paragraph", columnDefinition = "text")
    String paragraph;

    @ManyToOne(targetEntity = Test.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "test_id")
    Test test;

}
