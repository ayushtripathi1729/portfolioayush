import { prisma } from "@/lib/prisma";
import { ProjectStatus, Prisma } from "../../generated/prisma/client";

export class ProjectRepository {
  async findAll() {
    return prisma.project.findMany({
      include: {
        category: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        assets: {
          include: {
            asset: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
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

  async findPublished() {
    return prisma.project.findMany({
      where: {
        status: ProjectStatus.PUBLISHED,
        visible: true,
      },

      include: {
        category: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        assets: {
          include: {
            asset: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },

      orderBy: [
        {
          featured: "desc",
        },
        {
          displayOrder: "asc",
        },
      ],
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: {
        id,
      },

      include: {
        category: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        assets: {
          include: {
            asset: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: {
        slug,
      },

      include: {
        category: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        assets: {
          include: {
            asset: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async create(
    data:
      | Prisma.ProjectCreateInput
      | Prisma.ProjectUncheckedCreateInput
  ) {
    return prisma.project.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.ProjectUpdateInput
  ) {
    return prisma.project.update({
      where: {
        id,
      },

      data,

      include: {
        category: true,

        technologies: {
          include: {
            technology: true,
          },
        },

        assets: {
          include: {
            asset: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.project.count();
  }
}

export const projectRepository = new ProjectRepository();