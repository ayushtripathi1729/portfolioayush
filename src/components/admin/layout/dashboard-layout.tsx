import type { ReactNode } from "react";
import type { Session } from "next-auth";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  session: Session | null;
}

export function DashboardLayout({
  children,
  session,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="flex min-h-screen flex-col lg:ml-70">
        <Header session={session} />

        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}