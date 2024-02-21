import { useConversationStore } from "../../store/conversation";

export default function Conversation({ className }: Readonly<{
  className: string;
}>) {
  const messages = useConversationStore((state) => state.messages);

  return (
    <div className={`Conversation ${className}`}>
      {messages.map((message, index) => (
        <div key={index} className={`Conversation__message --${message.author}`}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  )
}