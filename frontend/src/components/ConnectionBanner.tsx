import { USE_MOCK } from "../api/config";
import { useApiStatusLabel, useIntakes } from "../context/IntakeContext";

export function ConnectionBanner() {
  const { apiConnected, wsConnected, error } = useIntakes();
  const label = useApiStatusLabel();

  const tone = USE_MOCK
    ? "mock"
    : !apiConnected
      ? "error"
      : !wsConnected
        ? "warn"
        : "ok";

  return (
    <div className={`connection-banner connection-banner--${tone}`} role="status">
      <span>{label}</span>
      {error && !USE_MOCK && <span className="connection-banner__error">{error}</span>}
    </div>
  );
}
