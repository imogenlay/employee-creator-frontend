import type { ChatResponse } from "../../services/chat-services";
import BadMarkdown from "../BadMarkdown/BadMarkdown";
import classes from "./ChatMessage.module.scss";

interface ChatMessageProps {
  message: ChatResponse;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const parentClass = `${classes.chat} ${message.role === "user" ? classes.user : classes.assistant}`;

  return (
    <div className={parentClass}>
      <p className={classes.chat_role}>{message.role}:</p>
      <BadMarkdown className={classes.chat_message} value={message.content} />
    </div>
  );
}
