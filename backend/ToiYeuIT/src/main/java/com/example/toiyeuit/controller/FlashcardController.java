package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.FlashcardRequestDTO;
import com.example.toiyeuit.entity.Flashcard;
import com.example.toiyeuit.exception.FlashcardServiceLogicException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.service.FlashcardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks/{deckId}/flashcards")
public class FlashcardController {

    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping
    public ResponseEntity<List<Flashcard>> getFlashcardsByDeckId(@PathVariable Integer deckId){
        return new ResponseEntity<>(flashcardService.findAllByDeckId(deckId), HttpStatus.OK);
    }

    @GetMapping("/{flashcardId}")
    public ResponseEntity<Flashcard> getFlashcardById(@PathVariable Integer deckId, @PathVariable Long flashcardId)
        throws ResourceNotFoundException, FlashcardServiceLogicException {

        return new ResponseEntity<>(flashcardService.findById(deckId, flashcardId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Flashcard> createFlashcard(@PathVariable Integer deckId,
                                                     @RequestBody FlashcardRequestDTO flashcard)
            throws ResourceNotFoundException, FlashcardServiceLogicException {

        return new ResponseEntity<>(flashcardService.addNewFlashcard(deckId, flashcard), HttpStatus.CREATED);
    }

    @PutMapping("/{flashcardId}")
    public ResponseEntity<Flashcard> updateFlashcard(@PathVariable Integer deckId, @PathVariable Long flashcardId,
                                                     @RequestBody FlashcardRequestDTO flashcard)
            throws ResourceNotFoundException, FlashcardServiceLogicException {

        return new ResponseEntity<>(flashcardService.updateFlashcard(deckId, flashcardId, flashcard), HttpStatus.OK);
    }

    @DeleteMapping("/{flashcardId}")
    public ResponseEntity<?> deleteFlashcard(@PathVariable Integer deckId, @PathVariable Long flashcardId) throws
            ResourceNotFoundException, FlashcardServiceLogicException {

        flashcardService.deleteFlashcard(deckId, flashcardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
