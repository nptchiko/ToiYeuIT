package com.example.toiyeuit.mapper;


import com.example.toiyeuit.dto.response.FlashcardDeckResponse;
import com.example.toiyeuit.entity.FlashcardDeck;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FlashcardDeckMapper {

    FlashcardDeckMapper INSTANCE = Mappers.getMapper(FlashcardDeckMapper.class);

    @Mapping(source = "id", target = "deckId")
    @Mapping(source = "name", target = "deckName")
    @Mapping(source = "created_at", target = "createdAt")
    @Mapping(source = "creator.id", target = "creatorId")
    FlashcardDeckResponse toResponse(FlashcardDeck deck);
}

