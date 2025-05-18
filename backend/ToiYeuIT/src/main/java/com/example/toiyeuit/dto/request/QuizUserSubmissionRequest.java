package com.example.toiyeuit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizUserSubmissionRequest {
    private Long quizId;
    private Long optionId;
}
