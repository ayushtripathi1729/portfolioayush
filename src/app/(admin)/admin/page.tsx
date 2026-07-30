import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";
import { RecentActivity } from "@/components/admin/dashboard/recent-activity";

import { dashboardService } from "@/services/dashboard.service";


export default async function AdminDashboardPage() {
  const session =
    await getServerSession(authOptions);

  const stats =
    await dashboardService.getStats();


  const name =
    session?.user?.name ??
    "Administrator";


  return (
    <div className="space-y-8">

      <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {name.split(" ")[0]} 👋
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage your portfolio, research, blogs, achievements and website
            content from one place.
          </p>
        </div>


        <div className="flex flex-wrap gap-3">

          <Link href="/admin/projects/new">
            <Button>
              <Plus className="size-4" />
              New Project
            </Button>
          </Link>


          <Link
            href="/"
            target="_blank"
          >
            <Button variant="outline">
              View Portfolio
              <ArrowUpRight className="size-4" />
            </Button>
          </Link>

        </div>

      </section>


      <DashboardStats stats={stats} />


      <section className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <QuickActions />
        </div>


        <RecentActivity />

      </section>

    </div>
  );
}