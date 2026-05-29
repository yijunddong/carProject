import { API_BASE_URL } from "../api/config";

async function fetchSpeechText(plateNumber: string, vehicleModel: string): Promise<string | null> {
  const params = new URLSearchParams({
    plate_number: plateNumber,
    vehicle_model: vehicleModel,
  });
  const res = await fetch(`${API_BASE_URL}/api/tts/speech-text?${params}`);
  if (!res.ok) return null;
  const data = (await res.json()) as { text: string };
  return data.text;
}

async function speakNeuralTts(plateNumber: string, vehicleModel: string): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/tts/announce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      plate_number: plateNumber,
      vehicle_model: vehicleModel,
    }),
  });

  if (!res.ok) return false;

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve(true);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };
    void audio.play().catch(() => resolve(false));
  });
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const list = window.speechSynthesis.getVoices();
    if (list.length > 0) {
      resolve(list);
      return;
    }
    const onChange = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onChange);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", onChange);
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 400);
  });
}

function pickKoreanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const ko = voices.filter((v) => v.lang.startsWith("ko"));
  if (ko.length === 0) return undefined;
  const score = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("neural") || n.includes("natural")) return 100;
    if (n.includes("google") && n.includes("한국")) return 90;
    return 10;
  };
  return [...ko].sort((a, b) => score(b.name) - score(a.name))[0];
}

async function speakBrowserFallback(text: string): Promise<void> {
  if (!("speechSynthesis" in window)) return;

  const voices = await loadVoices();
  const voice = pickKoreanVoice(voices);

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.92;
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export async function speakAssessmentCall(
  plateNumber: string,
  vehicleModel: string,
): Promise<"neural" | "browser"> {
  const speechText =
    (await fetchSpeechText(plateNumber, vehicleModel)) ??
    `${plateNumber} ${vehicleModel} 차주님, 판정실로 와주시길 바랍니다.`;

  try {
    const ok = await speakNeuralTts(plateNumber, vehicleModel);
    if (ok) return "neural";
  } catch {
    /* API 미연결 */
  }

  await speakBrowserFallback(speechText);
  return "browser";
}
