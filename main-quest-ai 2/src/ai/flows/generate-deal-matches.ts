import { GoogleGenAI, Type } from "@google/genai";
import { BuyerProfile, DealMatch } from "../../types";

export async function generateDealMatches(
  buyerProfile: BuyerProfile
): Promise<DealMatch[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("Missing Gemini API Key");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Generate 6 realistic (but fictional) deal listings that match the user's profile.
    Each deal must be plausible for a real SMB acquisition.
    
    Buyer Profile:
    ${JSON.stringify(buyerProfile, null, 2)}
    
    Output 6 deals.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            location: { type: Type.STRING },
            industry: { type: Type.STRING },
            askingPrice: { type: Type.NUMBER },
            annualRevenue: { type: Type.NUMBER },
            annualEbitda: { type: Type.NUMBER },
            ebitdaMultiple: { type: Type.NUMBER },
            yearsInBusiness: { type: Type.NUMBER },
            matchPercent: { type: Type.NUMBER },
            dealHealthScore: { type: Type.NUMBER },
            keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            watchOutFor: { type: Type.ARRAY, items: { type: Type.STRING } },
            whyMatchedToYou: { type: Type.STRING },
            sbaEligible: { type: Type.BOOLEAN },
            ownerInvolvement: { type: Type.STRING, description: "High, Medium, or Low" },
            reasonForSale: { type: Type.STRING }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate deal matches");
  }

  return JSON.parse(response.text) as DealMatch[];
}
