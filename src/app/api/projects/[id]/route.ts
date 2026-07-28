import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { projectService } from "@/services/project.service";
import { updateProjectSchema } from "@/validations/project.schema";

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

    const project = await projectService.getById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/projects/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project.",
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

    const existingProject =
      await projectService.getById(id);

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const validation =
      updateProjectSchema.safeParse(body);

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

    const project = await projectService.update(
      id,
      validation.data
    );

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/projects/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project.",
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

    const existingProject =
      await projectService.getById(id);

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    await projectService.delete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE /api/projects/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project.",
      },
      {
        status: 500,
      }
    );
  }
}