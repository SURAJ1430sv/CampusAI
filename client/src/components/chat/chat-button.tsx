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
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition"
          aria-label="Open chat"
        >
          <i className="fas fa-comments text-white text-2xl"></i>
        </button>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
