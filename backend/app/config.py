"""서버 설정 — .env 없이 여기서 바로 수정"""

# GCP VM 외부 IP
GCP_HOST = "34.22.99.107"

API_PORT = 3001
FRONTEND_PORT = 5200

CORS_ORIGINS = [
    f"http://{GCP_HOST}:{FRONTEND_PORT}",
    f"http://{GCP_HOST}",
    "http://localhost:5200",
    "http://127.0.0.1:5200",
]

# Microsoft Edge Neural 한국어
TTS_VOICE = "ko-KR-SunHiNeural"
# 남성: "ko-KR-InJoonNeural"
