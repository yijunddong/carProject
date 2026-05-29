/** GCP 서버 — IP 변경 시 여기만 수정 */

export const GCP_HOST = "34.22.99.107";

export const API_BASE_URL = `http://${GCP_HOST}:3001`;
export const WS_URL = `ws://${GCP_HOST}:3001/ws`;

/** 백엔드 연동 (목업 끄기) */
export const USE_MOCK = false;
