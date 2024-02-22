import Avatar from "./Avatar";
import Chat from "./Chat";
import Conversation from "./Conversation";
import Links from "./Links";

export default function Home() {
  return (
    <div className="Home">
      <Avatar />
      <Chat className="Home__chat" />
      <Conversation className="Home__conversation" />
      <Links className="Home__links" />
    </div>
  )
}