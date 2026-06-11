import { useEffect, useState } from "react";

export function useCurrentTime(): string {
  const [time, setTime] = useState(() => formatNow());

  useEffect(() => {
    const tick = () => setTime(formatNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function formatNow(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${y}년 ${m}월 ${d}일 ${h}:${min}`;
}
