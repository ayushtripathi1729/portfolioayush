import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guard";
import { userService } from "@/services/user.service";
import { updateUserSchema } from "@/validations/user.schema";



export async function GET() {

  try {

    const session =
      await requireAuth();


    const user =
      await userService.getById(
        session.user.id
      );


    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      {
        status: 200,
      }
    );


  } catch (error) {


    console.error(
      "GET PROFILE ERROR:",
      error
    );


    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    }



    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile.",
      },
      {
        status: 500,
      }
    );

  }

}





export async function PATCH(
  request: NextRequest
) {

  try {


    const session =
      await requireAuth();



    const body =
      await request.json();



    const validation =
      updateUserSchema.safeParse(
        body
      );



    if (!validation.success) {


      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors:
            validation.error.flatten(),
        },
        {
          status: 400,
        }
      );


    }



    const updatedUser =
      await userService.update(
        session.user.id,
        validation.data
      );




    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "PATCH PROFILE ERROR:",
      error
    );



    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    }




    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile.",
      },
      {
        status: 500,
      }
    );


  }

}