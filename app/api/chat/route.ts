import { UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  const result = streamText({
    prompt: await convertToModelMessages(messages),
    system: `Eres un asistente de meeti AI que ayuda a encontrar comunidades y meetis`,
    model: openrouter("nex-agi/nex-n2-pro:free"),
  });

  return result.toUIMessageStreamResponse();
}
