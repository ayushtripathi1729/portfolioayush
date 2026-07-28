import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export class ContactMessageRepository {
  async findAll() {
    return prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findUnread() {
    return prisma.contactMessage.findMany({
      where: {
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findRead() {
    return prisma.contactMessage.findMany({
      where: {
        isRead: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.contactMessage.findUnique({
      where: {
        id,
      },
    });
  }

  async markAsRead(id: string) {
    return prisma.contactMessage.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markAsReplied(id: string) {
    return prisma.contactMessage.update({
      where: {
        id,
      },
      data: {
        isReplied: true,
      },
    });
  }

  async create(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.ContactMessageUpdateInput
  ) {
    return prisma.contactMessage.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.contactMessage.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.contactMessage.count();
  }

  async countUnread() {
    return prisma.contactMessage.count({
      where: {
        isRead: false,
      },
    });
  }
}

export const contactMessageRepository =
  new ContactMessageRepository();