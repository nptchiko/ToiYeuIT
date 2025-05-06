package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.FlashcardRequestDTO;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.FlashcardResponse;
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
    public ApiResponse<List<FlashcardResponse>> getFlashcardsByDeckId(@PathVariable Integer deckId){

        return ApiResponse.<List<FlashcardResponse>>builder()
                .code(HttpStatus.OK.value())
                .body(flashcardService.findAllByDeckId(deckId))
                .message("Retrieved all cards of deck " + deckId + " successfully")
                .build();
    }

    @GetMapping("/{flashcardId}")
    public ApiResponse<FlashcardResponse> getFlashcardById(@PathVariable Integer deckId, @PathVariable Long flashcardId)
        throws ResourceNotFoundException, FlashcardServiceLogicException {

        return ApiResponse.<FlashcardResponse>builder()
                .code(HttpStatus.OK.value())
                .body(flashcardService.findById(deckId, flashcardId))
                .message("Retrieved card successfully")
                .build();
//        return new ResponseEntity<>(flashcardService.findById(deckId, flashcardId), HttpStatus.OK);
    }

    @PostMapping
    public ApiResponse<FlashcardResponse> createFlashcard(@PathVariable Integer deckId,
                                                     @RequestBody FlashcardRequestDTO flashcard)
            throws ResourceNotFoundException, FlashcardServiceLogicException {

        return ApiResponse.<FlashcardResponse>builder()
                .code(HttpStatus.CREATED.value())
                .body(flashcardService.addNewFlashcard(deckId, flashcard))
                .message("Created a new flashcard")
                .build();
//        return new ResponseEntity<>(flashcardService.addNewFlashcard(deckId, flashcard), HttpStatus.CREATED);
    }

    @PutMapping("/{flashcardId}")
    public ApiResponse<FlashcardResponse> updateFlashcard(@PathVariable Integer deckId, @PathVariable Long flashcardId,
                                                          @RequestBody FlashcardRequestDTO flashcard)
            throws ResourceNotFoundException, FlashcardServiceLogicException {
        return ApiResponse.<FlashcardResponse>builder()
                .code(HttpStatus.OK.value())
                .body(flashcardService.updateFlashcard(deckId, flashcardId, flashcard))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{flashcardId}")
    public ApiResponse<String> deleteFlashcard(@PathVariable Integer deckId, @PathVariable Long flashcardId) throws
            ResourceNotFoundException, FlashcardServiceLogicException {

        flashcardService.deleteFlashcard(deckId, flashcardId);

       return ApiResponse.<String>builder()
               .code(HttpStatus.NO_CONTENT.value())
               .body(null)
               .message("No problem calling delete endpoint")
               .build();
    }
}
