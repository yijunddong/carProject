# 공업사 접수 · 대기 · 판정 시스템

접수실·대기실·판정실 웹 화면 및 API 서버 프로젝트입니다.  
상세 기획은 [`docs/QUEUE_KIOSK_PLAN.md`](docs/QUEUE_KIOSK_PLAN.md)를 참고하세요.

| 구분 | 기술 | 포트 |
|------|------|------|
| 프론트엔드 | React (Vite) | **5200** |
| 백엔드 | Python (FastAPI) | **3001** |

---

## 사전 요구 사항

- **Node.js** 18 이상 (권장 20+)
- **npm**
- **Python** 3.10 이상

---

## 빠른 시작 (백엔드 + 프론트)

터미널을 **두 개** 엽니다.

### 터미널 1 — 백엔드 (3001)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # 필요 시 CORS_ORIGINS 수정
uvicorn app.main:app --host 0.0.0.0 --port 3001 --reload
```

또는:

```bash
chmod +x run.sh
./run.sh
```

동작 확인: `http://localhost:3001/health` → `{"status":"ok"}`

### 터미널 2 — 프론트엔드 (5200)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**서버 IP·포트**는 코드에 바로 적혀 있습니다 (`.env` 복사 불필요).

- 프론트: `frontend/src/api/config.ts` → `GCP_HOST`
- 백엔드: `backend/app/config.py` → `GCP_HOST`, CORS, TTS 음성

브라우저: `http://localhost:5200/reception` · `/assessment` · `/waiting-display`  
(GCP: `http://34.22.99.107:5200/...`)

> **실시간 연동**: WebSocket(`/ws`) — `USE_MOCK`은 `config.ts`에서 `false` (기본값).

---

## GCP에서 실행 (현재 VM)

| 항목 | 주소 |
|------|------|
| VM IP | `34.22.99.107` |
| 프론트 | **http://34.22.99.107:5200** (접수: `/reception`) |
| 백엔드 API | **http://34.22.99.107:3001** |
| WebSocket | **ws://34.22.99.107:3001/ws** |
| 헬스체크 | http://34.22.99.107:3001/health |

> `http://34.22.99.107/` (80번, nginx)만 쓰면 **502**가 날 수 있습니다. 반드시 **포트 5200·3001**을 붙이세요.

IP 변경 시 `config.ts` / `config.py`만 수정 후 서버 재시작.

```bash
# 백엔드 재시작 (CORS .env 반영)
cd backend && source .venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 3001 --reload

# 프론트 재시작 (.env 반영)
cd frontend && npm run dev
```

방화벽 인바운드: **3001**, **5200**

---

## 프론트엔드

### 화면별 URL

| 구역 | URL |
|------|-----|
| 홈 | `http://<호스트>:5200/` |
| 접수실 | `http://<호스트>:5200/reception` |
| 대기실 | `http://<호스트>:5200/waiting-display` |
| 판정실 | `http://<호스트>:5200/assessment` |

### 목업 모드 (백엔드 없이 UI만)

```env
VITE_USE_MOCK=true
```

같은 브라우저 안에서만 연동 테스트용입니다.

### 프로덕션 빌드

```bash
cd frontend
npm run build
npm run preview
```

---

## 백엔드 API

| Method | Path | 설명 |
|--------|------|------|
| GET | `/health` | 헬스체크 |
| GET | `/api/intakes?date=today` | 당일 접수 목록 |
| POST | `/api/intakes` | 접수 `{ "plate_number", "vehicle_model" }` |
| PATCH | `/api/intakes/{id}` | `{ "status": "done" }` 판정 완료 |
| WS | `/ws` | 실시간 `intake.created`, `intake.done` |
| POST | `/api/tts/announce` | 판정 호출 Neural TTS (mp3) |

데이터: SQLite `backend/data/intakes.db`

### TTS (판정실 호출)

- **1순위**: 백엔드 `edge-tts` — `ko-KR-SunHiNeural` (자연스러운 한국어 Neural)
- **2순위**: 브라우저 `speechSynthesis` (API 실패 시)
- 백엔드 의존성 추가 후 재설치: `pip install -r requirements.txt`
- 음성 변경: `backend/app/config.py`의 `TTS_VOICE` (예: `ko-KR-InJoonNeural`)
- 차량번호·차종 읽기: `backend/app/speech_korean.py` (50너2560→오십너이천오백육십, QM6→큐엠식, GV70→지브이칠공)

---

## GCP 체크리스트

- [ ] 백엔드 `0.0.0.0:3001`, 프론트 `0.0.0.0:5200`
- [ ] 방화벽 **3001**, **5200**
- [ ] `CORS_ORIGINS`에 프론트 URL 포함
- [ ] 3존 PC에서 GCP IP로 접속 테스트
- [ ] 판정실 TTS: 브라우저 + 스피커 (Chrome 권장)

---

## 프로젝트 구조

```
carProject/
├── backend/                 # FastAPI
│   ├── app/
│   ├── data/                # SQLite (자동 생성)
│   ├── requirements.txt
│   └── run.sh
├── frontend/                # React
├── docs/QUEUE_KIOSK_PLAN.md
└── README.md
```

---

## 로고

- `frontend/images/logo.png` → `/images/logo.png` (public)
- 접수실·대기실·판정실 공통 상단 로고
