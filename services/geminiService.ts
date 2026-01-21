
import { GoogleGenAI, Type } from "@google/genai";
import { GreetingStyle } from '../types';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateGreeting(style: GreetingStyle): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a creative "Hello World" message in the following style: ${style}. Keep it concise but impactful.`,
        config: {
          temperature: 0.8,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 100,
        },
      });

      return response.text?.trim() || "Hello, World!";
    } catch (error) {
      console.error("Error generating greeting:", error);
      return "Hello, World! (Error connecting to AI)";
    }
  }
}

export const geminiService = new GeminiService();
