import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { achievementService } from "@/services/achievement.service";
import { createAchievementSchema } from "@/validations/achievement.schema";


export async function GET() {

  try {

    const achievements =
      await achievementService.getAllIncludingHidden();


    return NextResponse.json(
      {
        success: true,
        data: achievements,
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    console.error(
      "GET /api/achievement error:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch achievements.",
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

    const session =
      await getServerSession(authOptions);


    if (!session?.user?.id) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    }



    const body =
      await request.json();



    const validation =
      createAchievementSchema.safeParse(
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



    const achievement =
      await achievementService.create(
        validation.data
      );



    return NextResponse.json(
      {
        success: true,
        data: achievement,
      },
      {
        status: 201,
      }
    );


  } catch (error) {

    console.error(
      "POST /api/achievement error:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Failed to create achievement.",
      },
      {
        status: 500,
      }
    );

  }

}