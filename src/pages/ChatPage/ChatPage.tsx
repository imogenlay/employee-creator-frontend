import { useEffect, useState } from "react";
import { postChat, type ChatResponse } from "../../services/chat-services";
import type { LoadStatus } from "../../services/const";
import classes from "./ChatPage.module.scss";
import ChatInput from "../../component/ChatInput/ChatInput";
import ChatList from "../../component/ChatList/ChatList";
import { CHAT_EXAMPLE } from "../../services/chat-example";
import { BAD_CHAT_EXAMPLE } from "../../services/bad-chat-example";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [status, setStatus] = useState<LoadStatus>("PENDING");

  useEffect(() => {
    // Force scroll to bottom of the page.
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [chats]);

  const onSend = () => {
    const trimmedText = text.trim();
    setText("");
    if (!trimmedText) return;

    const updatedChatUser: ChatResponse[] = [
      ...chats,
      { role: "user", content: trimmedText },
    ];

    setChats(updatedChatUser);
    setStatus("LOADING");

    // Send off to AI.
    postChat(updatedChatUser)
      .then((reply: ChatResponse) => {
        const updatedChatAssistant: ChatResponse[] = [
          ...updatedChatUser,
          reply,
        ];
        setChats(updatedChatAssistant);
        setStatus("SUCCESS");
      })
      .catch(() => setStatus("FAILURE"));
  };

  const loadChatExample = () => {
    setChats(CHAT_EXAMPLE);
    setStatus("SUCCESS");
  };
  const loadBadChatExample = () => {
    setChats(BAD_CHAT_EXAMPLE);
    setStatus("SUCCESS");
  };

  return (
    <div className={classes.parent}>
      <button className={classes.secret_button} onClick={loadChatExample}>
        a
      </button>
      <button
        className={classes.bad_secret_button}
        onClick={loadBadChatExample}
      >
        b
      </button>

      <div className={classes.heading}>
        <h2>Chat with AI ✨</h2>
        <hr />
      </div>
      <ChatList chats={chats} />
      {status === "FAILURE" && (
        <p className={classes.error}>An error occured when sending messages.</p>
      )}
      <ChatInput
        loading={status === "LOADING"}
        text={text}
        placeholder={
          chats.length > 0 ? "Reply..." : "What would you like some help with?"
        }
        setText={(value: string) => {
          setText(value);
        }}
        onSend={onSend}
      />
    </div>
  );
}
