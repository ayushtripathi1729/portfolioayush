import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  skillCategoryService,
} from "@/services/skill-category.service";


import {
  createSkillCategorySchema,
} from "@/validations/skill-category.schema";


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
      await skillCategoryService.getAll();





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
      "GET /api/skill-categories error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch skill categories.",
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
      createSkillCategorySchema.safeParse(
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
      await skillCategoryService.create(
        validation.data
      );








    await logActivity({

      action:
        "CREATE",

      entity:
        "SkillCategory",

      entityId:
        category.id,

      description:
        `Created skill category: ${category.name}`,

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
      "POST /api/skill-categories error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create skill category.",
      },
      {
        status: 500,
      }
    );


  }

}