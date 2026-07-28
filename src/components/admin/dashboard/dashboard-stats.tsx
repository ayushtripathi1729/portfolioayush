import {
  BriefcaseBusiness,
  FileCode2,
  GraduationCap,
  Newspaper,
} from "lucide-react";

import { StatCard } from "@/components/admin/dashboard/stat-card";

export interface DashboardStatsData {
  projects: number;
  research: number;
  blogs: number;
  experience: number;
}

interface DashboardStatsProps {
  stats: DashboardStatsData;
}

export function DashboardStats({
  stats,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Projects"
        value={stats.projects}
        icon={<FileCode2 className="size-5" />}
        description="Published portfolio projects"
      />

      <StatCard
        title="Research"
        value={stats.research}
        icon={<GraduationCap className="size-5" />}
        description="Research publications"
      />

      <StatCard
        title="Blog Posts"
        value={stats.blogs}
        icon={<Newspaper className="size-5" />}
        description="Published articles"
      />

      <StatCard
        title="Experience"
        value={stats.experience}
        icon={<BriefcaseBusiness className="size-5" />}
        description="Professional experience"
      />
    </section>
  );
}