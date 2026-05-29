import os

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import intakes
from .ws_manager import manager

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Car Queue API", version="0.1.0")

_default_cors = (
    "http://localhost:5200,"
    "http://127.0.0.1:5200,"
    "http://34.22.99.107:5200,"
    "http://34.22.99.107"
)
cors_origins = os.getenv("CORS_ORIGINS", _default_cors).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(intakes.router)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
