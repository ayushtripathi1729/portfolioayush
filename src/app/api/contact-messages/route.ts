import { NextRequest, NextResponse } from "next/server";

import { contactMessageService } from "@/services/contact-message.service";
import { createContactMessageSchema } from "@/validations/contact-message.schema";



export async function GET() {

  try {

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

    console.error(
      "GET /api/contact-messages error:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact messages.",
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
        body
      );



    if (!validation.success) {

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
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



    return NextResponse.json(
      {
        success: true,
        data: message,
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
        message: "Failed to create contact message.",
      },
      {
        status: 500,
      }
    );


  }

}