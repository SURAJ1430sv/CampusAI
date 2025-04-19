import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { nanoid } from "nanoid";

interface Message {
  role: 'user' | 'assistant';
  message: string;
}

interface ChatSession {
  sessionToken: string;
  success: boolean;
}

interface ChatResponse {
  userMessage: {
    id: number;
    sessionId: number;
    message: string;
    role: string;
    createdAt: string;
  };
  botMessage: {
    id: number;
    sessionId: number;
    message: string;
    role: string;
    createdAt: string;
  };
  success: boolean;
}

interface UseChat {
  messages: Message[];
  sendMessage: (message: string) => void;
  isTyping: boolean;
  sessionToken: string | null;
  initiateChat: () => void;
  suggestionClicked: (suggestion: string) => void;
}

export function useChat(): UseChat {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();
  
  // Get the session token from local storage on load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('chatSessionToken');
      if (storedToken) {
        setSessionToken(storedToken);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);
  
  // Create a new chat session
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/chat/session', {});
      return res.json() as Promise<ChatSession>;
    },
    onSuccess: (data) => {
      if (data.success && data.sessionToken) {
        setSessionToken(data.sessionToken);
        localStorage.setItem('chatSessionToken', data.sessionToken);
        
        // Fetch messages for this session
        queryClient.invalidateQueries({ queryKey: [`/api/chat/${data.sessionToken}/messages`] });
      }
    },
  });
  
  // Fetch messages for a session
  const { data: messagesData } = useQuery<{ messages: Message[], success: boolean }>({
    queryKey: [`/api/chat/${sessionToken}/messages`],
    enabled: !!sessionToken,
  });
  
  // Update messages when data is loaded
  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData]);
  
  // Send a message
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!sessionToken) throw new Error("No session token");
      
      // Show user message immediately
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', message }
      ]);
      
      // Show typing indicator
      setIsTyping(true);
      
      const res = await apiRequest('POST', `/api/chat/${sessionToken}/message`, { message });
      return res.json() as Promise<ChatResponse>;
    },
    onSuccess: (data) => {
      setIsTyping(false);
      
      if (data.success) {
        // Add bot message to chat
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', message: data.botMessage.message }
        ]);
        
        // Invalidate the messages query to refetch
        if (sessionToken) {
          queryClient.invalidateQueries({ queryKey: [`/api/chat/${sessionToken}/messages`] });
        }
      }
    },
    onError: (error) => {
      setIsTyping(false);
      console.error("Error sending message:", error);
      
      // Show error message
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          message: "I'm sorry, I'm having trouble processing your request right now. Please try again later." 
        }
      ]);
    }
  });
  
  // Initialize chat
  const initiateChat = () => {
    // Always create a new session when initiating chat
    createSessionMutation.mutate();
  };
  
  // Process suggestion clicks
  const suggestionClicked = (suggestion: string) => {
    if (sessionToken) {
      sendMessageMutation.mutate(suggestion);
    }
  };
  
  return {
    messages,
    sendMessage: (message: string) => sendMessageMutation.mutate(message),
    isTyping: sendMessageMutation.isPending || isTyping,
    sessionToken,
    initiateChat,
    suggestionClicked
  };
}
