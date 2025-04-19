import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatModal from "@/components/chat/chat-modal";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();
  const { user } = useAuth();
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const textToType = "Your journey to success begins with the right guidance.";

  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setTypingText(textToType.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 75);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, textToType]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleStartChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white py-16 md:py-28">
      {/* Animated particles/shapes in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-16 w-48 h-48 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-primary-300/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="text-sm font-medium text-white">AI-Powered College Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your 24/7 College <span className="bg-gradient-to-r from-purple-300 to-primary-200 text-transparent bg-clip-text">Assistant</span> is Here
            </h1>
            
            <div className="relative h-12 mb-8">
              <p className="text-xl text-gray-100">
                {typingText}
                <span className={`w-0.5 h-6 bg-white inline-block ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleStartChat}
                className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-6 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1"
                size="lg"
              >
                <i className="fas fa-comment-dots mr-2"></i>
                Start Chatting
              </Button>
              
              {!user ? (
                <Link href="/auth">
                  <Button 
                    variant="outline" 
                    className="bg-primary-800/30 hover:bg-primary-800/50 border-2 border-white/40 font-semibold py-6 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1"
                    size="lg"
                  >
                    <i className="fas fa-user mr-2"></i>
                    Student Login
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    className="bg-primary-800/30 hover:bg-primary-800/50 border-2 border-white/40 font-semibold py-6 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1"
                    size="lg"
                  >
                    <i className="fas fa-user-graduate mr-2"></i>
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="mt-12 md:mt-16 flex items-center">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">JD</div>
                <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">MK</div>
                <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">TS</div>
                <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">+</div>
              </div>
              <div className="ml-4">
                <p className="text-white/80 text-sm">Join <span className="font-semibold text-white">2,000+</span> students using CampusAI</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-1 max-w-md mx-auto">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="flex items-center p-3 bg-gradient-to-r from-primary to-purple-600">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-robot text-primary text-sm"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">CampusAI</h3>
                    <p className="text-xs text-primary-100">Online • Ready to help</p>
                  </div>
                </div>
                
                <div className="p-4 h-72 overflow-y-auto bg-gray-50 rounded-lg">
                  <div className="flex justify-start mb-4">
                    <div className="flex">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 mt-1">
                        <i className="fas fa-robot text-white text-xs"></i>
                      </div>
                      <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
                        <p className="text-gray-800 text-sm">Hello! I'm CampusAI, your college assistant. How can I help you today?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mb-4">
                    <div className="bg-primary rounded-lg py-2 px-3 max-w-xs text-white">
                      <p className="text-sm">What documents do I need for admission to BSc Computer Science?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start mb-4">
                    <div className="flex">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 mt-1">
                        <i className="fas fa-robot text-white text-xs"></i>
                      </div>
                      <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
                        <p className="text-gray-800 text-sm">For BSc Computer Science admission, you'll need:</p>
                        <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                          <li>10th & 12th mark sheets</li>
                          <li>Valid ID proof</li>
                          <li>Passport-sized photographs</li>
                          <li>Proof of address</li>
                          <li>Entrance exam scores (if applicable)</li>
                        </ul>
                        <p className="text-sm text-gray-800 mt-2">Would you like me to guide you through the application process?</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border-t">
                  <div className="flex space-x-1 mb-3">
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full">
                      Application process
                    </button>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full">
                      Scholarship info
                    </button>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full">
                      Campus tour
                    </button>
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
            
            <div className="flex justify-center mt-6 space-x-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-5 text-center">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs text-white/80">Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-5 text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-white/80">Accurate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-5 text-center">
                <p className="text-2xl font-bold">AI</p>
                <p className="text-xs text-white/80">Powered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L60,101.3C120,107,240,117,360,133.3C480,149,600,171,720,160C840,149,960,107,1080,96C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
