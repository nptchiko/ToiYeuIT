import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi là ET bot. Hỏi tôi bất cứ điều gì." },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref dùng để tự động cuộn xuống cuối khung chat
  const messagesEndRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_GEMINI_API_URL;
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Tự động cuộn xuống mỗi khi tin nhắn thay đổi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xử lý khi người dùng nhập
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Hàm xử lý khi gửi tin nhắn
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = inputValue.trim();
    if (!userMessage || isLoading || !API_KEY || !API_BASE_URL) return;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");
    setIsLoading(true);
    try {
      const history = messages.map((msg) => ({
        role: msg.sender === "bot" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));
      const response = await axios.post(
        `${API_BASE_URL}?key=${API_KEY}`,
        {
          contents: [
            ...history,
            { role: "user", parts: [{ text: userMessage }] },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const botMessage =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      // Thêm tin nhắn bot vào giao diện
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botMessage?.trim() || "Bot không có phản hồi hợp lệ.",
        },
      ]);
    } catch (err) {
      // Xử lý lỗi API hoặc mạng
      const errMsg = err.response?.data?.error?.message || "Lỗi khi gọi API.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Lỗi: ${errMsg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading bot typing */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 italic">
              ET đang trả lời...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 flex"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !inputValue.trim()}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
