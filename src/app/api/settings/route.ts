import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { settingService } from "@/services/setting.service";
import { updateSettingSchema } from "@/validations/setting.schema";

export async function GET() {
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

    const setting =
      await settingService.getByUserId(
        session.user.id
      );

    if (!setting) {
      return NextResponse.json(
        {
          success: false,
          message: "Settings not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: setting,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/settings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest
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

    const body = await request.json();

    const validation =
      updateSettingSchema.safeParse(body);

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

    const setting =
      await settingService.updateByUserId(
        session.user.id,
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: setting,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/settings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings.",
      },
      {
        status: 500,
      }
    );
  }
}