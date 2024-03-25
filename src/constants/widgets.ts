import Clock from "../components/Widgets/Clock";
import Conversation from "../components/Widgets/Conversation";
import Map from "../components/Widgets/Map";
import MusicPlayer from "../components/Widgets/MusicPlayer";

export type Widget = {
  title: string;
  description: string;
  component: React.FC<{ defaultX: number; defaultZ: number }>;
  defaultPosition: { x: number; y: number };
  active: boolean;
};

export const widgets: Widget[] = [
  {
    title: "Clock",
    description: "A simple clock widget",
    component: Clock,
    defaultPosition: { x: 50, y: 375 },
    active: true,
  },
  {
    title: "Conversation",
    description: "Your conversation with AVA",
    component: Conversation,
    defaultPosition: { x: 1100, y: 100 },
    active: true,
  },
  {
    title: "Map",
    description: "A map widget",
    component: Map,
    defaultPosition: { x: 100, y: 100 },
    active: false,
  },
  {
    title: "Music Player",
    description: "A music player widget",
    component: MusicPlayer,
    defaultPosition: { x: 100, y: 100 },
    active: false,
  }
];