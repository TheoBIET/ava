import Draggable from "../Shared/Draggable";

export default function MusicPlayer() {
  return (
    <Draggable defaultX={100} defaultZ={100}>
      <h1>Music Player</h1>
    </Draggable>
  );
}