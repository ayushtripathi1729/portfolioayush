import { hashPassword, verifyPassword } from "@/lib/password";

import { prisma } from "@/lib/prisma";

import { userRepository } from "@/repositories/user.repository";



export class AuthService {


  async authenticate(
    email: string,
    password: string
  ) {


    const user =
      await userRepository.findByEmail(
        email
      );


    if (!user) {
      return null;
    }



    const validPassword =
      await verifyPassword(
        password,
        user.passwordHash
      );



    if (!validPassword) {
      return null;
    }



    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };

  }





  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {


    const user =
      await userRepository.findByIdWithPassword(
        userId
      );



    if (!user) {

      throw new Error(
        "USER_NOT_FOUND"
      );

    }




    const validPassword =
      await verifyPassword(
        currentPassword,
        user.passwordHash
      );



    if (!validPassword) {

      throw new Error(
        "INVALID_PASSWORD"
      );

    }




    const newPasswordHash =
      await hashPassword(
        newPassword
      );




    await prisma.user.update({

      where: {
        id: userId,
      },


      data: {

        passwordHash:
          newPasswordHash,

      },

    });


    return true;

  }


}



export const authService =
  new AuthService();