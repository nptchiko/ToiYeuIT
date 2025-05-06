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
  const flashcards = await axiosClient.get(
    `/api/decks/${deck.deckId}/flashcards`,
  );
  return flashcards.map((flashcard) => {
    return {
      vietnamese: flashcard.backContent,
      english: flashcard.frontContent,
      id: flashcard.id,
      starred: flashcard.isFavorite,
    };
  });
};

const getAllDecks = async () => {
  const decks = await axiosClient.get("/api/decks");

  const returnedDecks = await Promise.all(
    decks.map(async (deck) => {
      const flashcardsResponse = await getFlashcardFromDeck(deck);
      return { name: deck.deckName, cards: flashcardsResponse };
    }),
  );

  return returnedDecks;
};

const createNewDeck = async (newDeck) => {
  return await axiosClient.post("/api/decks", newDeck);
};

export default { getAllDecks, createNewDeck };
