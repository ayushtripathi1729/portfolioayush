import { Prisma, ProjectStatus } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class TechnologyRepository {
  async findAll() {
    return prisma.technology.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findAllIncludingHidden() {
    return prisma.technology.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.technology.findUnique({
      where: {
        id,
      },
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.technology.findUnique({
      where: {
        slug,
      },
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findWithPublishedProjects() {
    return prisma.technology.findMany({
      where: {
        visible: true,
        projects: {
          some: {
            project: {
              status: ProjectStatus.PUBLISHED,
              visible: true,
            },
          },
        },
      },
      include: {
        projects: {
          where: {
            project: {
              status: ProjectStatus.PUBLISHED,
              visible: true,
            },
          },
          include: {
            project: true,
          },
        },
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async create(data: Prisma.TechnologyCreateInput) {
    return prisma.technology.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.TechnologyUpdateInput
  ) {
    return prisma.technology.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.technology.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.technology.count();
  }
}

export const technologyRepository = new TechnologyRepository();