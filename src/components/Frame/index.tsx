import Version from "./Version";
import IpcService from "../../services/ipcService";
import { IoCloseOutline, IoRemove } from "react-icons/io5";
import { IoIosSquareOutline } from "react-icons/io";

export default function Frame() {
  const handleMinimize = () => IpcService.send('minimize');
  const handleMaximize = () => IpcService.send('maximize');
  const handleClose = () => IpcService.send('close');

  return (
    <header className="Frame">
      <div className="Frame__container">
        <h1 className="Frame__container__title">ava - your local personal assistant</h1>
        <Version />
      </div>
      <div className="Frame__actions">
        <button className="Frame__actions__action" onClick={handleMinimize}><IoRemove /></button>
        <button className="Frame__actions__action" onClick={handleMaximize}><IoIosSquareOutline /></button>
        <button className="Frame__actions__action" onClick={handleClose}><IoCloseOutline /></button>
      </div>
    </header>
  )
}