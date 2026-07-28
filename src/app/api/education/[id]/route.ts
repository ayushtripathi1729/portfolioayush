import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { educationService } from "@/services/education.service";
import { updateEducationSchema } from "@/validations/education.schema";

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

    const education =
      await educationService.getById(id);

    if (!education) {
      return NextResponse.json(
        {
          success: false,
          message: "Education record not found.",
        },
        {
          status: 404,
        }
      );
    }

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
      "GET /api/education/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch education record.",
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

    const existingEducation =
      await educationService.getById(id);

    if (!existingEducation) {
      return NextResponse.json(
        {
          success: false,
          message: "Education record not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const validation =
      updateEducationSchema.safeParse(body);

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
      await educationService.update(
        id,
        validation.data
      );

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
      "PUT /api/education/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update education record.",
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

    const existingEducation =
      await educationService.getById(id);

    if (!existingEducation) {
      return NextResponse.json(
        {
          success: false,
          message: "Education record not found.",
        },
        {
          status: 404,
        }
      );
    }

    await educationService.delete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Education record deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE /api/education/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete education record.",
      },
      {
        status: 500,
      }
    );
  }
}