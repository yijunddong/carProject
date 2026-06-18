import type { ReactNode } from "react";
import { ConnectionBanner } from "./ConnectionBanner";
import { LogoHeader } from "./LogoHeader";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "display" | "reception";
  showNav?: boolean;
  children: ReactNode;
}

export function PageLayout({
  title,
  subtitle,
  variant = "default",
  showNav = false,
  children,
}: PageLayoutProps) {
  const isReception = variant === "reception";

  return (
    <div className={`page page--${variant}`}>
      <LogoHeader
        title={title}
        subtitle={subtitle}
        showNav={showNav}
        showConnectionIcon={isReception}
      />
      {!isReception && <ConnectionBanner />}
      <main className="page__main">{children}</main>
    </div>
  );
}
