import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class SkillCategoryRepository {
  async findAll() {
    return prisma.skillCategory.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
      include: {
        skills: {
          where: {
            visible: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async findAllIncludingHidden() {
    return prisma.skillCategory.findMany({
      orderBy: {
        displayOrder: "asc",
      },
      include: {
        skills: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.skillCategory.findUnique({
      where: {
        id,
      },
      include: {
        skills: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.skillCategory.findUnique({
      where: {
        slug,
      },
      include: {
        skills: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async create(data: Prisma.SkillCategoryCreateInput) {
    return prisma.skillCategory.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.SkillCategoryUpdateInput
  ) {
    return prisma.skillCategory.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.skillCategory.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.skillCategory.count();
  }
}

export const skillCategoryRepository = new SkillCategoryRepository();