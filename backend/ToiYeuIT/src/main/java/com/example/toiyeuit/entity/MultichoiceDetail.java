package com.example.toiyeuit.entity;

import com.example.toiyeuit.enums.AnswerKey;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //Entity
@Table(name = "multichoice_detail")
public class MultichoiceDetail {
    @EmbeddedId
    Key id;

    @ManyToOne
    @MapsId("question_id")
    @JoinColumn(name = "ques_id")
    Question question;

    @Column(name = "answer_description")
    String description;

}
