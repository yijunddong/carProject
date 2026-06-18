import { useState, type FormEvent } from "react";
import { IntakeTable } from "../components/IntakeTable";
import { PageLayout } from "../components/PageLayout";
import { useIntakes } from "../context/IntakeContext";
import type { IntakeStatus } from "../types/intake";
import { sortByRegisteredAt } from "../utils/format";

type ReceptionFilter = "all" | IntakeStatus;

export function ReceptionPage() {
  const { intakes, loading, register, refresh } = useIntakes();
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [filter, setFilter] = useState<ReceptionFilter>("all");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const sorted = sortByRegisteredAt(intakes);
  const waitingIntakes = sorted.filter((item) => item.status === "waiting");
  const doneIntakes = sorted.filter((item) => item.status === "done");
  const waitingCount = waitingIntakes.length;
  const doneCount = doneIntakes.length;
  const filteredIntakes =
    filter === "waiting" ? waitingIntakes : filter === "done" ? doneIntakes : sorted;
  const filterLabels: Record<ReceptionFilter, string> = {
    all: "전체",
    waiting: "대기",
    done: "완료",
  };

  function handlePlateChange(value: string) {
    setPlate(value.replace(/\D/g, "").slice(0, 4));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const plate_number = plate.trim();
    const vehicle_model = model.trim();
    if (plate_number.length !== 4) {
      setMessage({ type: "err", text: "차량번호 숫자 4자리를 입력해 주세요." });
      return;
    }
    if (!vehicle_model) {
      setMessage({ type: "err", text: "차종을 입력해 주세요." });
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
    <PageLayout title="접수실" subtitle="차량 접수 등록" variant="reception">
      <div className="reception-shell">
        <section className="reception-hero">
          <div>
            <p className="reception-hero__eyebrow">Reception Desk</p>
            <h2>방문 차량 접수</h2>
            <p>차량번호 4자리와 차종만 입력하면 대기실과 판정실에 바로 반영됩니다.</p>
          </div>
          <div className="reception-summary" aria-label="오늘 접수 현황">
            <div className="reception-summary__item">
              <span>오늘 접수</span>
              <strong>{sorted.length}</strong>
            </div>
            <div className="reception-summary__item">
              <span>대기</span>
              <strong>{waitingCount}</strong>
            </div>
            <div className="reception-summary__item">
              <span>완료</span>
              <strong>{doneCount}</strong>
            </div>
          </div>
        </section>

        <div className="reception-grid">
          <section className="card reception-card reception-card--form">
            <div className="reception-card__header">
              <div>
                <p className="reception-card__kicker">신규 접수</p>
                <h2 className="card__title">차량 정보 입력</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="reception-form">
              <div className="form-field form-field--plate">
                <label htmlFor="plate">차량번호 4자리</label>
                <input
                  id="plate"
                  value={plate}
                  onChange={(e) => handlePlateChange(e.target.value)}
                  placeholder="1234"
                  autoComplete="off"
                  inputMode="numeric"
                  maxLength={4}
                  pattern="[0-9]{4}"
                />
              </div>
              <div className="form-field">
                <label htmlFor="model">차종</label>
                <input
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="i30"
                  autoComplete="off"
                />
              </div>
              <div className="form-actions reception-actions">
                <button type="submit" className="btn btn--primary btn--wide" disabled={submitting}>
                  {submitting ? "접수 중..." : "접수하기"}
                </button>
                <button type="button" className="btn btn--secondary" onClick={() => void refresh()}>
                  새로고침
                </button>
              </div>
              {message && (
                <p className={`form-message form-message--${message.type === "ok" ? "success" : "error"}`}>
                  {message.text}
                </p>
              )}
            </form>
          </section>

          <section className="card reception-card reception-card--table">
            <div className="reception-card__header">
              <div>
                <p className="reception-card__kicker">Today</p>
                <h2 className="card__title">오늘 접수 목록</h2>
              </div>
              <span className="reception-card__count">{sorted.length}건</span>
            </div>
            <div className="reception-filter" role="tablist" aria-label="접수 목록 필터">
              {(["all", "waiting", "done"] as ReceptionFilter[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`reception-filter__button ${filter === key ? "reception-filter__button--active" : ""}`}
                  onClick={() => setFilter(key)}
                  aria-selected={filter === key}
                  role="tab"
                >
                  <span>{filterLabels[key]}</span>
                  <strong>
                    {key === "all" ? sorted.length : key === "waiting" ? waitingCount : doneCount}
                  </strong>
                </button>
              ))}
            </div>
            <div className="reception-list-scroll">
              {loading ? (
                <p className="intake-empty">불러오는 중...</p>
              ) : (
                <IntakeTable
                  intakes={filteredIntakes}
                  emptyMessage={`${filterLabels[filter]} 접수 차량이 없습니다.`}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
