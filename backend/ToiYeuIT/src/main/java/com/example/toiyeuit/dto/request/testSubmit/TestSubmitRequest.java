package com.example.toiyeuit.dto.request.testSubmit;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Map;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestSubmitRequest {
    long submitId;
    long testId;

    @NotNull
    float score;

    @NotNull
    int part;

    @NotNull
    List<AnswerSubmitRequest> answers;
}
