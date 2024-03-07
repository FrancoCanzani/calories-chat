import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // 'data' contains the additional data that you have sent:
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  let base64Images: string[] = [];
  if (data && data.base64Images) {
    base64Images = JSON.parse(data.base64Images);
  }

  const images = base64Images.map((base64Image) => ({
    type: 'image_url',
    image_url: base64Image,
  }));

  const prompt = process.env.PROMPT;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    stream: true,
    max_tokens: 180,
    messages: [
      ...initialMessages,
      {
        ...currentMessage,
        content: [{ type: 'text', text: currentMessage.content }, ...images],
      },
      { role: 'system', content: `${prompt}` },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
