import { GoogleGenAI } from "@google/genai";

// Ensure process is defined to avoid TS errors and follow guidelines for API Key access
declare var process: {
  env: {
    API_KEY: string;
  };
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCopy = async (topic: string, type: 'service' | 'project' | 'about' | 'blog', extraContext?: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  let prompt = "";
  if (type === 'service') {
    prompt = `Write a luxurious, high-end description for a tiling service: "${topic}". Target audience: Wealthy homeowners in Lagos, Nigeria. Tone: Professional, Sophisticated, Reliable. Max 80 words.`;
  } else if (type === 'project') {
    prompt = `Write a captivating project description for a luxury tiling job done at "${topic}". Mention premium materials like Italian Marble or Spanish Porcelain. Max 60 words.`;
  } else if (type === 'blog') {
    const categoryPrompt = extraContext ? `Category: ${extraContext}.` : '';
    prompt = `Write a sophisticated, engaging blog post body for a luxury tiling website (HanifGold).
    Title/Topic: "${topic}"
    ${categoryPrompt}
    Target Audience: High-net-worth individuals in Lagos, Ibadan, and Ogun State.
    
    Structure:
    1. Introduction: Write an engaging opening that hooks the reader instantly.
    2. Body: Provide valuable insights, trends, or maintenance tips relevant to the topic.
    3. Conclusion: Write a strong, memorable conclusion.
    
    Tone: Expert, Elegant, Professional.
    Format: Use Markdown (e.g., ## for section headings).
    Length: Approx 250-350 words.`;
  } else {
    prompt = `Write a professional mission statement for a luxury tiling company called HanifGold based in Lagos. Focus on precision, art, and durability. Max 50 words.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your network or API key.";
  }
};