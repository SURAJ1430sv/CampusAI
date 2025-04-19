import OpenAI from "openai";
import { ChatMessage } from "@shared/schema";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const OPENAI_MODEL = "gpt-4o";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function generateChatResponse(messageHistory: ChatMessage[]): Promise<string> {
  try {
    // Convert our message format to OpenAI format
    const formattedMessages = messageHistory.map(msg => ({
      role: msg.role as "user" | "assistant" | "system",
      content: msg.message
    }));

    // Add a system message with instructions
    const systemMessage = {
      role: "system" as const,
      content: `You are CampusAI, an AI assistant for a college. Your purpose is to help students and applicants with information about:

1. Admissions assistance - courses, eligibility, fees, deadlines, application processes
2. Student support - academic calendars, exam schedules, class timetables
3. Administrative help - fee payment queries, hostel info, library hours
4. Campus life and activities

Be concise, friendly, and helpful. If you don't know the answer to a question, politely say so and offer to connect the user with a human staff member. Don't make up specific information about courses, fees, or deadlines. Stick to general information and principles unless specific details were provided in previous messages.

When answering questions about admission requirements, suggest common documents like transcripts, ID proof, test scores, etc. For fees, suggest a range rather than specific amounts unless provided in previous messages.`
    };

    // Prepend the system message
    const messages = [systemMessage, ...formattedMessages];
    
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm experiencing some technical difficulties right now. Please try again later.";
  }
}

// Function to answer common questions directly without using the API (fallback)
export function getFallbackResponse(message: string): string | null {
  const lowercaseMessage = message.toLowerCase();
  
  // Admissions related
  if (lowercaseMessage.includes("admission") || lowercaseMessage.includes("apply")) {
    return "To apply for admission, you'll need to complete our online application form, submit your academic transcripts, and pay the application fee. Would you like me to guide you through the process step by step?";
  }
  
  // Fees related
  if (lowercaseMessage.includes("fee") || lowercaseMessage.includes("cost") || lowercaseMessage.includes("tuition")) {
    return "Tuition fees vary by program. For undergraduate programs, the fee ranges from $5,000 to $8,000 per semester. Graduate programs cost between $7,500 and $12,000 per semester. Financial aid and scholarships are available. Would you like information about a specific program or about financial assistance?";
  }
  
  // Scholarships and financial aid
  if (lowercaseMessage.includes("scholarship") || lowercaseMessage.includes("financial aid")) {
    return "We offer merit-based scholarships, need-based grants, and work-study programs. To apply, you'll need to submit our scholarship application form along with your academic records and a personal statement. Would you like me to send you the scholarship application link?";
  }
  
  // Accommodation
  if (lowercaseMessage.includes("hostel") || lowercaseMessage.includes("accommodation") || lowercaseMessage.includes("dorm")) {
    return "We have on-campus housing available in multiple residence halls. Rooms are typically double occupancy and include basic furniture, internet access, and utilities. Prices range from $3,000 to $5,000 per academic year depending on the building and room type. Would you like to see photos of our accommodation options?";
  }
  
  // Default case: no match
  return null;
}
