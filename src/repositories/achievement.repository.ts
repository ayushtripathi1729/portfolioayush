import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";


export class AchievementRepository {


  async findAll() {

    return prisma.achievement.findMany({

      where: {
        visible: true,
      },

      include: {
        image: true,
      },

      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          issueDate: "desc",
        },
      ],

    });

  }




  async findAllIncludingHidden() {

    return prisma.achievement.findMany({

      include: {
        image: true,
      },

      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          issueDate: "desc",
        },
      ],

    });

  }




  async findById(id: string) {

    return prisma.achievement.findUnique({

      where: {
        id,
      },

      include: {
        image: true,
      },

    });

  }




  async create(
    data: Prisma.AchievementCreateInput
  ) {

    return prisma.achievement.create({

      data,

      include: {
        image: true,
      },

    });

  }




  async update(
    id: string,
    data: Prisma.AchievementUncheckedUpdateInput
  ) {

    return prisma.achievement.update({

      where: {
        id,
      },

      data,

      include: {
        image: true,
      },

    });

  }




  async delete(id: string) {

    return prisma.achievement.delete({

      where: {
        id,
      },

    });

  }




  async count() {

    return prisma.achievement.count();

  }


}



export const achievementRepository =
  new AchievementRepository();
