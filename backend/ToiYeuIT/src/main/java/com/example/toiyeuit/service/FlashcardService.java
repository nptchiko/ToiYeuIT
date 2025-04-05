package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.FlashcardDeckRequestDTO;
import com.example.toiyeuit.entity.Flashcard;
import com.example.toiyeuit.entity.FlashcardDeck;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.FlashcardServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.FlashcardDeckRepository;
import com.example.toiyeuit.repository.FlashcardRepository;
import com.example.toiyeuit.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final FlashcardDeckRepository flashcardDeckRepository;
    private final UserRepository userRepository;

    public FlashcardService(FlashcardRepository flashcardRepository,
                            FlashcardDeckRepository flashcardDeckRepository,
                            UserRepository userRepository) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardDeckRepository = flashcardDeckRepository;
        this.userRepository = userRepository;
    }

    public List<List<Flashcard>> findAllByUserId(Long userId) throws UsernameNotFoundException,
            ResourceNotFoundException,
            FlashcardServiceLogicException {
        if (userId == null || !userRepository.existsById(userId)) {
            throw new UsernameNotFoundException("User not found");
        }

        User user = userRepository.findById(userId).orElseThrow(
                () -> new UsernameNotFoundException("User not found")
        );

        List<FlashcardDeck> decks = flashcardDeckRepository.findAllByCreator(user);

        try {
            List<List<Flashcard>> flashcards = new ArrayList<>();

            for (FlashcardDeck deck : decks) {
                flashcards.add(flashcardRepository.findAllByDeck(deck));
            }
            return flashcards;
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }
    }

    public Flashcard findById(Long id) throws ResourceNotFoundException {
        return flashcardRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("This id doesn't exist"));
    }

    public List<Flashcard> findAllByDeckId(Integer deckId) {
        FlashcardDeck deck = flashcardDeckRepository.findById(deckId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find this deck"));

        return flashcardRepository.findAllByDeck(deck);
    }

    @Transactional
    public FlashcardDeck createNewDeck(FlashcardDeckRequestDTO flashcardDeck) {

        if (flashcardDeck.getName() == null || flashcardDeck.getName().isEmpty()) {
            throw new FlashcardServiceLogicException("Flashcard deck name cannot be empty");
        }

        FlashcardDeck deck = FlashcardDeck.builder()
                // TODO: use Spring Security context to get username@deckName since decks may have the same name
                .name(flashcardDeck.getName())
                .description(flashcardDeck.getDescription())
                .created_at(LocalDateTime.now())
                // TODO: use spring security context to get user here too.
                .build();

        try {
            return flashcardDeckRepository.save(deck);
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }

    }
}
