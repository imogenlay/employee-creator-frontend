import type { ChatResponse } from "../../services/chat-services";
import ChatMessage from "../ChatMessage/ChatMessage";

interface ChatListProps {
  chats: ChatResponse[];
}

export default function ChatList({ chats }: ChatListProps) {
  const hackKeyGenerator = (chat: ChatResponse) => {
    return chat.content.substring(0, 20).replace(" ", "_");
  };

  return (
    <>
      {chats.map((chat: ChatResponse) => {
        return <ChatMessage key={hackKeyGenerator(chat)} message={chat} />;
      })}
    </>
  );
}
