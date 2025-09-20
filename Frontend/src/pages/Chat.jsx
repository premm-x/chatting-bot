import Loading from "../components/Loading";
import { axiosInstance } from "../config/backendAPI/axios";
import { useState, useEffect, useRef } from "react";
import 'remixicon/fonts/remixicon.css';
import ReactMarkdown from "react-markdown";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: <Loading /> },
    ]);
    setInput("");

    document.getElementById('sendbtn').disabled = true;
    document.getElementById('sendbtn').innerHTML = '<i class="ri-stop-circle-line"></i> Stop';
    document.getElementById('sendbtn').style.backgroundColor = 'oklch(37.9% 0.146 265.522)';

    try {
      const response = await axiosInstance.post("/chat", { message: input });
      const botReply = response.data.reply;

      setMessages((prev) => {
        const update = [...prev];
        update[update.length - 1] = { ...update[update.length - 1], text: botReply };
        return update;
      });

      document.getElementById('sendbtn').disabled = false;
      document.getElementById('sendbtn').innerText = 'Send';
      document.getElementById('sendbtn').style.backgroundColor = 'oklch(62.3% 0.214 259.815)';


    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <div className={`w-full max-w-2xl ${messages.length != 0 ? 'h-[90vh] py-2' : ''}  flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden`}>

        <div className={`flex-1 overflow-y-auto ${messages.length != 0 ? 'p-4' : ''}  space-y-2 max-h-[80vh]`}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <img
                  src="https://i.pinimg.com/1200x/31/4b/96/314b960aa8fee08076b6f2db5e80ca4c.jpg"
                  alt="AI"
                  className="w-8 h-8 rounded-full"
                />
              )}

              <div
                className={`px-4 py-2 rounded-xl max-w-sm overflow-hidden text-sm shadow ${msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <img
                  src="https://i.pinimg.com/736x/ae/31/c8/ae31c8133ba753a0fd618a50bf78f56d.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full ml-1"
                />
              )}

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
          // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            id="sendbtn"
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
