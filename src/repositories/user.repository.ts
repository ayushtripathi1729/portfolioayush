import { Prisma } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";



export class UserRepository {



  async findAll() {

    return prisma.user.findMany({

      select: {

        id: true,

        name: true,

        email: true,

        avatarId: true,

        createdAt: true,

        updatedAt: true,

      },


      orderBy: {

        createdAt: "desc",

      },

    });

  }







  async findById(
    id: string
  ) {

    return prisma.user.findUnique({

      where: {

        id,

      },


      select: {

        id: true,

        name: true,

        email: true,

        avatarId: true,

        createdAt: true,

        updatedAt: true,

      },

    });

  }







  /**
   * Used only for authentication.
   * Returns passwordHash intentionally.
   */
  async findByEmail(
    email: string
  ) {

    return prisma.user.findUnique({

      where: {

        email,

      },

    });

  }







  async create(
    data: Prisma.UserCreateInput
  ) {

    return prisma.user.create({

      data,


      select: {

        id: true,

        name: true,

        email: true,

        avatarId: true,

        createdAt: true,

        updatedAt: true,

      },

    });

  }







  async update(
    id: string,
    data: Prisma.UserUpdateInput
  ) {

    return prisma.user.update({

      where: {

        id,

      },


      data,


      select: {

        id: true,

        name: true,

        email: true,

        avatarId: true,

        createdAt: true,

        updatedAt: true,

      },

    });

  }







  async delete(
    id: string
  ) {

    return prisma.user.delete({

      where: {

        id,

      },


      select: {

        id: true,

        name: true,

        email: true,

        avatarId: true,

        createdAt: true,

        updatedAt: true,

      },

    });

  }







  async count() {

    return prisma.user.count();

  }


}





export const userRepository =
  new UserRepository();