import { useEffect, useState } from "react";

const SLIDES = [
  "/images/waiting/main1.jpg",
  "/images/waiting/main2.jpg",
  "/images/waiting/main3.jpg",
  "/images/waiting/main4.jpg",
];

const INTERVAL_MS = 15_000;

export function WaitingSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="waiting-slide">
      <img
        key={SLIDES[index]}
        src={SLIDES[index]}
        alt=""
        className="waiting-slide__img"
      />
    </div>
  );
}
