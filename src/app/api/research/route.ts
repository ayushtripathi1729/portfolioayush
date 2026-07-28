import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { researchService } from "@/services/research.service";
import { createResearchSchema } from "@/validations/research.schema";

export async function GET() {
  try {
    const research = await researchService.getAll();

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
    console.error(
      "GET /api/research error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch research.",
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
      createResearchSchema.safeParse(body);

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

    const research =
      await researchService.create(
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: research,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/research error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create research.",
      },
      {
        status: 500,
      }
    );
  }
}