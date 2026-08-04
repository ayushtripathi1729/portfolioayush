import { prisma } from "@/lib/prisma";

export class VisitorService {
  async recordVisit(visitorId: string) {
    const now = new Date();

    const [, aggregate] = await prisma.$transaction([
      prisma.visitor.upsert({
        where: { visitorId },
        create: { visitorId, firstVisit: now, lastVisit: now },
        update: {
          lastVisit: now,
          visitCount: { increment: 1 },
        },
      }),
      prisma.visitor.aggregate({
        _count: { id: true },
        _sum: { visitCount: true },
      }),
    ]);

    return {
      totalVisits: aggregate._sum.visitCount ?? 0,
      uniqueVisitors: aggregate._count.id,
    };
  }
}

export const visitorService = new VisitorService();
