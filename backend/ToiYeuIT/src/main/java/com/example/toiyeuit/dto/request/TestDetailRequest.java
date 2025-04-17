package com.example.toiyeuit.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestDetailRequest {
    @JsonProperty(value = "test-set-id")
    int testSetID;

    @Schema(name = "Đề thứ mấy trong bộ đề")
    int index;

}
