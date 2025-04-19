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
    "Hostel facilities",
    "Campus life",
    "Program offerings",
    "Application deadlines"
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
      
      <div className="absolute bottom-0 right-0 mb-6 mr-6 md:right-6 md:bottom-6 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{ height: "550px" }}>
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-inner">
                <i className="fas fa-robot text-primary text-lg"></i>
              </div>
              <div>
                <h3 className="font-medium text-lg">CampusAI Assistant</h3>
                <p className="text-xs text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-200 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-gradient-to-b from-gray-50 to-white" ref={chatBodyRef}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-robot text-primary text-xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Welcome to CampusAI</h3>
                <p className="text-gray-600 mb-4">Ask me anything about admissions, courses, campus life, or any other college-related questions.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <button 
                      key={index}
                      className="text-sm bg-primary/10 hover:bg-primary/20 text-primary py-1 px-3 rounded-full transition-colors"
                      onClick={() => suggestionClicked(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mr-2 mt-1 shadow-sm">
                    <i className="fas fa-robot text-white text-xs"></i>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg py-2 px-3 max-w-xs shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t bg-white">
            {messages.length > 0 && (
              <div className="flex flex-col space-y-2 mb-3">
                <div className="text-xs font-medium text-gray-500 mb-1">Suggested Questions:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button 
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors"
                      onClick={() => suggestionClicked(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 shadow-sm">
              <input 
                type="text" 
                placeholder="Type your question here..." 
                className="flex-1 py-3 px-4 outline-none text-gray-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-purple-600 text-white px-5 hover:opacity-90 transition-opacity"
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
