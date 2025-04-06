import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json(); // Expecting proper messages format!

  const result = await generateText({
    model: google('gemini-1.5-pro-latest'),
    messages, // Must be of type: [{ role: 'user' | 'assistant', content: string }]
  });

  return new Response(JSON.stringify({ response: result.text }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
