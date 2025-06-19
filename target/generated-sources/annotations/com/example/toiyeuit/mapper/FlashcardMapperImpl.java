package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.FlashcardResponse;
import com.example.toiyeuit.entity.Flashcard;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-19T18:59:17+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class FlashcardMapperImpl implements FlashcardMapper {

    @Override
    public FlashcardResponse toResponse(Flashcard flashcard) {
        if ( flashcard == null ) {
            return null;
        }

        FlashcardResponse.FlashcardResponseBuilder flashcardResponse = FlashcardResponse.builder();

        flashcardResponse.id( flashcard.getId() );
        flashcardResponse.frontContent( flashcard.getFrontContent() );
        flashcardResponse.backContent( flashcard.getBackContent() );
        flashcardResponse.audioUrl( flashcard.getAudioUrl() );
        flashcardResponse.isFavorite( flashcard.getIsFavorite() );
        flashcardResponse.createdAt( flashcard.getCreatedAt() );
        flashcardResponse.updatedAt( flashcard.getUpdatedAt() );

        return flashcardResponse.build();
    }
}
