package com.example.toiyeuit.entity.question;

import com.example.toiyeuit.entity.key.Key;
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
    @EmbeddedId
    @JsonIgnore
    Key id;

    @ManyToOne()
    @JsonIgnore
    @MapsId("question_id")
    @JoinColumn(name = "ques_id")
    Question question;

    @JsonProperty("key")
    AnswerKey getAnswerKey(){
        return id.getKey();
    }

    @Column(name = "answer_description")
    String description;

}
