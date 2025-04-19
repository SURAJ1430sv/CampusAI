import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import ChatModal from "@/components/chat/chat-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, error } = useQuery<{ faqs: FAQ[], success: boolean }>({
    queryKey: ['/api/faqs'],
  });

  const handleStartChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our college and services.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <Skeleton className="h-10 w-full max-w-md mx-auto mb-8" />
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sorry, we couldn't load the FAQs. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const faqs = data?.faqs || [];
  
  // Get unique categories
  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];
  
  // Filter FAQs by category
  const filteredFaqs = activeTab === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeTab);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our college and services. If you can't find what you're looking for, 
            chat with our AI assistant for immediate help.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                    <AccordionTrigger className="font-medium text-gray-900 px-6 py-4 bg-gray-50 hover:bg-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 py-4 bg-white">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our AI assistant is available 24/7 to help answer any specific questions you might have about our college.
          </p>
          <Button 
            onClick={handleStartChat}
            className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-2 px-6"
            size="lg"
          >
            Chat With CampusAI
          </Button>
        </div>
      </div>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
