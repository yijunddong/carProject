import { IntakeTable } from "../components/IntakeTable";
import { PageLayout } from "../components/PageLayout";
import { useIntakes } from "../context/IntakeContext";
import { sortByRegisteredAt } from "../utils/format";

export function WaitingPage() {
  const { intakes, loading } = useIntakes();
  const sorted = sortByRegisteredAt(intakes);
  const waiting = sorted.filter((i) => i.status === "waiting");
  const done = sorted.filter((i) => i.status === "done");

  return (
    <PageLayout
      title="대기실"
      subtitle="접수 · 호출 현황"
      variant="display"
    >
      <div className="waiting-stats">
        <div className="waiting-stat">
          <div className="waiting-stat__value">{waiting.length}</div>
          <div className="waiting-stat__label">대기 중</div>
        </div>
        <div className="waiting-stat">
          <div className="waiting-stat__value">{done.length}</div>
          <div className="waiting-stat__label">호출 완료</div>
        </div>
        <div className="waiting-stat">
          <div className="waiting-stat__value">{sorted.length}</div>
          <div className="waiting-stat__label">오늘 전체</div>
        </div>
      </div>

      <section className="card">
        <h2 className="card__title">접수 · 대기 현황</h2>
        {loading ? (
          <p className="intake-empty">불러오는 중…</p>
        ) : (
          <IntakeTable
            intakes={sorted}
            large
            emptyMessage="표시할 접수 내역이 없습니다."
          />
        )}
      </section>
    </PageLayout>
  );
}
