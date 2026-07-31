import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  contactMessageService,
} from "@/services/contact-message.service";


import {
  createContactMessageSchema,
} from "@/validations/contact-message.schema";


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





    const messages =
      await contactMessageService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: messages,
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
      "GET /api/contact-messages error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch contact messages.",
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


    const body =
      await request.json();





    const validation =
      createContactMessageSchema.safeParse(
        {

          ...body,

          ipAddress:
            request.headers.get(
              "x-forwarded-for"
            ) ?? null,


          userAgent:
            request.headers.get(
              "user-agent"
            ) ?? null,

        }
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
      await contactMessageService.create(
        validation.data
      );








    await logActivity({

      action:
        "CREATE",

      entity:
        "ContactMessage",

      entityId:
        message.id,

      description:
        `New contact message received from ${message.name}`,

    });







    return NextResponse.json(
      {
        success: true,

        data:
          message,

        message:
          "Your message has been sent successfully.",

      },
      {
        status: 201,
      }
    );



  } catch (error) {


    console.error(
      "POST /api/contact-messages error:",
      error
    );






    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create contact message.",
      },
      {
        status: 500,
      }
    );


  }

}