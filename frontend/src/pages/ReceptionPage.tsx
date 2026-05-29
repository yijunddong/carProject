import { useState, type FormEvent } from "react";
import { IntakeTable } from "../components/IntakeTable";
import { PageLayout } from "../components/PageLayout";
import { useIntakes } from "../context/IntakeContext";
import { sortByRegisteredAt } from "../utils/format";

export function ReceptionPage() {
  const { intakes, loading, register, refresh } = useIntakes();
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const sorted = sortByRegisteredAt(intakes);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const plate_number = plate.trim();
    const vehicle_model = model.trim();
    if (!plate_number || !vehicle_model) {
      setMessage({ type: "err", text: "차량번호와 차종을 모두 입력해 주세요." });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      await register({ plate_number, vehicle_model });
      setPlate("");
      setModel("");
      setMessage({ type: "ok", text: "접수되었습니다. 대기실·판정실에 반영됩니다." });
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "접수에 실패했습니다.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageLayout title="접수실" subtitle="차량 접수 등록">
      <section className="card">
        <h2 className="card__title">신규 접수</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="plate">차량번호</label>
              <input
                id="plate"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="예: 12가3456"
                autoComplete="off"
              />
            </div>
            <div className="form-field">
              <label htmlFor="model">차종</label>
              <input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="예: GV80"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "접수 중…" : "접수하기"}
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => void refresh()}>
              목록 새로고침
            </button>
          </div>
          {message && (
            <p className={`form-message form-message--${message.type === "ok" ? "success" : "error"}`}>
              {message.text}
            </p>
          )}
        </form>
      </section>

      <section className="card">
        <h2 className="card__title">오늘 접수 목록 ({sorted.length}건)</h2>
        {loading ? (
          <p className="intake-empty">불러오는 중…</p>
        ) : (
          <IntakeTable intakes={sorted} emptyMessage="오늘 접수된 차량이 없습니다." />
        )}
      </section>
    </PageLayout>
  );
}
