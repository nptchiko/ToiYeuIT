package com.example.toiyeuit.entity.key;

import com.example.toiyeuit.enums.AnswerKey;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Key implements Serializable {
    @Enumerated(EnumType.STRING)
    AnswerKey key;

    Long question_id;
}
