import { apiRequest } from "./queryClient";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function sendMessageToBackend(sessionToken: string, message: string) {
  try {
    const response = await apiRequest(
      "POST", 
      `/api/chat/${sessionToken}/message`, 
      { message }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message to backend:", error);
    throw error;
  }
}
