export function speakAssessmentCall(plateNumber: string, vehicleModel: string): void {
  if (!("speechSynthesis" in window)) {
    console.warn("TTS를 지원하지 않는 브라우저입니다.");
    return;
  }

  const text = `${plateNumber} ${vehicleModel} 차주님 판정실로 와주시길 바랍니다.`;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}
