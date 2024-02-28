import { useChatStore } from '../../zustand/chat';

export default function Conversation({
  className,
}: Readonly<{
  className: string;
}>) {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className={`Conversation ${className}`}>
      {messages.map((message, index) => (
        <div key={index} className={`Conversation__message --${message.role}`}>
          <p>
            {message.content}
            <div
              className={
                message.role === 'user'
                  ? 'Conversation__message --user__right'
                  : '--ava__right'
              }
            />
          </p>
        </div>
      ))}
    </div>
  );
}
