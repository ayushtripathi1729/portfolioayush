import type { ReactNode } from "react";

import { requireAuth } from "@/lib/auth-guard";
import { DashboardLayout } from "@/components/admin/layout/dashboard-layout";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();

  return (
    <DashboardLayout session={session}>
      {children}
    </DashboardLayout>
  );
}
