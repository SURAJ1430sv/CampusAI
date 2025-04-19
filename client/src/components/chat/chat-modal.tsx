import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatMessage from "./chat-message";
import { Button } from "@/components/ui/button";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isTyping, sessionToken, suggestionClicked } = useChat();
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "Admission requirements",
    "Tuition & fees",
    "Available scholarships",
    "Hostel facilities"
  ];

  useEffect(() => {
    // Focus input when modal opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll to bottom when new messages arrive
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  const handleSendMessage = () => {
    if (message.trim() && sessionToken) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-50" 
        onClick={onClose}
      ></div>
      
      <div className="absolute bottom-0 right-0 mb-6 mr-6 md:right-6 md:bottom-6 w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{ height: "550px" }}>
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-robot text-primary"></i>
              </div>
              <div>
                <h3 className="font-medium">CampusAI Assistant</h3>
                <p className="text-xs text-primary-200">Online • Ready to help</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-gray-50" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 mt-1">
                    <i className="fas fa-robot text-white text-xs"></i>
                  </div>
                  <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex flex-col space-y-2 mb-2">
              <div className="text-xs text-gray-500 mb-1">Suggested Questions:</div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full"
                    onClick={() => suggestionClicked(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
              <input 
                type="text" 
                placeholder="Type your question here..." 
                className="flex-1 py-2 px-3 outline-none text-gray-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-primary text-white px-4 hover:bg-primary/90 transition"
                disabled={!message.trim() || !sessionToken}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
