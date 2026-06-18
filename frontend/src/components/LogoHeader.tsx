import { Link } from "react-router-dom";
import { ConnectionStatusIcon } from "./ConnectionStatusIcon";

interface LogoHeaderProps {
  title: string;
  subtitle?: string;
  showNav?: boolean;
  showConnectionIcon?: boolean;
}

export function LogoHeader({
  title,
  subtitle,
  showNav = false,
  showConnectionIcon = false,
}: LogoHeaderProps) {
  return (
    <header className="logo-header">
      <div className="logo-header__brand">
        <img src="/images/logo.png" alt="로고" className="logo-header__img" />
        <div>
          <h1 className="logo-header__title">{title}</h1>
          {subtitle && <p className="logo-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="logo-header__right">
        {showNav && (
          <nav className="logo-header__nav">
            <Link to="/reception">접수실</Link>
            <Link to="/waiting-display">대기실</Link>
            <Link to="/assessment">판정실</Link>
          </nav>
        )}
        {showConnectionIcon && <ConnectionStatusIcon />}
      </div>
    </header>
  );
}
