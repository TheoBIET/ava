import { IoClose, IoRemove } from "react-icons/io5";
import pkg from "../../../package.json";
import EVENTS from '../../../constants/ipcEvents.json';

const { ipcRenderer } = window.require('electron');

export default function Frame() {

  const handleMinimize = () => {
    ipcRenderer.send(EVENTS.WINDOW.MINIMIZE);
  }

  const handleClose = () => {
    ipcRenderer.send(EVENTS.WINDOW.CLOSE);
  } 

  return (
    <div className="Frame">
      <div className="Frame__title">
        <span className="Frame__title__text">{pkg.name}</span>
        <span className="Frame__title__version">v{pkg.version}</span>
      </div>
      <div className="Frame__buttons">
        <IoRemove className="Frame__buttons__item" onClick={handleMinimize} />
        <IoClose className="Frame__buttons__item" onClick={handleClose} />
      </div>
    </div>
  )
}