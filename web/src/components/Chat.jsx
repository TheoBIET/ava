import { IoSend } from "react-icons/io5";

const fake = [
  {
    id: 1,
    text: "Hello, I'm Ava. How can I help you?",
    author: "Ava",
    date: new Date(),
    avatar: "https://avatars.githubusercontent.com/u/73460864?v=4",
  },
  {
    id: 2,
    text: "Hi Ava!",
    author: "You",
    date: new Date(),
    avatar: "https://avatars.githubusercontent.com/u/73460864?v=4",
  },
];

export default function Chat() {
  const placeholder = "Ask me anything or just say \"Hi Ava!\"";

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="Chat">
      <div className="Chat__messages">
        {fake.map((message) => {
          return (
            <div className="Chat__messages__message" key={message.id}>
              <div className="Chat__messages__message__content">
                <span className="Chat__messages__message__content__author">{message.author} : </span>
                <span className="Chat__messages__message__content__text">{message.text}</span>
              </div>
            </div>
          )})
        }
      </div>
      <form className="InputText" onSubmit={handleSubmit}>
        <input type="text" placeholder={placeholder}></input>
        <button><IoSend /></button>
      </form>
    </div>
  )
}