import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  projectCategoryService,
} from "@/services/project-category.service";


import {
  createProjectCategorySchema,
} from "@/validations/project-category.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  logActivity,
} from "@/lib/activity";









export async function GET() {


  try {


    const categories =
      await projectCategoryService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/project-categories error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch project categories.",
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
      createProjectCategorySchema.safeParse(
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








    const category =
      await projectCategoryService.create(
        validation.data
      );








    await logActivity({

      action:
        "CREATE",

      entity:
        "ProjectCategory",

      entityId:
        category.id,

      description:
        `Created project category: ${category.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: category,
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
      "POST /api/project-categories error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create project category.",
      },
      {
        status: 500,
      }
    );


  }

}