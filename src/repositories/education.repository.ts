import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class EducationRepository {
  async findAll() {
    return prisma.education.findMany({
      where: {
        visible: true,
      },
      include: {
        institutionLogo: true,
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
    return prisma.education.findMany({
      include: {
        institutionLogo: true,
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
    return prisma.education.findMany({
      where: {
        visible: true,
        isCurrent: true,
      },
      include: {
        institutionLogo: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.education.findUnique({
      where: {
        id,
      },
      include: {
        institutionLogo: true,
      },
    });
  }

  async create(data: Prisma.EducationCreateInput) {
    return prisma.education.create({
      data,
      include: {
        institutionLogo: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.EducationUpdateInput
  ) {
    return prisma.education.update({
      where: {
        id,
      },
      data,
      include: {
        institutionLogo: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.education.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.education.count();
  }
}

export const educationRepository = new EducationRepository();