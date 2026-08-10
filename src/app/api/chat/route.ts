// src/app/api/chat/route.ts
import { streamText } from 'ai';
import { AI_MODEL, SYSTEM_PROMPT } from './ai-config';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Incoming messages:", JSON.stringify(body.messages));

    const result = streamText({
      model: AI_MODEL,
      system: SYSTEM_PROMPT,
      messages: body.messages, // Sending raw, native messages directly
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('❌ CRITICAL ERROR IN CHAT ROUTE:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}