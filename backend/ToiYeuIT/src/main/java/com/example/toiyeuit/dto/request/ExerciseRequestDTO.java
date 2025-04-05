package com.example.toiyeuit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseRequestDTO {

    private Integer lessonId;
    private String instruction;
    private String content;
    private String mediaUrl;
    private String questionType;
    // TODO: i give up on this bro...
}

