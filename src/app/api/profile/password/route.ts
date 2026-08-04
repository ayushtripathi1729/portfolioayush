import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  authService,
} from "@/services/auth.service";


import {
  changePasswordSchema,
} from "@/validations/profile.schema";


export async function PATCH(
  request: NextRequest
) {


  try {


    const session =
      await requireAuth();





    const body =
      await request.json();





    const validation =
      changePasswordSchema.safeParse(
        body
      );





    if (!validation.success) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Validation failed.",

          errors:
            validation.error.flatten(),

        },
        {
          status: 400,
        }
      );


    }








    await authService.changePassword(

      session.user.id,

      validation.data.currentPassword,

      validation.data.newPassword

    );

return NextResponse.json(
      {
        success: true,
        message:
          "Password changed successfully.",
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    if (
      error instanceof UnauthorizedError
    ) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );


    }







    if (
      error instanceof Error &&
      error.message ===
        "INVALID_PASSWORD"
    ) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Current password is incorrect.",
        },
        {
          status: 400,
        }
      );


    }







    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to change password.",
      },
      {
        status: 500,
      }
    );


  }

}