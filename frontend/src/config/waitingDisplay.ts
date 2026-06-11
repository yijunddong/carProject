/**
 * 대기실 화면 레이아웃·이미지 설정
 * 여기 숫자/값만 바꾸면 됩니다.
 */

export const waitingDisplayConfig = {
  /** 왼쪽 검사완료 표 너비 (%) — 줄이면 이미지 영역이 넓어짐(왼쪽으로 더 붙는 느낌) */
  leftPanelPercent: 36,

  /**
   * 이미지 맞춤
   * - cover: 영역 가득 채움 (잘릴 수 있음, 여백 없음)
   * - contain: 비율 유지, 여백 생길 수 있음
   * - fill: 가로·세로 늘려 꽉 채움 (비율 깨질 수 있음)
   */
  imageFit: "cover" as "cover" | "contain" | "fill",

  /** cover/contain 시 이미지 기준점 (예: "left center" → 왼쪽 기준으로 채움) */
  imagePosition: "center center",

  /** 슬라이드 간격(ms) */
  slideIntervalMs: 15_000,
};
