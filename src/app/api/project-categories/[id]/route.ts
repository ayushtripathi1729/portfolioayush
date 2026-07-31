import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  projectCategoryService,
} from "@/services/project-category.service";


import {
  updateProjectCategorySchema,
} from "@/validations/project-category.schema";


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
      await projectCategoryService.getById(id);





    if (!category) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Project category not found.",
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
      "GET /api/project-categories/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch project category.",
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
      await projectCategoryService.getById(id);





    if (!existingCategory) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Project category not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateProjectCategorySchema.safeParse(
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
      await projectCategoryService.update(
        id,
        validation.data
      );








    await logActivity({

      action:
        "UPDATE",

      entity:
        "ProjectCategory",

      entityId:
        category.id,

      description:
        `Updated project category: ${category.name}`,

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
      "PUT /api/project-categories/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update project category.",
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
      await projectCategoryService.getById(id);





    if (!existingCategory) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Project category not found.",
        },
        {
          status: 404,
        }
      );


    }








    await projectCategoryService.delete(id);








    await logActivity({

      action:
        "DELETE",

      entity:
        "ProjectCategory",

      entityId:
        id,

      description:
        `Deleted project category: ${existingCategory.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Project category deleted successfully.",
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
      "DELETE /api/project-categories/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete project category.",
      },
      {
        status: 500,
      }
    );


  }

}