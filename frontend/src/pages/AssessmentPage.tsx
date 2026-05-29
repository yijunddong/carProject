import { useState } from "react";
import { IntakeTable } from "../components/IntakeTable";
import { PageLayout } from "../components/PageLayout";
import { useIntakes } from "../context/IntakeContext";
import type { Intake } from "../types/intake";
import { sortByRegisteredAt } from "../utils/format";
import { speakAssessmentCall } from "../utils/tts";

export function AssessmentPage() {
  const { intakes, loading, complete } = useIntakes();
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const sorted = sortByRegisteredAt(intakes);
  const waitingCount = sorted.filter((i) => i.status === "waiting").length;

  async function handleComplete(intake: Intake) {
    if (intake.status !== "waiting") return;
    setCompletingId(intake.id);
    setMessage(null);
    try {
      await complete(intake.id);
      const mode = await speakAssessmentCall(intake.plate_number, intake.vehicle_model);
      const modeLabel = mode === "neural" ? "고품질 음성" : "브라우저 음성";
      setMessage(
        `${intake.plate_number} ${intake.vehicle_model} — 호출 안내 재생 (${modeLabel})`,
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "처리에 실패했습니다.");
    } finally {
      setCompletingId(null);
    }
  }

  return (
    <PageLayout title="판정실" subtitle="접수 순 차량 판정 · 완료 시 고객 호출">
      <section className="card">
        <p style={{ margin: "0 0 1rem", color: "var(--muted)" }}>
          판정 대기 <strong>{waitingCount}</strong>건 · 접수 순서대로 차량 판정 후 «판정 완료 · 호출»을
          누르면 TTS로 대기실 손님을 안내합니다.
        </p>
        {message && (
          <p className="form-message form-message--success" style={{ marginBottom: "1rem" }}>
            {message}
          </p>
        )}
        {loading ? (
          <p className="intake-empty">불러오는 중…</p>
        ) : (
          <IntakeTable
            intakes={sorted}
            showActions
            completingId={completingId}
            onComplete={handleComplete}
            emptyMessage="판정 대기 차량이 없습니다."
          />
        )}
      </section>
    </PageLayout>
  );
}
