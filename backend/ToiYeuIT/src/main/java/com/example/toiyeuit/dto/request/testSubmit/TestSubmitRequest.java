package com.example.toiyeuit.dto.request.testSubmit;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestSubmitRequest {
    long testId;

    @NotNull
    float score;

    @NotNull
    List<PartDetailRequest> context;


}
