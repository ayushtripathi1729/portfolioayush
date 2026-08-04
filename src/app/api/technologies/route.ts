import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  technologyService,
} from "@/services/technology.service";


import {
  createTechnologySchema,
} from "@/validations/technology.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


export async function GET() {


  try {




    await requireAuth();

const technologies =
      await technologyService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: technologies,
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
      "GET /api/technologies error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch technologies.",
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
      createTechnologySchema.safeParse(
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








    const technology =
      await technologyService.create(
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: technology,
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
      "POST /api/technologies error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create technology.",
      },
      {
        status: 500,
      }
    );


  }

}