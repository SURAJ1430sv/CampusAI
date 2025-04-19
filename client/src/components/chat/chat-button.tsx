import { useState } from "react";
import ChatModal from "./chat-modal";
import { useChat } from "@/hooks/use-chat";

export default function ChatButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();

  const handleOpenChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleOpenChat}
          className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          aria-label="Open chat with CampusAI"
        >
          <div className="relative">
            <i className="fas fa-comments text-white text-2xl"></i>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </button>
        <div className="absolute -top-8 right-0 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300">
          Chat with CampusAI
        </div>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
