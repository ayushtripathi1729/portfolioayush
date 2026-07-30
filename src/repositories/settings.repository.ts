import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class SettingRepository {
  async findAll() {
    return prisma.setting.findMany({
      include: {
        profileImage: true,
        resume: true,
        socialLinks: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.setting.findUnique({
      where: {
        id,
      },
      include: {
        profileImage: true,
        resume: true,
        socialLinks: true,
        user: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.setting.findUnique({
      where: {
        userId,
      },
      include: {
        profileImage: true,
        resume: true,
        socialLinks: true,
        user: true,
      },
    });
  }

  async create(data: Prisma.SettingCreateInput) {
    return prisma.setting.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.SettingUpdateInput
  ) {
    return prisma.setting.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateByUserId(
    userId: string,
    data: Prisma.SettingUpdateInput
  ) {
    return prisma.setting.update({
      where: {
        userId,
      },
      data,
    });
  }

  async upsert(
    userId: string,
    create: Prisma.SettingCreateInput,
    update: Prisma.SettingUpdateInput
  ) {
    return prisma.setting.upsert({
      where: {
        userId,
      },
      create,
      update,
    });
  }

  async delete(id: string) {
    return prisma.setting.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.setting.count();
  }
}

export const settingRepository = new SettingRepository();