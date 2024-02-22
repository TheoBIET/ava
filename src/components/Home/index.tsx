import Avatar from "./Avatar";
import Chat from "./Chat";
import Conversation from "./Conversation";
import Links from "./Links";
import Version from "../Frame/Version";

export default function Home() {
  return (
    <div className="Home">
      <Avatar />
      <Version className="Home__version" />
      <Chat className="Home__chat" />
      <Conversation className="Home__conversation" />
      <Links className="Home__links" />
    </div>
  )
}