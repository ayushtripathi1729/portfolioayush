import { prisma } from "@/lib/prisma";
import { Prisma } from "../../generated/prisma/client";


export class SkillRepository {




  // ADMIN: all skills including hidden

  async findAll() {

    return prisma.skill.findMany({

      include: {

        category: true,

      },

      orderBy: [

        {
          displayOrder: "asc",
        },

        {
          createdAt: "desc",
        },

      ],

    });

  }









  // PUBLIC: only visible skills

  async findVisible() {

    return prisma.skill.findMany({

      where: {

        visible: true,

      },

      include: {

        category: true,

      },

      orderBy: {

        displayOrder: "asc",

      },

    });

  }









  // HOMEPAGE: featured skills only

  async findFeatured() {

    return prisma.skill.findMany({

      where: {

        featured: true,

        visible: true,

      },

      include: {

        category: true,

      },

      orderBy: {

        displayOrder: "asc",

      },

    });

  }









  async findById(
    id: string
  ) {

    return prisma.skill.findUnique({

      where: {

        id,

      },

      include: {

        category: true,

      },

    });

  }









  async findBySlug(
    slug: string
  ) {

    return prisma.skill.findUnique({

      where: {

        slug,

      },

      include: {

        category: true,

      },

    });

  }









  async create(
    data:
      | Prisma.SkillCreateInput
      | Prisma.SkillUncheckedCreateInput
  ) {

    return prisma.skill.create({

      data,

      include: {

        category: true,

      },

    });

  }









  async update(
    id: string,
    data: Prisma.SkillUncheckedUpdateInput
  ) {

    return prisma.skill.update({

      where: {

        id,

      },

      data,

      include: {

        category: true,

      },

    });

  }









  async delete(
    id: string
  ) {

    return prisma.skill.delete({

      where: {

        id,

      },

    });

  }









  async count() {

    return prisma.skill.count();

  }



}





export const skillRepository =
  new SkillRepository();
