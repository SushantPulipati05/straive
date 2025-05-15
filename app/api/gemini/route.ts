import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function POST(req: NextRequest) {
    try {
      const { prompt } = await req.json();
  
      const response = await ai.models.generateContent({ 
        model: 'gemini-1.5-flash',
        contents: prompt
     }); 

      const text = response.text;
  
      return NextResponse.json({ text });
    } catch (error) {
      console.error('Gemini error:', error);
      return new NextResponse('Failed to generate content', { status: 500 });
    }
  }