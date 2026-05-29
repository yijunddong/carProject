import type { IntakeStatus } from "../types/intake";

const LABELS: Record<IntakeStatus, string> = {
  waiting: "대기",
  done: "완료",
};

export function StatusBadge({ status }: { status: IntakeStatus }) {
  return <span className={`status-badge status-badge--${status}`}>{LABELS[status]}</span>;
}
