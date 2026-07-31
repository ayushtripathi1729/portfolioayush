import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  technologyService,
} from "@/services/technology.service";


import {
  updateTechnologySchema,
} from "@/validations/technology.schema";


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





    const technology =
      await technologyService.getById(id);





    if (!technology) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Technology not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: technology,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/technologies/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch technology.",
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





    const existingTechnology =
      await technologyService.getById(id);





    if (!existingTechnology) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Technology not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateTechnologySchema.safeParse(
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
      await technologyService.update(
        id,
        validation.data
      );








    await logActivity({

      action:
        "UPDATE",

      entity:
        "Technology",

      entityId:
        technology.id,

      description:
        `Updated technology: ${technology.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: technology,
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
      "PUT /api/technologies/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update technology.",
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





    const existingTechnology =
      await technologyService.getById(id);





    if (!existingTechnology) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Technology not found.",
        },
        {
          status: 404,
        }
      );


    }








    await technologyService.delete(id);








    await logActivity({

      action:
        "DELETE",

      entity:
        "Technology",

      entityId:
        id,

      description:
        `Deleted technology: ${existingTechnology.name}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Technology deleted successfully.",
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
      "DELETE /api/technologies/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete technology.",
      },
      {
        status: 500,
      }
    );


  }

}