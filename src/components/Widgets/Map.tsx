import Draggable from "../Shared/Draggable";

export default function Map({ defaultX, defaultZ }: Readonly<{
  defaultX: number;
  defaultZ: number;
}>) {
  return (
    <Draggable defaultX={defaultX} defaultZ={defaultZ}>
      <div className="Map">
        <p>Map</p>
      </div>
    </Draggable>
  )
}