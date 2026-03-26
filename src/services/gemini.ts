import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface FraudAnalysis {
  score: number; // 0 to 100 (100 is definitely fraud)
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  redFlags: string[];
  summary: string;
  detailedAnalysis: string;
  recommendations: string[];
}

export async function analyzeJobOffer(
  text: string,
  imageData?: string
): Promise<FraudAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an expert recruitment fraud investigator. 
    Analyze the provided job offer (text or image) for signs of fraud.
    
    Common red flags to look for:
    - Unrealistic salary or benefits.
    - Vague job descriptions or requirements.
    - Requests for payment (training, equipment, software).
    - Non-professional email addresses (Gmail, Yahoo, etc. instead of company domain).
    - Poor grammar or spelling.
    - Requests for sensitive personal information early in the process.
    - Pressure to act quickly.
    - Interviews conducted solely via text/chat apps (Telegram, WhatsApp).
    
    Return the analysis in a structured JSON format.
  `;

  const prompt = `
    Analyze this job offer:
    ${text}
    
    If an image is provided, extract and analyze its content too.
  `;

  const contents: any[] = [{ text: prompt }];
  if (imageData) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData.split(",")[1],
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts: contents },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Fraud probability score 0-100" },
          riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
          redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING },
          detailedAnalysis: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["score", "riskLevel", "redFlags", "summary", "detailedAnalysis", "recommendations"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
