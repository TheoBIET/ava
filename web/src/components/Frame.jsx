import { IoClose, IoRemove } from "react-icons/io5";
import pkg from "../../../package.json";

export default function Frame() {
  return (
    <div className="Frame">
      <div className="Frame__title">
        <span className="Frame__title__text">{pkg.name}</span>
        <span className="Frame__title__version">v{pkg.version}</span>
      </div>
      <div className="Frame__buttons">
        <IoRemove className="Frame__buttons__item" />
        <IoClose className="Frame__buttons__item" />
      </div>
    </div>
  )
}