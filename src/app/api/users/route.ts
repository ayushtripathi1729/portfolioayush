import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  userService,
} from "@/services/user.service";


import {
  logActivity,
} from "@/lib/activity";









export async function GET() {


  try {


    await requireAuth();





    const users =
      await userService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: users,
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
      "GET USERS ERROR:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch users.",
      },
      {
        status: 500,
      }
    );


  }

}









export async function POST(
  request: NextRequest
) {


  try {


    await requireAuth();





    const body =
      await request.json();





    const user =
      await userService.create(
        body
      );








    await logActivity({

      action:
        "CREATE",

      entity:
        "User",

      entityId:
        user.id,

      description:
        `Created user: ${user.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      {
        status: 201,
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
      "CREATE USER ERROR:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create user.",
      },
      {
        status: 500,
      }
    );


  }

}