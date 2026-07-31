import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  achievementService,
} from "@/services/achievement.service";


import {
  updateAchievementSchema,
} from "@/validations/achievement.schema";


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




    const achievement =
      await achievementService.getById(id);





    if (!achievement) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: achievement,
      },
      {
        status: 200,
      }
    );




  } catch (error) {



    console.error(
      "GET /api/achievement/[id] error:",
      error
    );




    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch achievement.",
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





    const existingAchievement =
      await achievementService.getById(id);





    if (!existingAchievement) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateAchievementSchema.safeParse(
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








    const achievement =
      await achievementService.update(
        id,
        validation.data
      );







    await logActivity({

      action:
        "UPDATE",

      entity:
        "Achievement",

      entityId:
        achievement.id,

      description:
        `Updated achievement: ${achievement.title}`,

    });








    return NextResponse.json(
      {
        success: true,
        data: achievement,
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
      "PUT /api/achievement/[id] error:",
      error
    );





    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update achievement.",
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





    const existingAchievement =
      await achievementService.getById(id);





    if (!existingAchievement) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement not found.",
        },
        {
          status: 404,
        }
      );


    }








    await achievementService.delete(id);







    await logActivity({

      action:
        "DELETE",

      entity:
        "Achievement",

      entityId:
        id,

      description:
        `Deleted achievement: ${existingAchievement.title}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Achievement deleted successfully.",
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
      "DELETE /api/achievement/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete achievement.",
      },
      {
        status: 500,
      }
    );


  }

}