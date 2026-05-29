import edge_tts
from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from ..config import TTS_VOICE
from ..speech_korean import build_announce_text

router = APIRouter(prefix="/api/tts", tags=["tts"])


class AnnounceRequest(BaseModel):
    plate_number: str = Field(..., min_length=1, max_length=32)
    vehicle_model: str = Field(..., min_length=1, max_length=64)


@router.get("/speech-text")
def speech_text(
    plate_number: str = Query(..., min_length=1),
    vehicle_model: str = Query(..., min_length=1),
):
    """변환된 안내 문구 확인용 (브라우저 TTS 폴백도 동일 문구 사용)"""
    return {
        "text": build_announce_text(plate_number.strip(), vehicle_model.strip()),
    }


@router.post("/announce")
async def announce(body: AnnounceRequest):
    text = build_announce_text(body.plate_number.strip(), body.vehicle_model.strip())
    communicate = edge_tts.Communicate(text, TTS_VOICE)

    async def audio_stream():
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                yield chunk["data"]

    return StreamingResponse(audio_stream(), media_type="audio/mpeg")
