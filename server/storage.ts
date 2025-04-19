import { 
  User, InsertUser, 
  ChatSession, InsertChatSession, 
  ChatMessage, InsertChatMessage,
  FAQ, InsertFaq
} from "@shared/schema";
import session from "express-session";

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

// Import and use DatabaseStorage
import { DatabaseStorage } from './database-storage';
export const storage = new DatabaseStorage();