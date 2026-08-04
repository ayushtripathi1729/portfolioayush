import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  experienceService,
} from "@/services/experience.service";


import {
  createExperienceSchema,
} from "@/validations/experience.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


export async function GET() {


  try {




    await requireAuth();

const experiences =
      await experienceService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: experiences,
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
      "GET /api/experience error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch experiences.",
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
      createExperienceSchema.safeParse(
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








    const experience =
      await experienceService.create(
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: experience,
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
      "POST /api/experience error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create experience.",
      },
      {
        status: 500,
      }
    );


  }

}