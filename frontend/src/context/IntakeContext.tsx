import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { API_BASE_URL, USE_MOCK, WS_URL } from "../api/config";
import * as api from "../api/intakes";
import type { CreateIntakeBody } from "../api/intakes";
import type { Intake, IntakeEvent } from "../types/intake";
import { sortByRegisteredAt } from "../utils/format";

interface IntakeContextValue {
  intakes: Intake[];
  loading: boolean;
  apiConnected: boolean;
  wsConnected: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  register: (body: CreateIntakeBody) => Promise<Intake>;
  complete: (id: string) => Promise<Intake>;
}

const IntakeContext = createContext<IntakeContextValue | null>(null);

function newId(): string {
  return crypto.randomUUID();
}

function applyEvent(list: Intake[], event: IntakeEvent): Intake[] {
  if (event.type === "intake.created") {
    const created = event.payload as Intake;
    if (list.some((i) => i.id === created.id)) return list;
    return sortByRegisteredAt([...list, created]);
  }
  if (event.type === "intake.done") {
    const { id, status, completed_at } = event.payload;
    return list.map((item) =>
      item.id === id
        ? {
            ...item,
            status: (status as Intake["status"]) ?? "done",
            completed_at: completed_at ?? new Date().toISOString(),
          }
        : item,
    );
  }
  return list;
}

function mockRegister(body: CreateIntakeBody): Intake {
  const intake: Intake = {
    id: newId(),
    plate_number: body.plate_number.trim(),
    vehicle_model: body.vehicle_model.trim(),
    status: "waiting",
    registered_at: new Date().toISOString(),
  };
  return intake;
}

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(USE_MOCK);
  const [wsConnected, setWsConnected] = useState(USE_MOCK);
  const [error, setError] = useState<string | null>(null);
  const mockListeners = useRef<Set<(e: IntakeEvent) => void>>(new Set());

  const broadcastMock = useCallback((event: IntakeEvent) => {
    mockListeners.current.forEach((fn) => fn(event));
  }, []);

  const refresh = useCallback(async () => {
    if (USE_MOCK) {
      setLoading(false);
      setApiConnected(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchIntakes();
      setIntakes(sortByRegisteredAt(data));
      setApiConnected(true);
    } catch (e) {
      setApiConnected(false);
      setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (USE_MOCK) return;

    let ws: WebSocket | null = null;
    let closed = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    const connect = () => {
      if (closed) return;
      try {
        ws = new WebSocket(WS_URL);
      } catch {
        setWsConnected(false);
        retryTimer = setTimeout(connect, 3000);
        return;
      }

      ws.onopen = () => setWsConnected(true);
      ws.onclose = () => {
        setWsConnected(false);
        if (!closed) retryTimer = setTimeout(connect, 3000);
      };
      ws.onerror = () => setWsConnected(false);
      ws.onmessage = (msg) => {
        try {
          const event = JSON.parse(msg.data as string) as IntakeEvent;
          setIntakes((prev) => applyEvent(prev, event));
        } catch {
          /* ignore malformed */
        }
      };
    };

    connect();

    return () => {
      closed = true;
      clearTimeout(retryTimer);
      ws?.close();
    };
  }, []);

  useEffect(() => {
    if (!USE_MOCK) return;
    const handler = (event: IntakeEvent) => {
      setIntakes((prev) => applyEvent(prev, event));
    };
    mockListeners.current.add(handler);
    return () => {
      mockListeners.current.delete(handler);
    };
  }, []);

  const register = useCallback(
    async (body: CreateIntakeBody) => {
      if (USE_MOCK) {
        const intake = mockRegister(body);
        setIntakes((prev) => sortByRegisteredAt([...prev, intake]));
        broadcastMock({ type: "intake.created", payload: intake });
        return intake;
      }
      const intake = await api.createIntake(body);
      setIntakes((prev) => applyEvent(prev, { type: "intake.created", payload: intake }));
      return intake;
    },
    [broadcastMock, intakes],
  );

  const complete = useCallback(
    async (id: string) => {
      if (USE_MOCK) {
        const target = intakes.find((i) => i.id === id);
        if (!target) throw new Error("접수 건을 찾을 수 없습니다.");
        const updated: Intake = {
          ...target,
          status: "done",
          completed_at: new Date().toISOString(),
        };
        setIntakes((prev) => prev.map((i) => (i.id === id ? updated : i)));
        broadcastMock({ type: "intake.done", payload: updated });
        return updated;
      }
      const intake = await api.completeIntake(id);
      setIntakes((prev) => applyEvent(prev, { type: "intake.done", payload: intake }));
      return intake;
    },
    [broadcastMock, intakes],
  );

  const value = useMemo(
    () => ({
      intakes,
      loading,
      apiConnected,
      wsConnected,
      error,
      refresh,
      register,
      complete,
    }),
    [intakes, loading, apiConnected, wsConnected, error, refresh, register, complete],
  );

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>;
}

export function useIntakes(): IntakeContextValue {
  const ctx = useContext(IntakeContext);
  if (!ctx) throw new Error("useIntakes must be used within IntakeProvider");
  return ctx;
}

export function useApiStatusLabel(): string {
  const { apiConnected, wsConnected } = useIntakes();
  if (USE_MOCK) return "목업 모드 (로컬 테스트)";
  if (!apiConnected) return `API 미연결 (${API_BASE_URL})`;
  if (!wsConnected) return "API 연결됨 · 실시간 재연결 중…";
  return "API · 실시간 연결됨";
}
