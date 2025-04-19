import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatModal from "@/components/chat/chat-modal";

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();

  const handleStartChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-purple-600 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
          Chat with CampusAI now to get instant answers to all your college-related questions.
        </p>
        <Button 
          onClick={handleStartChat}
          className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-6 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1"
          size="lg"
        >
          Start Chatting Now
        </Button>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
