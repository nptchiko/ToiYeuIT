import { useState, useEffect } from "react";
import {
  Volume2,
  Star,
  Edit,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize,
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function Flashcard() {
  const [deckIndex, setDeckIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showDeleteDeckConfirm, setShowDeleteDeckConfirm] = useState(false);
  const [showDeleteCardConfirm, setShowDeleteCardConfirm] = useState(false);
  const [newCardVie, setNewCardVie] = useState("");
  const [newCardEng, setNewCardEng] = useState("");
  const [studyMode, setStudyMode] = useState("all"); // all, starred
  const [decks, setDecks] = useState([
    {
      name: "Từ vựng cơ bản",
      cards: [
        { vietnamese: "một", english: "one", starred: false },
        { vietnamese: "hai", english: "two", starred: false },
        { vietnamese: "ba", english: "three", starred: false },
        { vietnamese: "bốn", english: "four", starred: false },
        { vietnamese: "năm", english: "five", starred: false },
      ],
    },
    {
      name: "Từ vựng động vật",
      cards: [
        { vietnamese: "con mèo", english: "cat", starred: false },
        { vietnamese: "con chó", english: "dog", starred: false },
        { vietnamese: "con voi", english: "elephant", starred: false },
      ],
    },
  ]);

  // Handle auto-play
  useEffect(() => {
    if (autoPlayEnabled) {
      const interval = setInterval(() => {
        nextCard();
      }, 3000);
      setAutoPlayInterval(interval);
      return () => clearInterval(interval);
    } else if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
  }, [autoPlayEnabled, cardIndex, deckIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        showAddDeck ||
        showAddCard ||
        showEditCard ||
        showDeleteDeckConfirm ||
        showDeleteCardConfirm
      ) {
        return; // Disable shortcuts when modals are open
      }
      switch (e.key) {
        case "ArrowRight":
          nextCard();
          break;
        case "ArrowLeft":
          prevCard();
          break;
        case " ":
          flipCard();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    cardIndex,
    flipped,
    showAddDeck,
    showAddCard,
    showEditCard,
    showDeleteDeckConfirm,
    showDeleteCardConfirm,
  ]);

  const currentDeck = decks[deckIndex];

  // Filter cards based on study mode
  const filteredCards = currentDeck?.cards.filter((card) => {
    if (studyMode === "starred") return card.starred;
    return true;
  });

  const currentCard = filteredCards?.[cardIndex];

  const nextCard = () => {
    if (cardIndex < filteredCards.length - 1) {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
    } else if (autoPlayEnabled) {
      setCardIndex(0);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      setFlipped(false);
    }
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const speakText = () => {
    const text = flipped ? currentCard.vietnamese : currentCard.english;
    const lang = flipped ? "vi-VN" : "en-US";
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleStarred = () => {
    const newDecks = [...decks];
    const cardInDeck = newDecks[deckIndex].cards.find(
      (c) =>
        c.english === currentCard.english &&
        c.vietnamese === currentCard.vietnamese
    );
    if (cardInDeck) {
      cardInDeck.starred = !cardInDeck.starred;
      setDecks(newDecks);
    }
  };

  const addNewDeck = () => {
    if (newDeckName.trim()) {
      setDecks([...decks, { name: newDeckName, cards: [] }]);
      setNewDeckName("");
      setShowAddDeck(false);
    }
  };

  const deleteDeck = () => {
    if (decks.length <= 1) {
      alert("Không thể xóa bộ thẻ duy nhất!");
      return;
    }
    const newDecks = [...decks];
    newDecks.splice(deckIndex, 1);
    setDecks(newDecks);
    setDeckIndex(0);
    setCardIndex(0);
    setShowDeleteDeckConfirm(false);
  };

  const addNewCard = () => {
    if (newCardVie.trim() && newCardEng.trim()) {
      const newDecks = [...decks];
      newDecks[deckIndex].cards.push({
        vietnamese: newCardVie,
        english: newCardEng,
        starred: false,
      });
      setDecks(newDecks);
      setNewCardVie("");
      setNewCardEng("");
      setShowAddCard(false);
    }
  };

  const editCard = () => {
    if (!currentCard) return;
    setNewCardVie(currentCard.vietnamese);
    setNewCardEng(currentCard.english);
    setShowEditCard(true);
  };

  const saveEditedCard = () => {
    if (newCardVie.trim() && newCardEng.trim()) {
      const newDecks = [...decks];
      const cardInDeck = newDecks[deckIndex].cards.find(
        (c) =>
          c.english === currentCard.english &&
          c.vietnamese === currentCard.vietnamese
      );
      if (cardInDeck) {
        cardInDeck.vietnamese = newCardVie;
        cardInDeck.english = newCardEng;
        setDecks(newDecks);
        setNewCardVie("");
        setNewCardEng("");
        setShowEditCard(false);
      }
    }
  };

  const deleteCard = () => {
    if (!currentCard) return;
    const newDecks = [...decks];
    const cardIndexInDeck = newDecks[deckIndex].cards.findIndex(
      (c) =>
        c.english === currentCard.english &&
        c.vietnamese === currentCard.vietnamese
    );
    if (cardIndexInDeck !== -1) {
      newDecks[deckIndex].cards.splice(cardIndexInDeck, 1);
      setDecks(newDecks);
      if (cardIndex >= filteredCards.length - 1) {
        setCardIndex(Math.max(0, filteredCards.length - 2));
      }
      setShowDeleteCardConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 flex items-center gap-2">
            <span>FlashCards</span>
          </h1>
        </div>

        {/* Deck selection */}
        <div className="flex mb-6 gap-4">
          <button
            className="flex-1 bg-indigo-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-800 transition-colors"
            onClick={() => setShowAddDeck(true)}
          >
            <Plus size={20} />
            <span>Thêm bộ thẻ</span>
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            onClick={() => setShowDeleteDeckConfirm(true)}
            disabled={decks.length <= 1}
          >
            <Trash2 size={20} />
            <span>Xóa bộ thẻ</span>
          </button>
        </div>

        {/* Deck management */}
        <div className="mb-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="font-medium text-gray-700">Bộ thẻ:</label>
          </div>
          <select
            className="w-full bg-white p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={deckIndex}
            onChange={(e) => {
              setDeckIndex(parseInt(e.target.value));
              setCardIndex(0);
              setFlipped(false);
            }}
          >
            {decks.map((deck, idx) => (
              <option key={idx} value={idx}>
                {deck.name} ({deck.cards.length} thẻ)
              </option>
            ))}
          </select>
          <div className="mt-4">
            <select
              className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={studyMode}
              onChange={(e) => {
                setStudyMode(e.target.value);
                setCardIndex(0);
              }}
            >
              <option value="all">Tất cả thẻ</option>
              <option value="starred">Đã đánh dấu sao</option>
            </select>
          </div>
        </div>

        {/* Flashcard */}
        {currentDeck && filteredCards.length > 0 && currentCard ? (
          <div className="relative">
            <div
              className="bg-indigo-900 text-white rounded-lg p-16 flex flex-col items-center justify-center shadow-lg h-64 cursor-pointer relative overflow-hidden transition-transform duration-300 hover:scale-105"
              onClick={flipCard}
            >
              {/* Progress indicator */}
              <div
                className="absolute top-0 left-0 h-1 bg-blue-400"
                style={{
                  width: `${((cardIndex + 1) / filteredCards.length) * 100}%`,
                  transition: "width 0.3s ease",
                }}
              ></div>

              {/* Card actions */}
              <div className="absolute top-4 right-4 flex gap-3">
                <button
                  className="text-white hover:text-blue-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    editCard();
                  }}
                  title="Chỉnh sửa thẻ"
                >
                  <Edit size={20} />
                </button>
                <button
                  className={`${
                    currentCard.starred
                      ? "text-yellow-300 fill-yellow-300"
                      : "text-white"
                  } transition-colors`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStarred();
                  }}
                  title="Đánh dấu sao để học lại"
                >
                  <Star size={20} />
                </button>
                <button
                  className="text-white hover:text-blue-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText();
                  }}
                  title="Phát âm"
                >
                  <Volume2 size={20} />
                </button>
                <button
                  className="text-white hover:text-red-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteCardConfirm(true);
                  }}
                  title="Xóa thẻ"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Card content */}
              <div className="text-center text-3xl font-bold transition-opacity duration-300">
                {flipped ? currentCard.vietnamese : currentCard.english}
              </div>

              {/* Tap hint */}
              <div className="absolute bottom-2 right-2 text-xs text-white opacity-50">
                Nhấn để lật thẻ
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                className="p-3 bg-white rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
                onClick={prevCard}
                disabled={cardIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <div className="text-gray-700 font-medium">
                {cardIndex + 1} / {filteredCards.length}
              </div>
              <div className="flex gap-3">
                <button
                  className={`p-3 rounded-full shadow-md ${
                    autoPlayEnabled
                      ? "bg-red-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  } transition-colors`}
                  onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                  title={autoPlayEnabled ? "Dừng" : "Tự động phát"}
                >
                  <Play size={24} />
                </button>
                <button
                  className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={() => document.documentElement.requestFullscreen()}
                  title="Toàn màn hình"
                >
                  <Maximize size={24} />
                </button>
              </div>
              <button
                className="p-3 bg-white rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
                onClick={nextCard}
                disabled={cardIndex === filteredCards.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
            <p className="mb-6 text-gray-600">
              {studyMode === "starred"
                ? "Chưa có thẻ nào được đánh dấu sao"
                : "Chưa có thẻ nào trong bộ này"}
            </p>
            <button
              className="bg-indigo-900 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
              onClick={() => {
                setShowAddCard(true);
                setStudyMode("all");
              }}
            >
              Thêm thẻ mới
            </button>
          </div>
        )}

        {/* Add/edit card button */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-white px-6 py-3 rounded-lg border border-indigo-900 text-indigo-900 flex items-center gap-2 hover:bg-indigo-50 transition-colors"
            onClick={() => {
              setShowAddCard(true);
              setNewCardVie("");
              setNewCardEng("");
            }}
          >
            <Edit size={20} />
            Thêm thẻ mới
          </button>
        </div>

        {/* Add deck modal */}
        {showAddDeck && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Thêm bộ thẻ mới
                </h2>
                <button onClick={() => setShowAddDeck(false)}>
                  <X size={24} className="text-gray-600 hover:text-gray-800" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Tên bộ thẻ"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setShowAddDeck(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                  onClick={addNewDeck}
                  disabled={!newDeckName.trim()}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add card modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Thêm thẻ mới
                </h2>
                <button onClick={() => setShowAddCard(false)}>
                  <X size={24} className="text-gray-600 hover:text-gray-800" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiếng Việt
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newCardVie}
                  onChange={(e) => setNewCardVie(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiếng Anh
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newCardEng}
                  onChange={(e) => setNewCardEng(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setShowAddCard(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                  onClick={addNewCard}
                  disabled={!newCardVie.trim() || !newCardEng.trim()}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit card modal */}
        {showEditCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Chỉnh sửa thẻ
                </h2>
                <button onClick={() => setShowEditCard(false)}>
                  <X size={24} className="text-gray-600 hover:text-gray-800" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiếng Việt
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newCardVie}
                  onChange={(e) => setNewCardVie(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiếng Anh
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newCardEng}
                  onChange={(e) => setNewCardEng(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setShowEditCard(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                  onClick={saveEditedCard}
                  disabled={!newCardVie.trim() || !newCardEng.trim()}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete deck confirmation modal */}
        {showDeleteDeckConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Xóa bộ thẻ?
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn có chắc muốn xóa bộ thẻ "{currentDeck.name}"? Hành động này
                không thể hoàn tác.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setShowDeleteDeckConfirm(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={deleteDeck}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete card confirmation modal */}
        {showDeleteCardConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Xóa thẻ?</h2>
              <p className="text-gray-600 mb-6">
                Bạn có chắc muốn xóa thẻ này? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setShowDeleteCardConfirm(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={deleteCard}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom styles */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
