import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  researchService,
} from "@/services/research.service";


import {
  updateResearchSchema,
} from "@/validations/research.schema";


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





    const research =
      await researchService.getById(id);





    if (!research) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Research entry not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: research,
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
      "GET /api/research/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch research entry.",
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





    const existingResearch =
      await researchService.getById(id);





    if (!existingResearch) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Research entry not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateResearchSchema.safeParse(
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








    const research =
      await researchService.update(
        id,
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: research,
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
      "PUT /api/research/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update research entry.",
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





    const existingResearch =
      await researchService.getById(id);





    if (!existingResearch) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Research entry not found.",
        },
        {
          status: 404,
        }
      );


    }








    await researchService.delete(id);

return NextResponse.json(
      {
        success: true,
        message:
          "Research entry deleted successfully.",
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
      "DELETE /api/research/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete research entry.",
      },
      {
        status: 500,
      }
    );


  }

}