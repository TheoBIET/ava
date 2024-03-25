import { Widget } from "../../constants/widgets";
import { useWidgetsStore } from "../../zustand/widgets";

export default function ContextMenu({ x, y, show }: Readonly<{
  x: number;
  y: number;
  show: boolean;
}>) {
  const widgets = useWidgetsStore((state) => state.list);
  const toggleWidget = useWidgetsStore((state) => state.toggleWidget);
  
  const handleClickWidget = (event: React.MouseEvent, widget: Widget) => {
    event.stopPropagation();
    toggleWidget(widget);
    widget.active = !widget.active;
  }

  return (
    <ul className={`ContextMenu ${show ? "--visible" : ""}`} style={{ top: y, left: x }} onClick={(event) => event.stopPropagation()}>
      <li className="ContextMenu__item --submenu">
        <div className="ContextMenu__item__content">
          <span className="ContextMenu__item__content__icon">🧩</span>
          <span className="ContextMenu__item__content__text">Widgets</span>
        </div>
        <ul className="ContextMenu">
          {widgets.map((widget, index) => (
            <li key={index} className="ContextMenu__item" onClick={(event) => handleClickWidget(event, widget)}>
              <div className="ContextMenu__item__content">
                <span className="ContextMenu__item__content__icon">{widget.active ? "❌" : "➕"}</span>
                <span className="ContextMenu__item__content__text">{widget.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </li>
      <a href="/settings" className="ContextMenu__item">
        <div className="ContextMenu__item__content">
          <span className="ContextMenu__item__content__icon">⚙️</span>
          <span className="ContextMenu__item__content__text">Settings</span>
        </div>
      </a>
    </ul>
  )
}