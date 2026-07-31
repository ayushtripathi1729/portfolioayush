import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  educationService,
} from "@/services/education.service";


import {
  updateEducationSchema,
} from "@/validations/education.schema";


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





    const education =
      await educationService.getById(id);





    if (!education) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Education record not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: education,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/education/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch education record.",
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





    const existingEducation =
      await educationService.getById(id);





    if (!existingEducation) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Education record not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateEducationSchema.safeParse(
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








    const education =
      await educationService.update(
        id,
        validation.data
      );








    await logActivity({

      action:
        "UPDATE",

      entity:
        "Education",

      entityId:
        education.id,

      description:
        `Updated education record: ${education.institution}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: education,
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
      "PUT /api/education/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update education record.",
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





    const existingEducation =
      await educationService.getById(id);





    if (!existingEducation) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Education record not found.",
        },
        {
          status: 404,
        }
      );


    }








    await educationService.delete(id);








    await logActivity({

      action:
        "DELETE",

      entity:
        "Education",

      entityId:
        id,

      description:
        `Deleted education record: ${existingEducation.institution}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Education record deleted successfully.",
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
      "DELETE /api/education/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete education record.",
      },
      {
        status: 500,
      }
    );


  }

}