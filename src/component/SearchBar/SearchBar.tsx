import { useState } from "react";

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
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>{text}</button>
    </form>
  );
}
