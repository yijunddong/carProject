import { Link } from "react-router-dom";

interface LogoHeaderProps {
  title: string;
  subtitle?: string;
  showNav?: boolean;
}

export function LogoHeader({ title, subtitle, showNav = false }: LogoHeaderProps) {
  return (
    <header className="logo-header">
      <div className="logo-header__brand">
        <img src="/images/logo.png" alt="로고" className="logo-header__img" />
        <div>
          <h1 className="logo-header__title">{title}</h1>
          {subtitle && <p className="logo-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {showNav && (
        <nav className="logo-header__nav">
          <Link to="/reception">접수실</Link>
          <Link to="/waiting-display">대기실</Link>
          <Link to="/assessment">판정실</Link>
        </nav>
      )}
    </header>
  );
}
