import Button from "../Button/Button";
import LoadingTriangle from "../LoadingTriangle/LoadingTriangle";
import classes from "./ChatInput.module.scss";

interface ChatInputProps {
  loading: boolean;
  text: string;
  placeholder: string;
  setText: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  loading,
  text,
  placeholder,
  setText,
  onSend,
}: ChatInputProps) {
  const areaClass = `${classes.input_area} ${loading ? classes.loading : ""}`;
  return (
    <div className={areaClass}>
      {loading ? (
        <LoadingTriangle />
      ) : (
        <>
          <textarea
            className={classes.input}
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <Button
            className={classes.send}
            onClick={onSend}
            mode={text.length === 0 ? "DISABLED" : "DEFAULT"}
          >
            Send
          </Button>
        </>
      )}
    </div>
  );
}
