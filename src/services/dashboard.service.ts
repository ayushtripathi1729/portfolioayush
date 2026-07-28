import {
  dashboardRepository,
  type DashboardStats,
} from "@/repositories/dashboard.repository";

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    return dashboardRepository.getStats();
  }
}

export const dashboardService = new DashboardService();