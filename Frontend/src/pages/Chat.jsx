import { axiosInstance } from "../config/backendAPI/axios";
import { useState, useEffect, useRef } from "react";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await axiosInstance.post("/chat", { message: input });
      const botReply = response.data.reply;

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: botReply },
      ]);

      setInput("");

    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <div className="w-full max-w-2xl flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        
        <div className={`flex-1 overflow-y-auto ${messages.length != 0 ? 'p-4' : ''}  space-y-3 max-h-[70vh]`}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center border-t border-gray-200 p-3">
          <input
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;
