import { post } from "./fetcher";

export type ChatResponse = {
  role: ChatRole;
  content: string;
};

export type ChatRole = "user" | "assistant";

export const postChat = (chats: ChatResponse[]): Promise<ChatResponse> => {
  return post<ChatResponse>("/claude", chats);
};
