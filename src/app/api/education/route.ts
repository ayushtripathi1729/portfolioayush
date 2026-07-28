import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { educationService } from "@/services/education.service";
import { createEducationSchema } from "@/validations/education.schema";

export async function GET() {
  try {
    const education =
      await educationService.getAll();

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
      "GET /api/education error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch education records.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

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

    const body = await request.json();

    const validation =
      createEducationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: validation.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const education =
      await educationService.create(
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: education,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/education error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create education record.",
      },
      {
        status: 500,
      }
    );
  }
}