import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatModal from "@/components/chat/chat-modal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();

  const handleStartChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-700 to-purple-700 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Your 24/7 College Assistant is Here to Help
            </h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Get instant answers about admissions, courses, campus life, and more. CampusAI is always available to guide you through your college journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleStartChat}
                className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-6 px-6"
                size="lg"
              >
                Start Chatting Now
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent hover:bg-white/10 border-2 border-white font-semibold py-6 px-6"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white rounded-xl shadow-xl p-4 max-w-md mx-auto">
              <div className="flex items-center p-2 border-b border-gray-200">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-robot text-primary-foreground text-sm"></i>
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium">CampusAI</h3>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              
              <div className="p-3 h-64 overflow-y-auto bg-gray-50 rounded-lg my-3">
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
                    <p className="text-gray-900 text-sm">Hello! I'm CampusAI, your college assistant. How can I help you today?</p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-3">
                  <div className="bg-primary rounded-lg py-2 px-3 max-w-xs text-white">
                    <p className="text-sm">What documents do I need for admission to BSc Computer Science?</p>
                  </div>
                </div>
                
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
                    <p className="text-gray-900 text-sm">For BSc Computer Science admission, you'll need:</p>
                    <ul className="list-disc list-inside text-sm text-gray-900 mt-1">
                      <li>10th & 12th mark sheets</li>
                      <li>Valid ID proof</li>
                      <li>Passport-sized photographs</li>
                      <li>Proof of address</li>
                      <li>Entrance exam scores (if applicable)</li>
                    </ul>
                    <p className="text-sm text-gray-900 mt-2">Would you like me to guide you through the application process?</p>
                  </div>
                </div>
              </div>
              
              <div className="flex border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                <input 
                  type="text" 
                  placeholder="Type your question here..." 
                  className="flex-1 py-2 px-3 outline-none text-gray-700"
                  disabled
                />
                <button 
                  className="bg-primary text-white px-4 hover:bg-primary/90 transition"
                  onClick={handleStartChat}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f3f4f6" fillOpacity="1" d="M0,96L60,101.3C120,107,240,117,360,133.3C480,149,600,171,720,160C840,149,960,107,1080,96C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
