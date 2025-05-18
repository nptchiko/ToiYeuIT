package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.FlashcardDeckRequestDTO;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.FlashcardDeckResponse;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.service.FlashcardDeckService;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/decks")
public class FlashcardDeckController {

    private final FlashcardDeckService flashcardDeckService;

    public FlashcardDeckController(FlashcardDeckService flashcardDeckService) {
        this.flashcardDeckService = flashcardDeckService;
    }

    @PostMapping
    public ApiResponse<FlashcardDeckResponse> createDeck(@RequestBody FlashcardDeckRequestDTO flashcardDeckRequestDTO) {
        FlashcardDeckResponse createdDeck = flashcardDeckService.createNewDeck(flashcardDeckRequestDTO);
        return ApiResponse.<FlashcardDeckResponse>builder()
                .code(HttpStatus.CREATED.value())
                .body(createdDeck)
                .message("Deck created successfully")
                .build();
    }

    @GetMapping
    public ApiResponse<List<FlashcardDeckResponse>> findAllDecksOfCurrentUser() {

        List<FlashcardDeckResponse> decks = flashcardDeckService.findAllByUserEmail();
        return ApiResponse.<List<FlashcardDeckResponse>>builder()
                .code(HttpStatus.OK.value())
                .body(decks)
                .message("Retrieved all decks of current user successfully")
                .build();
    }

    @GetMapping("/{deckId}")
    public ApiResponse<FlashcardDeckResponse> findById(@PathVariable Integer deckId)
            throws ResourceNotFoundException {
        FlashcardDeckResponse deck = flashcardDeckService.findById(deckId);
        return ApiResponse.<FlashcardDeckResponse>builder()
                .code(HttpStatus.OK.value())
                .body(deck)
                .message("Deck retrieved successfully")
                .build();
    }

    @PutMapping("/{deckId}")
    public ApiResponse<FlashcardDeckResponse> updateDeck(@PathVariable Integer deckId,
                                                         @RequestBody FlashcardDeckRequestDTO flashcardDeckRequestDTO) {
        FlashcardDeckResponse updatedDeck = flashcardDeckService.updateDeck(deckId, flashcardDeckRequestDTO);
        return ApiResponse.<FlashcardDeckResponse>builder()
                .code(HttpStatus.OK.value())
                .body(updatedDeck)
                .message("Deck updated successfully")
                .build();
    }

    @DeleteMapping("/{deckId}")
    public ApiResponse<String> deleteDeck(@PathVariable Integer deckId) {
        flashcardDeckService.deleteDeck(deckId);
        return ApiResponse.<String>builder()
                .code(HttpStatus.NO_CONTENT.value())
                .body(null)
                .message("Deck deleted successfully")
                .build();
    }
}
