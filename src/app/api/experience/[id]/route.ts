import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { experienceService } from "@/services/experience.service";
import { updateExperienceSchema } from "@/validations/experience.schema";

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
    const { id } = await params;

    const experience =
      await experienceService.getById(id);

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: experience,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/experience/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch experience.",
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

    const { id } = await params;

    const existingExperience =
      await experienceService.getById(id);

    if (!existingExperience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const validation =
      updateExperienceSchema.safeParse(body);

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

    const experience =
      await experienceService.update(
        id,
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: experience,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/experience/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update experience.",
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

    const { id } = await params;

    const existingExperience =
      await experienceService.getById(id);

    if (!existingExperience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found.",
        },
        {
          status: 404,
        }
      );
    }

    await experienceService.delete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Experience deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE /api/experience/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete experience.",
      },
      {
        status: 500,
      }
    );
  }
}