import { useState } from "react";
import { IoIosMove, IoMdClose } from "react-icons/io";

export default function Draggable({ defaultX, defaultZ, children, isDebug }: Readonly <{
  defaultX: number;
  defaultZ: number;
  children?: React.ReactNode;
  isDebug?: boolean;
}>) {
  const [x, setX] = useState(defaultX);
  const [z, setZ] = useState(defaultZ);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      const action = event.target.getAttribute("data-action");
      if (action !== "move") return;
    }

    const { clientX, clientY } = event;
    const offsetX = clientX - x;
    const offsetY = clientY - z;

    const handleMouseMove = (event: MouseEvent) => {
      setX(event.clientX - offsetX);
      setZ(event.clientY - offsetY);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement) {
      const action = event.target.getAttribute("data-action");
      if (!action) {
        setIsSettingsOpen((prev) => !prev);
        return;
      }
    }
  }
    
  return (
    <div
      className={`Draggable ${isDebug ? "--debug" : ""}`}
      style={{ left: x, top: z }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {isSettingsOpen && (
        <ul className="Draggable__actions">
          <li className="Draggable__actions__action --close"><IoMdClose /></li>
          <li className="Draggable__actions__action --move" data-action="move"><IoIosMove /></li>
        </ul>
      )}
      <div className={`Draggable__content ${isSettingsOpen ? "--settings" : ""}`}>
        {children}
      </div>
    </div>
  );
}