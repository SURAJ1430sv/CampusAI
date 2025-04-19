import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import { generateChatResponse, getFallbackResponse } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Chat session endpoints
  app.post("/api/chat/session", async (req, res) => {
    try {
      // If user is authenticated, associate the chat session with the user
      const userId = req.isAuthenticated() ? (req.user as any).id : null;
      const sessionData = { userId };
      const session = await storage.createChatSession(sessionData);
      
      // Initialize the chat with a welcome message
      await storage.createChatMessage({
        sessionId: session.id,
        message: "Hello! I'm CampusAI, your college assistant. How can I help you today?",
        role: "assistant"
      });
      
      // Add a follow-up message with suggestions
      await storage.createChatMessage({
        sessionId: session.id,
        message: "You can ask me about:\n- Admissions & Application Process\n- Programs & Courses\n- Campus Facilities\n- Fees & Financial Aid\n- Student Life & Activities",
        role: "assistant"
      });
      
      res.json({ 
        sessionToken: session.sessionToken,
        success: true 
      });
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(500).json({ 
        message: "Failed to create chat session", 
        success: false 
      });
    }
  });
  
  // Get messages for a session
  app.get("/api/chat/:sessionToken/messages", async (req, res) => {
    try {
      const { sessionToken } = req.params;
      const session = await storage.getChatSession(sessionToken);
      
      if (!session) {
        return res.status(404).json({ 
          message: "Chat session not found", 
          success: false 
        });
      }
      
      const messages = await storage.getChatMessagesBySessionId(session.id);
      res.json({ messages, success: true });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ 
        message: "Failed to fetch chat messages", 
        success: false 
      });
    }
  });
  
  // Send a message
  const sendMessageSchema = z.object({
    message: z.string().min(1)
  });
  
  app.post("/api/chat/:sessionToken/message", async (req, res) => {
    try {
      const { sessionToken } = req.params;
      const validation = sendMessageSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid message format", 
          success: false 
        });
      }
      
      const { message } = validation.data;
      const session = await storage.getChatSession(sessionToken);
      
      if (!session) {
        return res.status(404).json({ 
          message: "Chat session not found", 
          success: false 
        });
      }
      
      // Store user message
      const userMessage = await storage.createChatMessage({
        sessionId: session.id,
        message,
        role: "user"
      });
      
      // Get conversation history
      const messages = await storage.getChatMessagesBySessionId(session.id);
      
      // Try to generate AI response using OpenAI
      let aiResponse;
      try {
        aiResponse = await generateChatResponse(messages);
      } catch (error) {
        console.error("Error generating chat response:", error);
        
        // Use fallback response if OpenAI fails
        const fallbackResponse = getFallbackResponse(message);
        if (fallbackResponse) {
          aiResponse = fallbackResponse;
        } else {
          aiResponse = "I'm experiencing some technical difficulties right now. Please try again later or contact our support team for assistance.";
        }
      }
      
      // Store AI response
      const botMessage = await storage.createChatMessage({
        sessionId: session.id,
        message: aiResponse,
        role: "assistant"
      });
      
      res.json({ 
        userMessage,
        botMessage,
        success: true 
      });
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).json({ 
        message: "Failed to process message", 
        success: false 
      });
    }
  });
  
  // Get FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      const faqs = category 
        ? await storage.getFaqsByCategory(category)
        : await storage.getFaqs();
        
      res.json({ faqs, success: true });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ 
        message: "Failed to fetch FAQs", 
        success: false 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
