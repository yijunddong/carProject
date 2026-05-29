import type { ReactNode } from "react";
import { ConnectionBanner } from "./ConnectionBanner";
import { LogoHeader } from "./LogoHeader";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "display";
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
  return (
    <div className={`page page--${variant}`}>
      <LogoHeader title={title} subtitle={subtitle} showNav={showNav} />
      <ConnectionBanner />
      <main className="page__main">{children}</main>
    </div>
  );
}
