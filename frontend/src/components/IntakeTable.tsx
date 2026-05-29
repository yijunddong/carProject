import type { Intake } from "../types/intake";
import { formatTime } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

interface IntakeTableProps {
  intakes: Intake[];
  emptyMessage?: string;
  showActions?: boolean;
  onComplete?: (intake: Intake) => void;
  completingId?: string | null;
  large?: boolean;
}

export function IntakeTable({
  intakes,
  emptyMessage = "접수 내역이 없습니다.",
  showActions = false,
  onComplete,
  completingId = null,
  large = false,
}: IntakeTableProps) {
  if (intakes.length === 0) {
    return <p className="intake-empty">{emptyMessage}</p>;
  }

  return (
    <div className={`intake-table-wrap ${large ? "intake-table-wrap--large" : ""}`}>
      <table className="intake-table">
        <thead>
          <tr>
            <th>순번</th>
            <th>차량번호</th>
            <th>차종</th>
            <th>접수</th>
            <th>상태</th>
            {showActions && <th>처리</th>}
          </tr>
        </thead>
        <tbody>
          {intakes.map((item, index) => (
            <tr
              key={item.id}
              className={item.status === "done" ? "intake-table__row--done" : undefined}
            >
              <td>{index + 1}</td>
              <td className="intake-table__plate">{item.plate_number}</td>
              <td>{item.vehicle_model}</td>
              <td>{formatTime(item.registered_at)}</td>
              <td>
                <StatusBadge status={item.status} />
              </td>
              {showActions && (
                <td>
                  {item.status === "waiting" ? (
                    <button
                      type="button"
                      className="btn btn--primary"
                      disabled={completingId === item.id}
                      onClick={() => onComplete?.(item)}
                    >
                      {completingId === item.id ? "처리 중…" : "판정 완료 · 호출"}
                    </button>
                  ) : (
                    <span className="intake-table__done-label">호출 완료</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
