export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

export function sortByRegisteredAt<T extends { registered_at: string }>(intakes: T[]): T[] {
  return [...intakes].sort(
    (a, b) => new Date(a.registered_at).getTime() - new Date(b.registered_at).getTime(),
  );
}
