import { getServerSession } from "next-auth";

import {
  authOptions,
} from "@/lib/auth";



export class UnauthorizedError extends Error {

  constructor() {

    super(
      "UNAUTHORIZED"
    );

    this.name =
      "UnauthorizedError";

  }

}





export async function requireAuth() {


  const session =
    await getServerSession(
      authOptions
    );




  if (
    !session?.user?.id
  ) {


    throw new UnauthorizedError();


  }




  return session;


}