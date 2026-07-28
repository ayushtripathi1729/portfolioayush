import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { settingService } from "@/services/setting.service";
import { socialLinkService } from "@/services/social-link.service";
import { updateSocialLinkSchema } from "@/validations/social-link.schema";

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
    const session =
      await getServerSession(authOptions);

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

    const link =
      await socialLinkService.getById(id);

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "Social link not found.",
        },
        {
          status: 404,
        }
      );
    }

    const setting =
      await settingService.getByUserId(
        session.user.id
      );

    if (!setting || link.settingId !== setting.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden.",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: link,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/social-links/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch social link.",
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
    const session =
      await getServerSession(authOptions);

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

    const existingLink =
      await socialLinkService.getById(id);

    if (!existingLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Social link not found.",
        },
        {
          status: 404,
        }
      );
    }

    const setting =
      await settingService.getByUserId(
        session.user.id
      );

    if (!setting || existingLink.settingId !== setting.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await request.json();

    const validation =
      updateSocialLinkSchema.safeParse(body);

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

    const link =
      await socialLinkService.update(
        id,
        validation.data
      );

    return NextResponse.json(
      {
        success: true,
        data: link,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/social-links/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update social link.",
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
    const session =
      await getServerSession(authOptions);

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

    const existingLink =
      await socialLinkService.getById(id);

    if (!existingLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Social link not found.",
        },
        {
          status: 404,
        }
      );
    }

    const setting =
      await settingService.getByUserId(
        session.user.id
      );

    if (!setting || existingLink.settingId !== setting.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden.",
        },
        {
          status: 403,
        }
      );
    }

    await socialLinkService.delete(id);

    return NextResponse.json(
      {
        success: true,
        message:
          "Social link deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE /api/social-links/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete social link.",
      },
      {
        status: 500,
      }
    );
  }
}