import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class ResearchRepository {
  async findAll() {
    return prisma.research.findMany({
      where: {
        visible: true,
      },
      include: {
        pdfAsset: true,
        coverImage: true,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          publishedAt: "desc",
        },
      ],
    });
  }

  async findAllIncludingHidden() {
    return prisma.research.findMany({
      include: {
        pdfAsset: true,
        coverImage: true,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          publishedAt: "desc",
        },
      ],
    });
  }

  async findFeatured() {
    return prisma.research.findMany({
      where: {
        visible: true,
        featured: true,
      },
      include: {
        pdfAsset: true,
        coverImage: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.research.findUnique({
      where: {
        id,
      },
      include: {
        pdfAsset: true,
        coverImage: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.research.findUnique({
      where: {
        slug,
      },
      include: {
        pdfAsset: true,
        coverImage: true,
      },
    });
  }

  async create(data: Prisma.ResearchCreateInput) {
    return prisma.research.create({
      data,
      include: {
        pdfAsset: true,
        coverImage: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ResearchUpdateInput
  ) {
    return prisma.research.update({
      where: {
        id,
      },
      data,
      include: {
        pdfAsset: true,
        coverImage: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.research.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.research.count();
  }
}

export const researchRepository = new ResearchRepository();