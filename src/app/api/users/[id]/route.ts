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


import {
  logActivity,
} from "@/lib/activity";









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


    await requireAuth();





    const { id } =
      await params;





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








    await logActivity({

      action:
        "DELETE",

      entity:
        "User",

      entityId:
        id,

      description:
        `Deleted user: ${user.name}`,

    });







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