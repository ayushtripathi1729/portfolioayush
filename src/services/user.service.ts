import { Prisma } from "../../generated/prisma/client";

import { userRepository } from "@/repositories/user.repository";
import { logActivity } from "@/lib/activity";



export class UserService {



  async getAll() {

    return userRepository.findAll();

  }





  async getById(
    id: string
  ) {

    return userRepository.findById(
      id
    );

  }





  async getByEmail(
    email: string
  ) {

    return userRepository.findByEmail(
      email
    );

  }





  async create(
    data: Prisma.UserCreateInput
  ) {

    const user =
      await userRepository.create(
      data
    );

    await logActivity({

      action: "CREATE",

      entity: "User",

      entityId: user.id,

      description:
        `Created administrator account "${user.email}"`,

    });



    return user;

  }





  async update(
    id: string,
    data: Prisma.UserUpdateInput
  ) {


    const user =
      await userRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "User",

      entityId: user.id,

      description:
        `Updated administrator profile "${user.name}"`,

    });



    return user;

  }





  async delete(
    id: string
  ) {


    if (await userRepository.count() <= 1) {
      throw new Error("LAST_USER");
    }

    const deleted =
      await userRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "User",

      entityId: id,

      description:
        "Deleted administrator account",

    });



    return deleted;

  }





  async count() {

    return userRepository.count();

  }


}





export const userService =
  new UserService();
