import type { ReactNode } from "react";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { DashboardLayout } from "@/components/admin/layout/dashboard-layout";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <DashboardLayout session={session}>
      {children}
    </DashboardLayout>
  );
}