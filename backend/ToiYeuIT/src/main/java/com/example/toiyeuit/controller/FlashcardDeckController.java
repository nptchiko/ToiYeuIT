package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.FlashcardDeckRequestDTO;
import com.example.toiyeuit.dto.response.FlashcardDeckResponse;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.service.FlashcardDeckService;
import com.example.toiyeuit.utils.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
public class FlashcardDeckController {

    private final FlashcardDeckService flashcardDeckService;

    public FlashcardDeckController(FlashcardDeckService flashcardDeckService) {
        this.flashcardDeckService = flashcardDeckService;
    }

    @PostMapping()
    public ResponseEntity<FlashcardDeckResponse> createDeck(@RequestBody FlashcardDeckRequestDTO flashcardDeckRequestDTO) {
        return new ResponseEntity<>(flashcardDeckService.createNewDeck(flashcardDeckRequestDTO), HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<FlashcardDeckResponse>> findAllDecksOfCurrentUser() {
        return new ResponseEntity<>(flashcardDeckService.findAllByUserEmail(), HttpStatus.OK);
    }

    @GetMapping("/{deckId}")
    public ResponseEntity<FlashcardDeckResponse> findById(@PathVariable Integer deckId) throws ResourceNotFoundException {
        return new ResponseEntity<>(flashcardDeckService.findById(deckId), HttpStatus.OK);
    }

    @PutMapping("/{deckId}")
    public ResponseEntity<FlashcardDeckResponse> updateDeck(@PathVariable Integer deckId, @RequestBody FlashcardDeckRequestDTO flashcardDeckRequestDTO) {
        return new ResponseEntity<>(flashcardDeckService.updateDeck(deckId, flashcardDeckRequestDTO), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteDeck(@PathVariable Integer deckId) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
