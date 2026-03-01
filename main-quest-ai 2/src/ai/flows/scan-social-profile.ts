import { GoogleGenAI, Type } from "@google/genai";

export async function scanSocialProfile(
  linkedinUrl?: string,
  linkedinText?: string,
  facebookUrl?: string,
  instagramUrl?: string
): Promise<{
  suggestedAnswers: Array<{ questionId: string; suggestedOption: string; confidence: "high" | "medium" | "low" }>;
  extractedProfile: { yearsExp: number; industry: string; seniorityLevel: string; functionalAreas: string[] };
}> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("Missing Gemini API Key");
  }
  const ai = new GoogleGenAI({ apiKey });

  if (linkedinUrl && !linkedinText) {
    // Cannot scrape directly, ask user to paste text
    throw new Error("Please paste your LinkedIn 'About' section text directly.");
  }

  const prompt = `
    Extract professional information from the following LinkedIn profile text and map it to likely answers for a business buyer assessment.
    
    LinkedIn Text:
    ${linkedinText}
    
    Extract:
    - Years of experience
    - Industry
    - Seniority level
    - Functional areas
    
    Map to likely answers for questions Q1 to Q9.
    Return an array of suggested answers with confidence levels.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedAnswers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionId: { type: Type.STRING },
                suggestedOption: { type: Type.STRING },
                confidence: { type: Type.STRING, description: "high, medium, or low" }
              }
            }
          },
          extractedProfile: {
            type: Type.OBJECT,
            properties: {
              yearsExp: { type: Type.NUMBER },
              industry: { type: Type.STRING },
              seniorityLevel: { type: Type.STRING },
              functionalAreas: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to scan social profile");
  }

  return JSON.parse(response.text);
}
