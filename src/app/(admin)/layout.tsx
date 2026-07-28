import type { ReactNode } from "react";

import { DashboardLayout } from "@/components/admin/layout/dashboard-layout";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}