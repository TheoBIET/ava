import { useEffect, useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import Draggable from "../Shared/Draggable";

dayjs.extend(timezone);

type Clock = {
  timezone: string;
  hour: string;
  minute: string;
  second: string;
};

export default function Clock({ defaultX, defaultZ }: Readonly<{ 
  defaultX: number;
  defaultZ: number;
}>) {
  const [clock, setClock] = useState<Clock>({
    timezone: dayjs.tz.guess(),
    hour: dayjs().format("HH"),
    minute: dayjs().format("mm"),
    second: dayjs().format("ss"),
  });

  useEffect(() => {
    const msUntilNextSecond = 1000 - new Date().getMilliseconds();
    setTimeout(() => {}, msUntilNextSecond);

    const interval = setInterval(() => {
      setClock((prev) => ({
        ...prev,
        hour: dayjs().format("HH"),
        minute: dayjs().format("mm"),
        second: dayjs().format("ss"),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Draggable defaultX={defaultX} defaultZ={defaultZ}>
      <div  className="Clock">
        <p className="Clock__hour">{clock.hour}</p>
        <p className="Clock__minute">{clock.minute}</p>
      </div>
    </Draggable>
  );
}