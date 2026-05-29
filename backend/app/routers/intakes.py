from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import IntakeRow
from ..schemas import IntakeCreate, IntakeOut, IntakePatch
from ..ws_manager import manager

router = APIRouter(prefix="/api/intakes", tags=["intakes"])

KST = timezone(timedelta(hours=9))


def now_kst() -> datetime:
    return datetime.now(KST)


def start_of_today_kst() -> datetime:
    n = now_kst()
    return n.replace(hour=0, minute=0, second=0, microsecond=0)


def row_to_out(row: IntakeRow) -> IntakeOut:
    return IntakeOut(
        id=row.id,
        plate_number=row.plate_number,
        vehicle_model=row.vehicle_model,
        status=row.status,  # type: ignore[arg-type]
        registered_at=row.registered_at,
        completed_at=row.completed_at,
    )


async def emit_created(intake: IntakeOut) -> None:
    await manager.broadcast(
        {"type": "intake.created", "payload": intake.model_dump(mode="json")}
    )


async def emit_done(intake: IntakeOut) -> None:
    await manager.broadcast(
        {"type": "intake.done", "payload": intake.model_dump(mode="json")}
    )


@router.get("", response_model=list[IntakeOut])
def list_intakes(
    date: str = Query(default="today"),
    zone: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    del zone  # 1차: 존별 필터 없이 당일 전체 (프론트 공통 목록)

    stmt = select(IntakeRow)
    if date == "today":
        stmt = stmt.where(IntakeRow.registered_at >= start_of_today_kst())

    rows = db.scalars(stmt.order_by(IntakeRow.registered_at.asc())).all()
    return [row_to_out(r) for r in rows]


@router.post("", response_model=IntakeOut, status_code=201)
async def create_intake(body: IntakeCreate, db: Session = Depends(get_db)):
    row = IntakeRow(
        plate_number=body.plate_number.strip(),
        vehicle_model=body.vehicle_model.strip(),
        status="waiting",
        registered_at=now_kst(),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    intake = row_to_out(row)
    await emit_created(intake)
    return intake


@router.patch("/{intake_id}", response_model=IntakeOut)
async def patch_intake(
    intake_id: str,
    body: IntakePatch,
    db: Session = Depends(get_db),
):
    row = db.get(IntakeRow, intake_id)
    if not row:
        raise HTTPException(status_code=404, detail="접수 건을 찾을 수 없습니다.")

    if body.status == "done":
        if row.status == "done":
            return row_to_out(row)
        row.status = "done"
        row.completed_at = now_kst()
        db.commit()
        db.refresh(row)
        intake = row_to_out(row)
        await emit_done(intake)
        return intake

    raise HTTPException(status_code=400, detail="지원하지 않는 상태입니다.")
