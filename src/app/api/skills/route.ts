import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { skillService } from "@/services/skill.service";
import { createSkillSchema } from "@/validations/skill.schema";

export async function GET() {
  try {
    const skills = await skillService.getAll();

    return NextResponse.json(
      {
        success: true,
        data: skills,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/skills error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skills.",
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
      createSkillSchema.safeParse(body);

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

    const skill = await skillService.create(
      validation.data
    );

    return NextResponse.json(
      {
        success: true,
        data: skill,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/skills error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create skill.",
      },
      {
        status: 500,
      }
    );
  }
}