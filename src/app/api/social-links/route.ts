import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  settingService,
} from "@/services/settings.service";


import {
  socialLinkService,
} from "@/services/social-link.service";


import {
  createSocialLinkSchema,
} from "@/validations/social-link.schema";


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







    const links =
      await socialLinkService.getBySettingId(
        setting.id
      );







    return NextResponse.json(
      {
        success: true,
        data: links,
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
      "GET /api/social-links error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch social links.",
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







    const body =
      await request.json();





    const validation =
      createSocialLinkSchema.safeParse({

        ...body,

        settingId:
          setting.id,

      });





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








    const link =
      await socialLinkService.create(
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: link,
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
      "POST /api/social-links error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create social link.",
      },
      {
        status: 500,
      }
    );


  }

}