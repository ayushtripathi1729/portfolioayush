import {
  NextResponse,
} from "next/server";


import {
  userService,
} from "@/services/user.service";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


interface RouteParams {

  params: Promise<{
    id: string;
  }>;

}









export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {


  try {


    const session = await requireAuth();





    const { id } =
      await params;

    if (id === session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot delete your own account.",
        },
        { status: 400 }
      );
    }





    const user =
      await userService.getById(id);





    if (!user) {


      return NextResponse.json(
        {
          success: false,
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
        success: true,
        message:
          "User deleted successfully.",
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
      error.message === "LAST_USER"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "The final administrator account cannot be deleted.",
        },
        { status: 409 }
      );
    }







    console.error(
      "DELETE USER ERROR:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete user.",
      },
      {
        status: 500,
      }
    );


  }

}
