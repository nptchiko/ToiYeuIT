package com.example.toiyeuit.dto.request.testSubmit;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResultRequest {
    long id;
    String answer;
}
