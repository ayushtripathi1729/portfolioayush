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

    return userRepository.create(
      data
    );

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