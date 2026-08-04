import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  skillService,
} from "@/services/skill.service";


import {
  createSkillSchema,
} from "@/validations/skill.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


export async function GET() {


  try {




    await requireAuth();

const skills =
      await skillService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: skills,
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
      "GET /api/skills error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch skills.",
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
      createSkillSchema.safeParse(
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








    const skill =
      await skillService.create(
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: skill,
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
      "POST /api/skills error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create skill.",
      },
      {
        status: 500,
      }
    );


  }

}