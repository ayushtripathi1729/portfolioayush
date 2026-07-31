import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  projectService,
} from "@/services/project.service";


import {
  createProjectSchema,
} from "@/validations/project.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  logActivity,
} from "@/lib/activity";









export async function GET() {


  try {


    await requireAuth();





    const projects =
      await projectService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: projects,
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
      "GET /api/projects error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch projects.",
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
      createProjectSchema.safeParse(
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








    const project =
      await projectService.create(
        validation.data
      );








    await logActivity({

      action:
        "CREATE",

      entity:
        "Project",

      entityId:
        project.id,

      description:
        `Created project: ${project.title}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: project,
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
      "POST /api/projects error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create project.",
      },
      {
        status: 500,
      }
    );


  }

}