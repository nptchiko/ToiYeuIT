package com.example.toiyeuit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlashcardRequestDTO {

    private String frontContent;
    private String backContent;
    private String audioUrl;
    private Boolean isFavorite;
}
