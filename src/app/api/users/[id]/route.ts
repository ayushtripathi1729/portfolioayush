import { NextResponse } from "next/server";

import { userService } from "@/services/user.service";


interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}



export async function DELETE(
  request: Request,
  { params }: RouteParams
) {

  try {

    const { id } =
      await params;


    const user =
      await userService.getById(id);



    if (!user) {

      return NextResponse.json(
        {
          message:
            "User not found.",
        },
        {
          status: 404,
        }
      );

    }



    await userService.delete(id);



    return NextResponse.json(
      {
        message:
          "User deleted successfully.",
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    console.error(
      "DELETE USER ERROR:",
      error
    );


    return NextResponse.json(
      {
        message:
          "Failed to delete user.",
      },
      {
        status: 500,
      }
    );

  }

}