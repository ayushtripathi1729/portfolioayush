import { Prisma } from "../../../../generated/prisma/client";
import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  settingService,
} from "@/services/settings.service";


import {
  updateSettingSchema,
} from "@/validations/settings.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


export async function GET() {


  try {


    const session =
      await requireAuth();





    const setting =
      await settingService.getByUserId(
        session.user.id
      );





    if (!setting) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Settings not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: setting,
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
      "GET /api/settings error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch settings.",
      },
      {
        status: 500,
      }
    );


  }

}









export async function PUT(
  request: NextRequest
) {


  try {


    const session =
      await requireAuth();





    const body =
      await request.json();





    const validation =
      updateSettingSchema.safeParse(
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








    const setting =
      await settingService.updateByUserId(
      session.user.id,
      validation.data as Prisma.SettingUncheckedUpdateInput
    );

return NextResponse.json(
      {
        success: true,
        data: setting,
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
      "PUT /api/settings error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update settings.",
      },
      {
        status: 500,
      }
    );


  }

}