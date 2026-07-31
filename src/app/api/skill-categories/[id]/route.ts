import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  skillCategoryService,
} from "@/services/skill-category.service";


import {
  updateSkillCategorySchema,
} from "@/validations/skill-category.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  logActivity,
} from "@/lib/activity";









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


    const { id } =
      await params;





    const category =
      await skillCategoryService.getById(id);





    if (!category) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Skill category not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/skill-categories/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch skill category.",
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





    const existingCategory =
      await skillCategoryService.getById(id);





    if (!existingCategory) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Skill category not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateSkillCategorySchema.safeParse(
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
      await skillCategoryService.update(
        id,
        validation.data
      );








    await logActivity({

      action:
        "UPDATE",

      entity:
        "SkillCategory",

      entityId:
        category.id,

      description:
        `Updated skill category: ${category.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: category,
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
      "PUT /api/skill-categories/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update skill category.",
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





    const existingCategory =
      await skillCategoryService.getById(id);





    if (!existingCategory) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Skill category not found.",
        },
        {
          status: 404,
        }
      );


    }








    await skillCategoryService.delete(id);








    await logActivity({

      action:
        "DELETE",

      entity:
        "SkillCategory",

      entityId:
        id,

      description:
        `Deleted skill category: ${existingCategory.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Skill category deleted successfully.",
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
      "DELETE /api/skill-categories/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete skill category.",
      },
      {
        status: 500,
      }
    );


  }

}