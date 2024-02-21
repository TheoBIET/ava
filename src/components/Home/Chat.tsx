import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useChatStore } from "../../zustand/chat";

export default function Chat({ className }: Readonly<{
  className: string;
}>) {
  const getChatCompletion = useChatStore((state) => state.getChatCompletion);
  const [canSend, setCanSend] = useState(true);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input || !canSend) return;

    getChatCompletion(input);
    setInput("");
    setCanSend(false);
    return;
  }

  return (
    <div className={`Chat ${className}`}>
      {canSend && (
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