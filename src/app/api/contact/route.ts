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
  getClientIp,
  getUserAgent,
} from "@/lib/request";
import { checkRateLimit } from "@/lib/rate-limit";


export async function POST(
  request: NextRequest
) {


  try {

    const rateLimit = checkRateLimit(
      getClientIp(request) ?? "unknown",
      { limit: 5, windowMs: 10 * 60 * 1000 }
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many messages. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }


    const body =
      await request.json();





    const validation =
      createContactMessageSchema.safeParse({

        ...body,

        ipAddress:
          getClientIp(request),


        userAgent:
          getUserAgent(request),

      });





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








    await contactMessageService.create(validation.data);








    // Contact messages are public submissions.
    // Log only creation, no authentication required.

return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully.",

      },
      {
        status: 201,
      }
    );



  } catch (error) {


    console.error(
      "POST /api/contact error:",
      error
    );



    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send message.",
      },
      {
        status: 500,
      }
    );


  }

}









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
      "GET /api/contact error:",
      error
    );






    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch messages.",
      },
      {
        status: 500,
      }
    );


  }

}
