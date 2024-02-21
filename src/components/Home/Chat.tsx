import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useConversationStore } from "../../store/conversation";

export default function Chat({ className }: Readonly<{
  className: string;
}>) {
  const addMessage = useConversationStore((state) => state.addMessage);
  const [canSend, setCanSend] = useState(true);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input || !canSend) return;

    addMessage({ author: "user", content: input });
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