import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { projectCategoryService } from "@/services/project-category.service";
import { createProjectCategorySchema } from "@/validations/project-category.schema";

export async function GET() {
  try {
    const categories =
      await projectCategoryService.getAll();

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/project-categories error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project categories.",
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
      createProjectCategorySchema.safeParse(body);

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

    const category =
      await projectCategoryService.create(
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/project-categories error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project category.",
      },
      {
        status: 500,
      }
    );
  }
}