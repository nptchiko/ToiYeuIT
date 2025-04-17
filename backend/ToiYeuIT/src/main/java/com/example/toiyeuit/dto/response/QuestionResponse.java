package com.example.toiyeuit.dto.response;


import com.example.toiyeuit.entity.MultichoiceDetail;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionResponse {
    String text;
    String audioSource;
    String imgSource;
    String correctAnswer;
    List<MultichoiceDetail> options;
}
