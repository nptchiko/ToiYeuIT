package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.FlashcardDeckResponse;
import com.example.toiyeuit.entity.FlashcardDeck;
import com.example.toiyeuit.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-19T18:59:17+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class FlashcardDeckMapperImpl implements FlashcardDeckMapper {

    @Override
    public FlashcardDeckResponse toResponse(FlashcardDeck deck) {
        if ( deck == null ) {
            return null;
        }

        FlashcardDeckResponse.FlashcardDeckResponseBuilder flashcardDeckResponse = FlashcardDeckResponse.builder();

        flashcardDeckResponse.deckId( deck.getId() );
        flashcardDeckResponse.deckName( deck.getName() );
        flashcardDeckResponse.createdAt( deck.getCreated_at() );
        flashcardDeckResponse.creatorId( deckCreatorId( deck ) );
        flashcardDeckResponse.description( deck.getDescription() );

        return flashcardDeckResponse.build();
    }

    private Long deckCreatorId(FlashcardDeck flashcardDeck) {
        User creator = flashcardDeck.getCreator();
        if ( creator == null ) {
            return null;
        }
        return creator.getId();
    }
}
