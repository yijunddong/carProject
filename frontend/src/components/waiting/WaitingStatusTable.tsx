import type { Intake } from "../../types/intake";

interface WaitingStatusTableProps {
  title: string;
  intakes: Intake[];
  showNo?: boolean;
}

export function WaitingStatusTable({
  title,
  intakes,
  showNo = false,
}: WaitingStatusTableProps) {
  const colSpan = showNo ? 3 : 2;

  return (
    <div className="waiting-panel waiting-panel--done">
      <table className="waiting-table">
        <thead>
          <tr>
            <th colSpan={colSpan}>{title}</th>
          </tr>
          <tr>
            {showNo && <td className="waiting-table__sub waiting-table__sub--done">no.</td>}
            <td className="waiting-table__sub waiting-table__sub--done">차량번호</td>
            <td className="waiting-table__sub waiting-table__sub--done">차종</td>
          </tr>
        </thead>
        <tbody>
          {intakes.length === 0 ? (
            <tr>
              <td colSpan={colSpan} className="waiting-table__cell waiting-table__empty">
                —
              </td>
            </tr>
          ) : (
            intakes.map((item, idx) => (
              <tr key={item.id}>
                {showNo && <td className="waiting-table__cell">{idx + 1}</td>}
                <td className="waiting-table__cell waiting-table__cell--plate">{item.plate_number}</td>
                <td className="waiting-table__cell">{item.vehicle_model}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
