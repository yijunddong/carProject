import type { Intake } from "../../types/intake";

interface WaitingAnnounceModalProps {
  intake: Intake | null;
}

export function WaitingAnnounceModal({ intake }: WaitingAnnounceModalProps) {
  if (!intake) return null;

  return (
    <div className="waiting-modal" role="dialog" aria-modal="true">
      <div className="waiting-modal__backdrop" />
      <div className="waiting-modal__box">
        <header className="waiting-modal__header">
          <h1>검사 완료</h1>
        </header>
        <div className="waiting-modal__body">
          <p className="waiting-modal__name">
            {intake.plate_number} {intake.vehicle_model} 차주님
          </p>
          <p className="waiting-modal__line">검사가 완료 되었습니다.</p>
          <p className="waiting-modal__line">판정실로 와주시기 바랍니다.</p>
        </div>
      </div>
    </div>
  );
}
