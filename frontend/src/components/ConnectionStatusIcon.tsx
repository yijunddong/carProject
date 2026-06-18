import { USE_MOCK } from "../api/config";
import { useIntakes } from "../context/IntakeContext";

export function ConnectionStatusIcon() {
  const { apiConnected, wsConnected } = useIntakes();
  const connected = USE_MOCK || (apiConnected && wsConnected);
  const label = connected ? "실시간 연결됨" : "실시간 연결 안됨";

  return (
    <div
      className={`connection-status-icon ${
        connected ? "connection-status-icon--ok" : "connection-status-icon--error"
      }`}
      role="status"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{connected ? "☺" : "☹"}</span>
    </div>
  );
}
