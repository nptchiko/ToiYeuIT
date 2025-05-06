package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.FlashcardDeckRequestDTO;
import com.example.toiyeuit.dto.response.FlashcardDeckResponse;
import com.example.toiyeuit.entity.FlashcardDeck;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.FlashcardServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.mapper.FlashcardDeckMapper;
import com.example.toiyeuit.repository.FlashcardDeckRepository;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardDeckService {

    private final FlashcardDeckRepository flashcardDeckRepository;
    private final FlashcardDeckMapper flashcardDeckMapper;
    private final UserRepository userRepository;

    public FlashcardDeckService(FlashcardDeckRepository flashcardDeckRepository,
                                FlashcardDeckMapper flashcardDeckMapper,
                                UserRepository userRepository) {
        this.flashcardDeckRepository = flashcardDeckRepository;
        this.flashcardDeckMapper = flashcardDeckMapper;
        this.userRepository = userRepository;
    }

    public List<FlashcardDeckResponse> findAllByUserEmail() throws ResourceNotFoundException {
        String email = SecurityUtils.getCurrentUserLogin();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return user.getFlashcardDeck().stream().map(flashcardDeckMapper::toResponse).collect(Collectors.toList());
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
                .name(flashcardDeck.getName())
                .description(flashcardDeck.getDescription())
                .created_at(LocalDateTime.now())
                .creator(userRepository.findByEmail(SecurityUtils.getCurrentUserLogin()).orElse(null))
                .build();

        try {
            return flashcardDeckMapper.toResponse(flashcardDeckRepository.save(deck));
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }

    }

    @Transactional
    public void deleteDeck(Integer deckId) {
        FlashcardDeck deck = flashcardDeckRepository.findById(deckId)
                .orElseThrow(() -> new ResourceNotFoundException("Deck with id " + deckId + " doesn't exist"));

        flashcardDeckRepository.delete(deck);
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
