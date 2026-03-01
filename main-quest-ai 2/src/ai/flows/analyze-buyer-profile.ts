import { GoogleGenAI, Type } from "@google/genai";
import { BuyerProfile } from "../../types";

export async function analyzeBuyerProfile(
  answers: Record<string, string[]>,
  linkedinData?: string,
  socialProfiles?: { linkedin?: string; instagram?: string; facebook?: string }
): Promise<BuyerProfile> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("Missing Gemini API Key");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following user answers to a business acquisition assessment.
    The user is a prospective business buyer.
    
    ETA/acquisition entrepreneurship context:
    - EBITDA multiples context (2.5–5x for SMBs)
    - SBA 7(a) loan mechanics (typically 10-20% down payment unlocks 5-10x purchasing power)
    - Kent Weaver acquisition scorecard methodology
    - Ikigai + Grable-Lytton risk framework descriptions
    
    User Answers:
    ${JSON.stringify(answers, null, 2)}
    
    ${linkedinData ? `LinkedIn Data: ${linkedinData}` : ""}
    
    Provide a detailed buyer profile based on the schema.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          archetype: { type: Type.STRING, description: "One of: The Operator, The Investor, The Builder, The Legacy Buyer" },
          archetypeScore: { type: Type.NUMBER },
          stats: {
            type: Type.OBJECT,
            properties: {
              riskTolerance: { type: Type.NUMBER },
              capitalAvailable: { type: Type.NUMBER },
              industryPreference: { type: Type.NUMBER },
              operationalSkills: { type: Type.NUMBER },
              timeline: { type: Type.NUMBER }
            }
          },
          purchasingPower: {
            type: Type.OBJECT,
            properties: {
              minCapital: { type: Type.NUMBER },
              maxCapital: { type: Type.NUMBER },
              sbaMultiplier: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          },
          businessMatches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                rank: { type: Type.NUMBER },
                businessType: { type: Type.STRING },
                ebitdaRange: { type: Type.STRING },
                matchPercent: { type: Type.NUMBER },
                managementIntensity: { type: Type.STRING, description: "High, Medium, or Low" },
                explanation: { type: Type.STRING },
                whyItFits: { type: Type.STRING }
              }
            }
          },
          operatorSummary: { type: Type.STRING, description: "2-paragraph summary in first person" },
          buyerProfile: {
            type: Type.OBJECT,
            properties: {
              geography: { type: Type.STRING },
              involvementStyle: { type: Type.STRING },
              capitalBand: { type: Type.STRING }
            }
          },
          dealScorecardPreview: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                criterion: { type: Type.STRING },
                description: { type: Type.STRING },
                score: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate buyer profile");
  }

  return JSON.parse(response.text) as BuyerProfile;
}
