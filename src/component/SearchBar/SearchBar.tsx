import { useState } from "react";
import classes from "./SearchBar.module.scss";

interface SearchBarProps {
  text: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  text = "Search",
  onSearch,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>{text}</button>
    </form>
  );
}
