import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class ExperienceRepository {
  async findAll() {
    return prisma.experience.findMany({
      where: {
        visible: true,
      },
      include: {
        companyLogo: true,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          startDate: "desc",
        },
      ],
    });
  }

  async findAllIncludingHidden() {
    return prisma.experience.findMany({
      include: {
        companyLogo: true,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          startDate: "desc",
        },
      ],
    });
  }

  async findCurrent() {
    return prisma.experience.findMany({
      where: {
        visible: true,
        isCurrent: true,
      },
      include: {
        companyLogo: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.experience.findUnique({
      where: {
        id,
      },
      include: {
        companyLogo: true,
      },
    });
  }

  async create(data: Prisma.ExperienceCreateInput) {
    return prisma.experience.create({
      data,
      include: {
        companyLogo: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ExperienceUncheckedUpdateInput
  ) {
    return prisma.experience.update({
      where: {
        id,
      },
      data,
      include: {
        companyLogo: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.experience.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.experience.count();
  }
}

export const experienceRepository =
  new ExperienceRepository();
