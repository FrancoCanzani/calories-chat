import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
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

  const base64Images: string[] = JSON.parse(data.base64Images);

  const images = base64Images.map((base64Image) => ({
    type: 'image_url',
    image_url: base64Image,
  }));

  const prompt = `Analyze the image and provide the calories and macronutrients present for the food shown. Please provide short, specific answers with a middle-ground approximation. Don't give any disclaimers about the capabilities. Avoid stating ranges such as "between 400 and 700 calories." Instead, provide specific and exact estimates, behave like an expert. If necessary, you can ask the user for clarification or additional information.`;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    stream: true,
    max_tokens: 150,
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
