import { Prisma } from "../../generated/prisma/client";

import { userRepository } from "@/repositories/user.repository";



export class UserService {


  async getAll() {

    return userRepository.findAll();

  }





  async getById(
    id: string
  ) {

    return userRepository.findById(id);

  }





  async getByEmail(
    email: string
  ) {

    return userRepository.findByEmail(email);

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

    return userRepository.update(
      id,
      data
    );

  }





  async delete(
    id: string
  ) {

    return userRepository.delete(
      id
    );

  }





  async count() {

    return userRepository.count();

  }


}





export const userService =
  new UserService();