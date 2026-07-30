import { prisma } from "@/lib/prisma";


export class ActivityRepository {


  async create(data: {
    action: string;
    entity: string;
    entityId?: string;
    description: string;
  }) {

    return prisma.activity.create({

      data,

    });

  }




  async findRecent(limit = 10) {

    return prisma.activity.findMany({

      take: limit,

      orderBy: {

        createdAt: "desc",

      },

    });

  }


}



export const activityRepository =
  new ActivityRepository();