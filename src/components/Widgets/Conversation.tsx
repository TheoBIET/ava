import Draggable from "../Shared/Draggable";
import { useChatStore } from "../../zustand/chat";

export default function Conversation() {
  const messages = useChatStore((state) => state.messages);

  return (
    <Draggable defaultX={1100} defaultZ={100}>
      <div className="Conversation">
        {messages.map((message, index) => (
          <div key={index} className={`Conversation__message --${message.role}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </Draggable>
  )
}