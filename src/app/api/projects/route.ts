import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { projectService } from "@/services/project.service";
import { createProjectSchema } from "@/validations/project.schema";


async function requireAuth() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return session;
}


export async function GET() {
  try {

    const session =
      await requireAuth();


    if (!session) {
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


    const projects =
      await projectService.getAll();


    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    console.error(
      "GET /api/projects error:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects.",
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
      await requireAuth();


    if (!session) {
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
      createProjectSchema.safeParse(body);


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


    const project =
      await projectService.create(
        validation.data
      );


    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      {
        status: 201,
      }
    );


  } catch (error) {

    console.error(
      "POST /api/projects error:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create project.",
      },
      {
        status: 500,
      }
    );

  }
}