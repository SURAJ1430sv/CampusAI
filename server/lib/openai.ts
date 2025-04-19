import OpenAI from "openai";
import { ChatMessage } from "@shared/schema";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const OPENAI_MODEL = "gpt-4o";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function generateChatResponse(messageHistory: ChatMessage[]): Promise<string> {
  // Maximum number of retries
  const MAX_RETRIES = 2;
  let attempts = 0;
  
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

When answering questions about admission requirements, suggest common documents like transcripts, ID proof, test scores, etc. For fees, suggest a range rather than specific amounts unless provided in previous messages.

Respond to queries about campus activities, clubs, and organizations with enthusiasm, as these are important aspects of college life. If asked about specific majors or departments, provide general information about what students can expect to learn.`
  };

  // Prepend the system message
  const messages = [systemMessage, ...formattedMessages];
  
  // Implement retry logic
  while (attempts <= MAX_RETRIES) {
    try {
      const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    } catch (error: any) {
      attempts++;
      console.error(`Error generating chat response (attempt ${attempts}/${MAX_RETRIES + 1}):`, error);
      
      // If we've exhausted all retries, check if there's a fallback response or return an error message
      if (attempts > MAX_RETRIES) {
        // Try to get a fallback response if this is the last attempt
        const userMessage = messageHistory.filter(msg => msg.role === 'user').pop()?.message || '';
        const fallbackResponse = getFallbackResponse(userMessage);
        
        if (fallbackResponse) {
          return fallbackResponse;
        }
        
        // Check specific error types for better error messages
        if (error.statusCode === 429) {
          return "I'm receiving too many requests right now. Please try again in a few minutes.";
        } else if (error.statusCode === 401 || error.statusCode === 403) {
          return "I'm having trouble accessing my knowledge base. Please contact the administrator.";
        } else {
          return "I'm experiencing some technical difficulties right now. Please try again later.";
        }
      }
      
      // Wait a bit before retrying (exponential backoff)
      const delay = Math.pow(2, attempts) * 500; // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should not happen, but TypeScript wants us to return something
  return "I'm experiencing some technical difficulties right now. Please try again later.";
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
  
  // Course information
  if (lowercaseMessage.includes("course") || lowercaseMessage.includes("program") || lowercaseMessage.includes("major")) {
    return "Our college offers various undergraduate and graduate programs across faculties including Business, Engineering, Arts, Sciences, and Health Sciences. Each program has specific requirements and course structures. Would you like information about a specific field of study?";
  }
  
  // Deadlines
  if (lowercaseMessage.includes("deadline") || lowercaseMessage.includes("last date") || lowercaseMessage.includes("when to apply")) {
    return "For the Fall semester, our application deadline is typically May 1st. For the Spring semester, it's October 15th. Early applications are encouraged as some programs have limited seats. What program are you interested in applying to?";
  }
  
  // Campus life
  if (lowercaseMessage.includes("campus life") || lowercaseMessage.includes("student life") || lowercaseMessage.includes("clubs") || lowercaseMessage.includes("activities")) {
    return "Our campus offers a vibrant student life with over 50 student clubs, sports facilities, cultural events, and leadership opportunities. We have an active student union that organizes various events throughout the year. Would you like to know about any specific activities or facilities?";
  }
  
  // Contact information
  if (lowercaseMessage.includes("contact") || lowercaseMessage.includes("phone") || lowercaseMessage.includes("email") || lowercaseMessage.includes("address")) {
    return "You can contact our admissions office at admissions@campusai.edu or call us at (123) 456-7890. Our campus is located at 123 University Avenue, Academic City, ST 12345. The office hours are Monday to Friday, 8:00 AM to 6:00 PM.";
  }
  
  // Greetings
  if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi ") || lowercaseMessage === "hi" || lowercaseMessage.includes("hey") || lowercaseMessage.includes("greetings")) {
    return "Hello! I'm CampusAI, your college assistant. I can help you with information about admissions, courses, campus life, and more. How can I assist you today?";
  }
  
  // Gratitude
  if (lowercaseMessage.includes("thank") || lowercaseMessage.includes("thanks") || lowercaseMessage.includes("appreciate")) {
    return "You're welcome! I'm here to help. Is there anything else you'd like to know about our college?";
  }
  
  // Default case: no match
  return null;
}
