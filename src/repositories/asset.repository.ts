import { AssetType, Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class AssetRepository {
  async findAll() {
    return prisma.asset.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.asset.findUnique({
      where: {
        id,
      },
      include: {
        projectAssets: {
          include: {
            project: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });
  }

  async findByType(type: AssetType) {
    return prisma.asset.findMany({
      where: {
        type,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });
  }

  async findImages() {
    return this.findByType(AssetType.IMAGE);
  }

  async findDocuments() {
    return prisma.asset.findMany({
      where: {
        type: {
          in: [
            AssetType.DOCUMENT,
            AssetType.PDF,
          ],
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });
  }

  async create(data: Prisma.AssetCreateInput) {
    return prisma.asset.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.AssetUpdateInput
  ) {
    return prisma.asset.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.asset.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.asset.count();
  }
}

export const assetRepository = new AssetRepository();