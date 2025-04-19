import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatModal from "@/components/chat/chat-modal";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();

  const handleStartChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50">
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About CampusAI</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about how our AI-powered assistant is revolutionizing student support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              CampusAI was developed with a clear mission: to provide instant, accurate information to students and 
              prospective applicants, reducing wait times and enhancing the overall campus experience.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that modern education should be supported by modern solutions. By leveraging 
              artificial intelligence, we're able to provide 24/7 support that scales with the needs of 
              the institution.
            </p>
            <p className="text-gray-600">
              Our goal is to free up administrative staff to focus on complex issues while handling 
              routine queries automatically through our AI assistant.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                <i className="fas fa-university text-7xl text-primary"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Campus Support Redefined</h3>
            <p className="text-gray-600">
              CampusAI represents a new era in student support, combining the best of AI technology with the human touch 
              of campus staff. We're not replacing humans – we're augmenting their capabilities.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-brain text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                CampusAI uses advanced natural language processing to understand student queries and provide relevant, 
                accurate information.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-database text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Constantly Learning</h3>
              <p className="text-gray-600">
                The system continuously improves as it interacts with students, learning from each conversation to 
                provide better responses over time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Human Backup</h3>
              <p className="text-gray-600">
                For complex queries beyond AI capabilities, CampusAI seamlessly connects students with appropriate 
                staff members for personalized assistance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience CampusAI?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Try our chatbot now and get instant answers to your questions about admissions, campus life, and more.
          </p>
          <Button 
            onClick={handleStartChat}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-md shadow-md"
            size="lg"
          >
            Chat With CampusAI Now
          </Button>
        </div>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
