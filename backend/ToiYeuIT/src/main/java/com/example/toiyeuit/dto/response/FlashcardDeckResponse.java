package com.example.toiyeuit.dto.response;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@RequiredArgsConstructor
@Slf4j
@AllArgsConstructor
public class FlashcardDeckResponse {
    Integer deckId;
    String deckName;
    String description;
    LocalDateTime createdAt;
    Long creatorId;
}
