import Avatar from "./Avatar";
import ChatInput from "../Widgets/ChatInput";

import { useWidgetsStore } from "../../zustand/widgets";
import ContextMenu from "./ContextMenu";
import { useState } from "react";

export default function Home() {
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const activeWidgets = useWidgetsStore((state) => state.active);

  const handleRightClick = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setContextMenuPosition({ x: clientX, y: clientY });
    setContextMenuVisible(true);
  }

  const handleClick = (event: React.MouseEvent) => {
    if (isContextMenuVisible) {
      event.stopPropagation();
      setContextMenuVisible(false);
    }
  }
  
  return (
    <div className="Home" onContextMenu={handleRightClick} onClick={handleClick}>
      <Avatar />
      <ChatInput />
      <ContextMenu x={contextMenuPosition.x} y={contextMenuPosition.y} show={isContextMenuVisible} />

      <div className="Home__widgets">
        {activeWidgets.map((Widget, index: number) => <Widget.component key={index} defaultX={Widget.defaultPosition.x} defaultZ={Widget.defaultPosition.y} />)}
      </div>

      <p className="Home__author">
        Made with ❤️ by @DavDav_js
      </p>
    </div>
  )
}