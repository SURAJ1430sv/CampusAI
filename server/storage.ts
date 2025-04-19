import { nanoid } from "nanoid";
import { 
  User, InsertUser, 
  ChatSession, InsertChatSession, 
  ChatMessage, InsertChatMessage,
  FAQ, InsertFaq
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat session methods
  createChatSession(session: Omit<InsertChatSession, "sessionToken">): Promise<ChatSession>;
  getChatSession(sessionToken: string): Promise<ChatSession | undefined>;
  
  // Chat message methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]>;
  
  // FAQ methods
  createFaq(faq: InsertFaq): Promise<FAQ>;
  getFaqs(): Promise<FAQ[]>;
  getFaqsByCategory(category: string): Promise<FAQ[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatSessions: Map<number, ChatSession>;
  private chatMessages: Map<number, ChatMessage>;
  private faqsList: Map<number, FAQ>;
  private currentUserId: number;
  private currentSessionId: number;
  private currentMessageId: number;
  private currentFaqId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.faqsList = new Map();
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentMessageId = 1;
    this.currentFaqId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with some FAQs
    this.initializeFaqs();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Chat session methods
  async createChatSession(sessionData: Omit<InsertChatSession, "sessionToken">): Promise<ChatSession> {
    const id = this.currentSessionId++;
    const sessionToken = nanoid();
    const createdAt = new Date();
    const userId = sessionData.userId || null;
    
    const session: ChatSession = { 
      id, 
      sessionToken, 
      createdAt,
      userId
    };
    
    this.chatSessions.set(id, session);
    return session;
  }
  
  async getChatSession(sessionToken: string): Promise<ChatSession | undefined> {
    return Array.from(this.chatSessions.values()).find(
      (session) => session.sessionToken === sessionToken
    );
  }
  
  // Chat message methods
  async createChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentMessageId++;
    const createdAt = new Date();
    
    const message: ChatMessage = {
      id,
      createdAt,
      ...messageData
    };
    
    this.chatMessages.set(id, message);
    return message;
  }
  
  async getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((message) => message.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  // FAQ methods
  async createFaq(faqData: InsertFaq): Promise<FAQ> {
    const id = this.currentFaqId++;
    
    const faq: FAQ = {
      id,
      ...faqData
    };
    
    this.faqsList.set(id, faq);
    return faq;
  }
  
  async getFaqs(): Promise<FAQ[]> {
    return Array.from(this.faqsList.values());
  }
  
  async getFaqsByCategory(category: string): Promise<FAQ[]> {
    return Array.from(this.faqsList.values())
      .filter((faq) => faq.category === category);
  }
  
  // Initialize some common FAQs
  private async initializeFaqs() {
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
  }
}

export const storage = new MemStorage();
