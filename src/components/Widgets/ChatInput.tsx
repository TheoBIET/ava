import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useChatStore } from "../../zustand/chat";

export default function ChatInput() {
  const getChatCompletion = useChatStore((state) => state.getChatCompletion);
  const isLoading = useChatStore((state) => state.isLoading);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input || isLoading) return;

    getChatCompletion(input);
    setInput("");
    return;
  }

  return (
    <div className="Chat">
      {!isLoading && (
        <form className="InputChat" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <IoSend />
          </button>
        </form>
      )}
    </div>
  )
}