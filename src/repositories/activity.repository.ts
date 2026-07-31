import { prisma } from "@/lib/prisma";



export interface ActivityRecord {

  id: string;

  action: string;

  entity: string;

  entityId: string | null;

  description: string;

  createdAt: Date;

}





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








  async findRecent(
    limit: number = 10
  ): Promise<ActivityRecord[]> {


    return prisma.activity.findMany({

      take: limit,


      orderBy: {

        createdAt: "desc",

      },


      select: {

        id: true,

        action: true,

        entity: true,

        entityId: true,

        description: true,

        createdAt: true,

      },

    });


  }


}





export const activityRepository =
  new ActivityRepository();