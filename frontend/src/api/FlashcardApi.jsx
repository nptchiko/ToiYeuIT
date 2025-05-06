import axios from "axios";
import { TokenService } from "../utils/auth-service";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

const getFlashcardFromDeck = async (deck) => {
  const flashcards = await axiosClient
    .get(`/api/decks/${deck.deckId}/flashcards`)
    .then((response) => response.body);
  return flashcards.map((flashcard) => {
    return {
      vietnamese: flashcard.backContent,
      english: flashcard.frontContent,
      id: flashcard.id,
      starred: flashcard.isFavorite,
    };
  });
};

const deleteDeckById = async (id) => {
  const response = await axiosClient.delete(`/api/decks/${id}`);
  console.log(id);
  console.log(response.message);
};

const getAllDecks = async () => {
  const response = await axiosClient.get("/api/decks");
  const decks = response.body;

  const returnedDecks = await Promise.all(
    decks.map(async (deck) => {
      const flashcardsResponse = await getFlashcardFromDeck(deck);
      return {
        id: deck.deckId,
        name: deck.deckName,
        cards: flashcardsResponse,
      };
    }),
  );

  return returnedDecks;
};

const updateFlashcard = async (deckId, flashcardId, newCard) => {
  return await axiosClient.put(
    `/api/decks/${deckId}/flashcards/${flashcardId}`,
    newCard,
  );
};

const createNewDeck = async (newDeck) => {
  return await axiosClient.post("/api/decks", newDeck);
};

const createNewFlashcard = async (deckId, newCard) => {
  return await axiosClient.post(`/api/decks/${deckId}/flashcards`, newCard);
};

const deleteFlashcardById = async (deckId, flashcardId) => {
  return await axiosClient.delete(
    `/api/decks/${deckId}/flashcards/${flashcardId}`,
  );
};
export default {
  getAllDecks,
  createNewDeck,
  updateFlashcard,
  deleteDeckById,
  createNewFlashcard,
  deleteFlashcardById,
};
