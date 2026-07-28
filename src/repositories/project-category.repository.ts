import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class ProjectCategoryRepository {
  async findAll() {
    return prisma.projectCategory.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findAllIncludingHidden() {
    return prisma.projectCategory.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.projectCategory.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.projectCategory.findUnique({
      where: {
        slug,
      },
    });
  }

  async create(data: Prisma.ProjectCategoryCreateInput) {
    return prisma.projectCategory.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.ProjectCategoryUpdateInput
  ) {
    return prisma.projectCategory.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.projectCategory.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.projectCategory.count();
  }
}

export const projectCategoryRepository =
  new ProjectCategoryRepository();