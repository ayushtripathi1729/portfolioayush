import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  contactMessageService,
} from "@/services/contact-message.service";


import {
  updateContactMessageSchema,
} from "@/validations/contact-message.schema";


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





    const message =
      await contactMessageService.getById(id);





    if (!message) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Contact message not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: message,
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
      "GET /api/contact-messages/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch contact message.",
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





    const existingMessage =
      await contactMessageService.getById(id);





    if (!existingMessage) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Contact message not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateContactMessageSchema.safeParse(
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








    const message =
      await contactMessageService.update(
        id,
        validation.data
      );

return NextResponse.json(
      {
        success: true,
        data: message,
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
      "PUT /api/contact-messages/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update contact message.",
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





    const existingMessage =
      await contactMessageService.getById(id);





    if (!existingMessage) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Contact message not found.",
        },
        {
          status: 404,
        }
      );


    }








    await contactMessageService.delete(id);

return NextResponse.json(
      {
        success: true,
        message:
          "Contact message deleted successfully.",
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
      "DELETE /api/contact-messages/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete contact message.",
      },
      {
        status: 500,
      }
    );


  }

}