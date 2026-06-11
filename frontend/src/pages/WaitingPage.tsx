import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WaitingAnnounceModal } from "../components/waiting/WaitingAnnounceModal";
import { WaitingSlideshow } from "../components/waiting/WaitingSlideshow";
import { WaitingStatusTable } from "../components/waiting/WaitingStatusTable";
import { useIntakes } from "../context/IntakeContext";
import { useCurrentTime } from "../hooks/useCurrentTime";
import type { Intake } from "../types/intake";
import { waitingDisplayConfig } from "../config/waitingDisplay";
import { sortByRegisteredAt } from "../utils/format";
import "./waiting-display.css";

const FOOTER_TEXT =
  "일급 신분당 검사정비사업소 입니다. 자동차검사, 자동차정비, 자동차판금, 자동차도색을 전문으로 하며 " +
  "친절,신속,정확 3대 서비스로 고객을 섬기겠습니다. " +
  "자동차검사 접수마감 평일 5시30분 / 토요일 12시~12시30분";

export function WaitingPage() {
  const { intakes, loading } = useIntakes();
  const clock = useCurrentTime();
  const [announce, setAnnounce] = useState<Intake | null>(null);

  const done = sortByRegisteredAt(intakes).filter((i) => i.status === "done");

  const bootstrapped = useRef(false);
  const knownDoneIds = useRef(new Set<string>());
  const announceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loading) return;

    const doneItems = intakes.filter((i) => i.status === "done");

    if (!bootstrapped.current) {
      doneItems.forEach((i) => knownDoneIds.current.add(i.id));
      bootstrapped.current = true;
      return;
    }

    for (const item of doneItems) {
      if (knownDoneIds.current.has(item.id)) continue;
      knownDoneIds.current.add(item.id);

      setAnnounce(item);
      if (announceTimer.current) clearTimeout(announceTimer.current);
      announceTimer.current = setTimeout(() => setAnnounce(null), 10_000);
    }
  }, [intakes, loading]);

  useEffect(() => {
    return () => {
      if (announceTimer.current) clearTimeout(announceTimer.current);
    };
  }, []);

  const layoutStyle = {
    ["--waiting-left-w" as string]: `${waitingDisplayConfig.leftPanelPercent}%`,
  } as CSSProperties;

  return (
    <div className="waiting-screen" style={layoutStyle}>
      <header className="waiting-screen__header">
        <img
          src="/images/waiting/logo.PNG"
          alt="1급신분당검사정비소"
          className="waiting-screen__logo"
        />
        <time className="waiting-screen__clock">{clock}</time>
      </header>

      <div className="waiting-body">
        <aside className="waiting-left">
          <WaitingStatusTable title="검사 완료" intakes={done} />
        </aside>
        <div className="waiting-right">
          <WaitingSlideshow />
        </div>
      </div>

      <footer className="waiting-screen__footer">
        <p className="waiting-screen__footer-text">{FOOTER_TEXT}</p>
      </footer>

      <WaitingAnnounceModal intake={announce} />
    </div>
  );
}
