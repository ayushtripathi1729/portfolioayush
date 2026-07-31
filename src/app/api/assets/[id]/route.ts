import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  assetService,
} from "@/services/asset.service";


import {
  updateAssetSchema,
} from "@/validations/asset.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  logActivity,
} from "@/lib/activity";





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


    const { id } =
      await params;





    const asset =
      await assetService.getById(id);





    if (!asset) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Asset not found.",
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
        message:
          "Failed to fetch asset.",
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


    await requireAuth();





    const { id } =
      await params;





    const existingAsset =
      await assetService.getById(id);





    if (!existingAsset) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Asset not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateAssetSchema.safeParse(
        body
      );





    if (!validation.success) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Validation failed.",
          errors:
            validation.error.flatten(),
        },
        {
          status: 400,
        }
      );


    }








    const asset =
      await assetService.update(
        id,
        validation.data
      );








    await logActivity({

      action:
        "UPDATE",

      entity:
        "Asset",

      entityId:
        asset.id,

      description:
        `Updated asset: ${asset.originalName}`,

    });







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


    if (
      error instanceof UnauthorizedError
    ) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );


    }







    console.error(
      "PUT /api/assets/[id] error:",
      error
    );






    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update asset.",
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


    await requireAuth();





    const { id } =
      await params;





    const existingAsset =
      await assetService.getById(id);





    if (!existingAsset) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Asset not found.",
        },
        {
          status: 404,
        }
      );


    }








    await assetService.delete(id);







    await logActivity({

      action:
        "DELETE",

      entity:
        "Asset",

      entityId:
        id,

      description:
        `Deleted asset: ${existingAsset.originalName}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Asset deleted successfully.",
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    if (
      error instanceof UnauthorizedError
    ) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );


    }







    console.error(
      "DELETE /api/assets/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete asset.",
      },
      {
        status: 500,
      }
    );


  }

}