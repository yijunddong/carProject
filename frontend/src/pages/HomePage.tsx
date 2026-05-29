import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="page">
      <main className="page__main home">
        <img src="/images/logo.png" alt="로고" className="home__logo" />
        <h1>공업사 접수 · 대기 · 판정</h1>
        <p style={{ color: "var(--muted)" }}>현장 구역별 화면을 선택하세요.</p>
        <div className="home__links">
          <Link to="/reception" className="home__link">
            접수실
          </Link>
          <Link to="/waiting-display" className="home__link">
            대기실
          </Link>
          <Link to="/assessment" className="home__link">
            판정실
          </Link>
        </div>
      </main>
    </div>
  );
}
