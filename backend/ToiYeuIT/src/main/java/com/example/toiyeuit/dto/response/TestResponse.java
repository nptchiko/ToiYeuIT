package com.example.toiyeuit.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TestResponse {
    long id;
    String title;
    int index;
    int submitted;

    public TestResponse(long id, String title){
        this.id = id;
        this.title = title;
    }

    public TestResponse(long id, String title, int index, boolean submitted) {
        this.id = id;
        this.title = title;
        this.index = index;
        this.submitted = submitted ? 1 : 0;
    }
}
