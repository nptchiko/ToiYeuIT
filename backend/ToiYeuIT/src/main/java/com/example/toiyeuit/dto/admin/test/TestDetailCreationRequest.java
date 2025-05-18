package com.example.toiyeuit.dto.admin.test;


import com.example.toiyeuit.dto.request.QuestionRequest;
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
public class TestDetailCreationRequest {
    int part;
    List<QuestionRequest> questions;
}
