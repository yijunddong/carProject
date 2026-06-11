import { useEffect, useState } from "react";
import { waitingDisplayConfig } from "../../config/waitingDisplay";

const SLIDES = [
  "/images/waiting/main1.jpg",
  "/images/waiting/main2.jpg",
  "/images/waiting/main3.jpg",
  "/images/waiting/main4.jpg",
];

export function WaitingSlideshow() {
  const [index, setIndex] = useState(0);
  const { imageFit, imagePosition, slideIntervalMs } = waitingDisplayConfig;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, slideIntervalMs);
    return () => clearInterval(id);
  }, [slideIntervalMs]);

  return (
    <div className="waiting-slide">
      <img
        key={SLIDES[index]}
        src={SLIDES[index]}
        alt=""
        className="waiting-slide__img"
        style={{
          objectFit: imageFit,
          objectPosition: imagePosition,
        }}
      />
    </div>
  );
}
