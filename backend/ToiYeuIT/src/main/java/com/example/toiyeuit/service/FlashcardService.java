package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.FlashcardRequestDTO;
import com.example.toiyeuit.dto.response.FlashcardResponse;
import com.example.toiyeuit.entity.Flashcard;
import com.example.toiyeuit.entity.FlashcardDeck;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.FlashcardServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.mapper.FlashcardMapper;
import com.example.toiyeuit.repository.FlashcardDeckRepository;
import com.example.toiyeuit.repository.FlashcardRepository;
import com.example.toiyeuit.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final FlashcardDeckRepository flashcardDeckRepository;
    private final UserRepository userRepository;
    private final FlashcardMapper flashcardMapper;

    public FlashcardService(FlashcardRepository flashcardRepository,
                            FlashcardDeckRepository flashcardDeckRepository,
                            UserRepository userRepository,
                            FlashcardMapper flashcardMapper) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardDeckRepository = flashcardDeckRepository;
        this.userRepository = userRepository;
        this.flashcardMapper = flashcardMapper;
    }

    // TODO: implement UserFlashcardService to find flashcards by userId (move this code along)
    // Deprecated
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

    public FlashcardResponse findById(Integer deckId, Long id) throws ResourceNotFoundException, FlashcardServiceLogicException {
        Flashcard flashcard = flashcardRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Flashcard with id " + id + " doesn't exist"));

        if (flashcard.getDeck().getId().equals(deckId)) {
            return flashcardMapper.toResponse(flashcard);
        } else {
            throw new FlashcardServiceLogicException("Flashcard with id " + id + " is not in the deck");
        }
    }

    public List<FlashcardResponse> findAllByDeckId(Integer deckId) {
        FlashcardDeck deck = flashcardDeckRepository.findById(deckId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find this deck"));

        return flashcardRepository.findAllByDeck(deck).stream().map(flashcardMapper::toResponse).collect(Collectors.toList());
    }


    @Transactional
    public FlashcardResponse addNewFlashcard(Integer deckId, FlashcardRequestDTO flashcardRequestDTO) {
        FlashcardDeck deck = flashcardDeckRepository.findById(deckId)
                .orElseThrow(() -> new ResourceNotFoundException("Deck with id " +
                        deckId + " doesn't exist"));

        if (flashcardRequestDTO.getFrontContent() == null || flashcardRequestDTO.getFrontContent().isEmpty()) {
            throw new FlashcardServiceLogicException("FrontContent cannot be empty");
        }

        if (flashcardRequestDTO.getBackContent() == null || flashcardRequestDTO.getBackContent().isEmpty()) {
            throw new FlashcardServiceLogicException("BackContent cannot be empty");
        }

        Flashcard flashcard = Flashcard.builder()
                .deck(deck)
                .frontContent(flashcardRequestDTO.getFrontContent())
                .backContent(flashcardRequestDTO.getBackContent())
                .audioUrl(flashcardRequestDTO.getAudioUrl())
                .build();

        try {
            return flashcardMapper.toResponse(flashcardRepository.save(flashcard));
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }
    }


    @Transactional
    public void deleteFlashcard(Integer deckId, Long flashcardId) {

        Flashcard flashcard = flashcardRepository.findById(flashcardId).orElseThrow(
                () -> new ResourceNotFoundException("Flashcard with id " + flashcardId + " doesn't exist")
        );

        if (flashcard.getDeck().getId().equals(deckId)) {
            flashcardRepository.delete(flashcard);
        } else {
            throw new FlashcardServiceLogicException("Flashcard with id " + flashcardId + " is not in the deck");
        }
    }

    @Transactional
    public FlashcardResponse updateFlashcard(Integer deckId, Long id, FlashcardRequestDTO flashcardRequestDTO)
            throws ResourceNotFoundException, FlashcardServiceLogicException {

        Flashcard flashcard = flashcardRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Flashcard with id " + id + " doesn't exist")
        );

        if (!flashcard.getDeck().getId().equals(deckId)) {
            throw new FlashcardServiceLogicException("Flashcard with id " + id + " is not in the deck");
        }

        if (flashcardRequestDTO.getFrontContent() == null || flashcardRequestDTO.getFrontContent().isEmpty()) {
            throw new FlashcardServiceLogicException("FrontContent cannot be empty");
        }

        if (flashcardRequestDTO.getBackContent() == null || flashcardRequestDTO.getBackContent().isEmpty()) {
            throw new FlashcardServiceLogicException("BackContent cannot be empty");
        }

        flashcard.setFrontContent(flashcardRequestDTO.getFrontContent());
        flashcard.setBackContent(flashcardRequestDTO.getBackContent());

        try {
            return flashcardMapper.toResponse(flashcardRepository.save(flashcard));
        } catch (Exception e) {
            throw new FlashcardServiceLogicException(e.getMessage());
        }
    }
}
