import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { technologyService } from "@/services/technology.service";
import { updateTechnologySchema } from "@/validations/technology.schema";

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

    const technology =
      await technologyService.getById(id);

    if (!technology) {
      return NextResponse.json(
        {
          success: false,
          message: "Technology not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: technology,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/technologies/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch technology.",
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

    const existingTechnology =
      await technologyService.getById(id);

    if (!existingTechnology) {
      return NextResponse.json(
        {
          success: false,
          message: "Technology not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const validation =
      updateTechnologySchema.safeParse(body);

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

    const technology =
      await technologyService.update(
        id,
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: technology,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/technologies/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update technology.",
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

    const existingTechnology =
      await technologyService.getById(id);

    if (!existingTechnology) {
      return NextResponse.json(
        {
          success: false,
          message: "Technology not found.",
        },
        {
          status: 404,
        }
      );
    }

    await technologyService.delete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Technology deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE /api/technologies/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete technology.",
      },
      {
        status: 500,
      }
    );
  }
}