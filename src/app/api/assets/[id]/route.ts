import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { assetService } from "@/services/asset.service";
import { updateAssetSchema } from "@/validations/asset.schema";

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

    const asset = await assetService.getById(id);

    if (!asset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: asset,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/assets/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch asset.",
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

    const existingAsset =
      await assetService.getById(id);

    if (!existingAsset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const validation =
      updateAssetSchema.safeParse(body);

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

    const asset = await assetService.update(
      id,
      validation.data
    );

    return NextResponse.json(
      {
        success: true,
        data: asset,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/assets/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update asset.",
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

    const existingAsset =
      await assetService.getById(id);

    if (!existingAsset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found.",
        },
        {
          status: 404,
        }
      );
    }

    await assetService.delete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Asset deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "DELETE /api/assets/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete asset.",
      },
      {
        status: 500,
      }
    );
  }
}