import { 
  User, InsertUser, 
  ChatSession, InsertChatSession, 
  ChatMessage, InsertChatMessage,
  FAQ, InsertFaq,
  users, chatSessions, chatMessages, faqs
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { IStorage } from "./storage";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
    
    // Initialize with some FAQs if they don't exist yet
    this.initializeFaqs();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const result = await db.insert(users).values(user).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  
  // Chat session methods
  async createChatSession(session: Omit<InsertChatSession, "sessionToken">): Promise<ChatSession> {
    try {
      const newSession = {
        ...session,
        userId: session.userId || null,
        sessionToken: Math.random().toString(36).substring(2, 15),
        createdAt: new Date()
      };
      
      const result = await db.insert(chatSessions).values(newSession).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating chat session:", error);
      throw error;
    }
  }
  
  async getChatSession(sessionToken: string): Promise<ChatSession | undefined> {
    try {
      const result = await db.select().from(chatSessions).where(eq(chatSessions.sessionToken, sessionToken));
      return result[0];
    } catch (error) {
      console.error("Error getting chat session:", error);
      return undefined;
    }
  }
  
  // Chat message methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    try {
      const newMessage = {
        ...message,
        createdAt: new Date()
      };
      
      const result = await db.insert(chatMessages).values(newMessage).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating chat message:", error);
      throw error;
    }
  }
  
  async getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
    try {
      const result = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sessionId))
        .orderBy(chatMessages.createdAt);
        
      return result;
    } catch (error) {
      console.error("Error getting chat messages by session id:", error);
      return [];
    }
  }
  
  // FAQ methods
  async createFaq(faq: InsertFaq): Promise<FAQ> {
    try {
      const result = await db.insert(faqs).values(faq).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating FAQ:", error);
      throw error;
    }
  }
  
  async getFaqs(): Promise<FAQ[]> {
    try {
      return await db.select().from(faqs);
    } catch (error) {
      console.error("Error getting FAQs:", error);
      return [];
    }
  }
  
  async getFaqsByCategory(category: string): Promise<FAQ[]> {
    try {
      return await db.select().from(faqs).where(eq(faqs.category, category));
    } catch (error) {
      console.error("Error getting FAQs by category:", error);
      return [];
    }
  }
  
  // Initialize with some common FAQs if table is empty
  private async initializeFaqs() {
    try {
      const existingFaqs = await db.select().from(faqs);
      
      if (existingFaqs.length === 0) {
        const commonFaqs: InsertFaq[] = [
          {
            question: "What courses does the college offer?",
            answer: "Our college offers a wide range of undergraduate and postgraduate programs including Computer Science, Engineering, Business, Arts, Sciences, and more. You can ask the chatbot for specific details about any program you're interested in.",
            category: "admissions"
          },
          {
            question: "How do I apply for admission?",
            answer: "You can apply online through our admission portal. The chatbot can guide you through the entire application process, including required documents, deadlines, and eligibility criteria for your chosen program.",
            category: "admissions"
          },
          {
            question: "Is the chatbot available 24/7?",
            answer: "Yes! CampusAI is available 24 hours a day, 7 days a week to answer your questions. You can access it anytime from anywhere with an internet connection.",
            category: "general"
          },
          {
            question: "What if the chatbot can't answer my question?",
            answer: "If CampusAI can't answer your question, it will connect you with a human representative or provide contact information for the relevant department. You can also submit a ticket for complex inquiries that require human assistance.",
            category: "general"
          },
          {
            question: "Can the chatbot help me with my fee payment?",
            answer: "CampusAI can provide information about fee structures, payment deadlines, and available payment methods. For security reasons, actual payments are processed through our secure payment portal, which the chatbot can direct you to.",
            category: "administrative"
          }
        ];
        
        for (const faq of commonFaqs) {
          await this.createFaq(faq);
        }
        console.log("Initialized database with default FAQs");
      }
    } catch (error) {
      console.error("Error initializing FAQs:", error);
    }
  }
}