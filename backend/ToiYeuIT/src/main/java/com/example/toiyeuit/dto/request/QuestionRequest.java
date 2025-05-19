package com.example.toiyeuit.dto.request;


import com.example.toiyeuit.entity.question.MultichoiceDetail;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionRequest {
    String description;
    String audioSource;
    String imageSource;
    Set<MultichoiceDetail> options;
    String correctAnswer;
}
