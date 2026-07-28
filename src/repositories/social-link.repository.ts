import { prisma } from "@/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export class SocialLinkRepository {
  async findAll() {
    return prisma.socialLink.findMany({
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

  async findBySettingId(settingId: string) {
    return prisma.socialLink.findMany({
      where: {
        settingId,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  async findById(id: string) {
    return prisma.socialLink.findUnique({
      where: {
        id,
      },
    });
  }

  async create(
    data:
      | Prisma.SocialLinkCreateInput
      | Prisma.SocialLinkUncheckedCreateInput
  ) {
    return prisma.socialLink.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.SocialLinkUpdateInput
  ) {
    return prisma.socialLink.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.socialLink.delete({
      where: {
        id,
      },
    });
  }
}

export const socialLinkRepository =
  new SocialLinkRepository();