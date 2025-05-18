package com.example.toiyeuit.mapper;


import com.example.toiyeuit.dto.response.FlashcardResponse;
import com.example.toiyeuit.entity.Flashcard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FlashcardMapper {

    FlashcardMapper INSTANCE = Mappers.getMapper(FlashcardMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "frontContent", target = "frontContent")
    @Mapping(source = "backContent", target = "backContent")
    @Mapping(source = "audioUrl", target = "audioUrl")
    @Mapping(source = "isFavorite", target = "isFavorite")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "updatedAt", target = "updatedAt")
    FlashcardResponse toResponse(Flashcard flashcard);
}

