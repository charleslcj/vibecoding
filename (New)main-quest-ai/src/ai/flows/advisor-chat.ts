import { GoogleGenAI, Type } from "@google/genai";
import { BuyerProfile, DealMatch } from "../../types";

export async function advisorChat(
  message: string,
  conversationHistory: Array<{ role: string; content: string }>,
  buyerProfile: BuyerProfile | null,
  matchedDeals: DealMatch[] | null
): Promise<{ response: string; suggestedFollowUps: string[] }> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY || "";
  
  if (!apiKey) {
    console.warn("Gemini API Key missing for advisor chat.");
    throw new Error("NO_API_KEY");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an AI Advisor specialized in ETA (Entrepreneurship Through Acquisition) and business buying.
    
    User's Buyer Profile:
    ${buyerProfile ? JSON.stringify(buyerProfile, null, 2) : "Not available"}
    
    User's Matched Deals:
    ${matchedDeals ? JSON.stringify(matchedDeals, null, 2) : "Not available"}
    
    Conversation History:
    ${JSON.stringify(conversationHistory, null, 2)}
    
    User's latest message:
    ${message}
    
    Provide a helpful, concise response grounded in the user's profile and ETA best practices.
    Also suggest 3 quick-reply follow-up questions.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          response: { type: Type.STRING },
          suggestedFollowUps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate chat response");
  }

  return JSON.parse(response.text);
}
