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

import { hashPassword } from "@/lib/password";

import {
  createUserWithPasswordSchema,
} from "@/validations/user.schema";


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





    const validation =
      createUserWithPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    if (await userService.getByEmail(validation.data.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    const user =
      await userService.create({
        name: validation.data.name,
        email: validation.data.email,
        passwordHash: await hashPassword(validation.data.password),
        ...(validation.data.avatarId
          ? {
              avatar: {
                connect: { id: validation.data.avatarId },
              },
            }
          : {}),
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
