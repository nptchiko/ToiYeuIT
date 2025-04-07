package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.FlashcardDeckRequestDTO;
import com.example.toiyeuit.dto.request.FlashcardRequestDTO;
import com.example.toiyeuit.entity.Flashcard;
import com.example.toiyeuit.entity.FlashcardDeck;
import com.example.toiyeuit.service.FlashcardService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @PostMapping("/decks")
    public FlashcardDeck createDeck(@RequestBody FlashcardDeckRequestDTO flashcardDeckRequestDTO) {
        return flashcardService.createNewDeck(flashcardDeckRequestDTO);
    }

    @PostMapping("/")
    public Flashcard createFlashcard(@RequestBody FlashcardRequestDTO flashcardRequestDTO) {

    }
    // TODO: finish this service later
}
