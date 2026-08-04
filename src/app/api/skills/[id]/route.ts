import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  skillService,
} from "@/services/skill.service";


import {
  updateSkillSchema,
} from "@/validations/skill.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


interface RouteContext {

  params: Promise<{
    id: string;
  }>;

}









export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {


  try {




    await requireAuth();

const { id } =
      await params;





    const skill =
      await skillService.getById(id);





    if (!skill) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Skill not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: skill,
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
      "GET /api/skills/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch skill.",
      },
      {
        status: 500,
      }
    );


  }

}









export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {


  try {


    await requireAuth();





    const { id } =
      await params;





    const existingSkill =
      await skillService.getById(id);





    if (!existingSkill) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Skill not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateSkillSchema.safeParse(
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
      await skillService.update(
        id,
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: skill,
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
      "PUT /api/skills/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update skill.",
      },
      {
        status: 500,
      }
    );


  }

}









export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {


  try {


    await requireAuth();





    const { id } =
      await params;





    const existingSkill =
      await skillService.getById(id);





    if (!existingSkill) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Skill not found.",
        },
        {
          status: 404,
        }
      );


    }








    await skillService.delete(id);

return NextResponse.json(
      {
        success: true,
        message:
          "Skill deleted successfully.",
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
      "DELETE /api/skills/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete skill.",
      },
      {
        status: 500,
      }
    );


  }

}