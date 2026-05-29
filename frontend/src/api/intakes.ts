import { API_BASE_URL } from "./config";
import type { Intake } from "../types/intake";

export interface CreateIntakeBody {
  plate_number: string;
  vehicle_model: string;
}

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `요청 실패 (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function fetchIntakes(params?: {
  zone?: "waiting" | "assessment" | "reception";
  date?: string;
}): Promise<Intake[]> {
  const search = new URLSearchParams();
  if (params?.zone) search.set("zone", params.zone);
  if (params?.date) search.set("date", params.date);
  else search.set("date", "today");

  const qs = search.toString();
  const res = await fetch(`${API_BASE_URL}/api/intakes?${qs}`);
  return parseJson<Intake[]>(res);
}

export async function createIntake(body: CreateIntakeBody): Promise<Intake> {
  const res = await fetch(`${API_BASE_URL}/api/intakes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<Intake>(res);
}

export async function completeIntake(id: string): Promise<Intake> {
  const res = await fetch(`${API_BASE_URL}/api/intakes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "done" }),
  });
  return parseJson<Intake>(res);
}
