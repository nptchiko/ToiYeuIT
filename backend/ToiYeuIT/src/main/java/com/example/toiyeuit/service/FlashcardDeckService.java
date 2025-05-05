package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.FlashcardDeckRequestDTO;
import com.example.toiyeuit.dto.response.FlashcardDeckResponse;
import com.example.toiyeuit.entity.FlashcardDeck;
import com.example.toiyeuit.exception.FlashcardServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.mapper.FlashcardDeckMapper;
import com.example.toiyeuit.repository.FlashcardDeckRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardDeckService {

    private final FlashcardDeckRepository flashcardDeckRepository;
    private final FlashcardDeckMapper flashcardDeckMapper;

    public FlashcardDeckService(FlashcardDeckRepository flashcardDeckRepository, FlashcardDeckMapper flashcardDeckMapper) {
        this.flashcardDeckRepository = flashcardDeckRepository;
        this.flashcardDeckMapper = flashcardDeckMapper;
    }

    public List<FlashcardDeckResponse> findAll() {
        return flashcardDeckRepository.findAll()
                .stream()
                .map(flashcardDeckMapper::toResponse)
                .collect(Collectors.toList());
    }


    public FlashcardDeckResponse findById(Integer id) throws ResourceNotFoundException {
        FlashcardDeck deck = flashcardDeckRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Could not find flashcard with id " + id)
        );

        return flashcardDeckMapper.toResponse(deck);
    }

    @Transactional
    public FlashcardDeckResponse createNewDeck(FlashcardDeckRequestDTO flashcardDeck) {
        if (flashcardDeck.getName() == null || flashcardDeck.getName().isEmpty()) {
            throw new FlashcardServiceLogicException("Flashcard deck name cannot be empty");
        }

        FlashcardDeck deck = FlashcardDeck.builder()
                // TODO: use Spring Security context to get username@deckName since decks may have the same name
                .name(flashcardDeck.getName())
                .description(flashcardDeck.getDescription())
                .created_at(LocalDateTime.now())
                // TODO: use spring security context to get user for creator attribute here too.
                .build();

        try {
            return flashcardDeckMapper.toResponse(flashcardDeckRepository.save(deck));
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }

    }

    @Transactional
    public void deleteDeck(Integer deckId) {
        flashcardDeckRepository.deleteById(deckId);
    }

    @Transactional
    public FlashcardDeckResponse updateDeck(Integer deckId, FlashcardDeckRequestDTO flashcardDeckRequestDTO)
            throws ResourceNotFoundException, FlashcardServiceLogicException {

        if (flashcardDeckRequestDTO.getName() == null || flashcardDeckRequestDTO.getName().isEmpty()) {
            throw new FlashcardServiceLogicException("Flashcard deck name cannot be empty");
        }

        FlashcardDeck deck = flashcardDeckRepository.findById(deckId).orElseThrow(
                () -> new ResourceNotFoundException("Deck with id " + deckId + " doesn't exist")
        );

        deck.setName(flashcardDeckRequestDTO.getName());
        deck.setDescription(flashcardDeckRequestDTO.getDescription());

        try {
            return flashcardDeckMapper.toResponse(flashcardDeckRepository.save(deck));
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }
    }
}
