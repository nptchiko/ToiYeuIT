package com.example.toiyeuit.entity.question;

import com.example.toiyeuit.enums.AnswerKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //Entity
@Table(name = "multichoice_detail")
public class MultichoiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "ques_id")
    Question question;

    @JsonProperty("key")
    @Enumerated(EnumType.STRING)
    AnswerKey answerKey;

    @Column(name = "answer_description")
    String description;


}
