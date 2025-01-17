export interface TextDocument {
  id: string;
  content: string;
  title?: string;
}

export interface ServerResponse {
  answer: string;
  docs: TextDocument[];
}

export interface ChatMessage {
  message: string;
  id: number;
}

export class HumanChatMessage implements ChatMessage {
  type = "human" as const;
  icon = "👤";

  constructor(public id: number, public message: string) {}
}

export class BotChatMessage implements ChatMessage {
  type = "bot" as const;
  icon = "🤖";

  constructor(public id: number, public message: string) {}
}

export async function askQuestion(question: string, prompt: string) {
  // post to server
  const response = await fetch("http://127.0.0.1:5000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question,
      prompt: prompt,
    }),
  });

  const data = await response.json();
  const serverResponse: ServerResponse = data;
  return serverResponse;
}
