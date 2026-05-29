function toWsUrl(httpBase: string): string {
  const base = httpBase.replace(/\/$/, "");
  if (base.startsWith("https://")) return `${base.replace(/^https/, "wss")}/ws`;
  return `${base.replace(/^http/, "ws")}/ws`;
}

/** 브라우저 접속 호스트 기준 API 주소 (GCP IP로 열었을 때 localhost 방지) */
function resolveApiBase(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `${protocol}//${hostname}:3001`;
    }
  }
  return "http://localhost:3001";
}

export const API_BASE_URL = resolveApiBase();

export const WS_URL =
  import.meta.env.VITE_WS_URL?.replace(/\/$/, "") || toWsUrl(API_BASE_URL);

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
