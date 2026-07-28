import { prisma } from "@/lib/prisma";

export interface DashboardStats {
  projects: number;
  research: number;
  blogs: number;
  experience: number;
}

export class DashboardRepository {
  async getStats(): Promise<DashboardStats> {
    const [projects, research, blogs, experience] = await Promise.all([
      prisma.project.count(),
      prisma.research.count(),
      prisma.blog.count(),
      prisma.experience.count(),
    ]);

    return {
      projects,
      research,
      blogs,
      experience,
    };
  }
}

export const dashboardRepository = new DashboardRepository();