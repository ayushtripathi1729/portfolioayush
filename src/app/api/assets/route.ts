import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  assetService,
} from "@/services/asset.service";


import {
  createAssetSchema,
} from "@/validations/asset.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";


import {
  logActivity,
} from "@/lib/activity";








export async function GET() {


  try {


    const assets =
      await assetService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: assets,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/assets error:",
      error
    );



    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch assets.",
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


    await requireAuth();





    const body =
      await request.json();





    const validation =
      createAssetSchema.safeParse(
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
      await assetService.create(
        validation.data
      );








    await logActivity({

      action:
        "UPLOAD",

      entity:
        "Asset",

      entityId:
        asset.id,

      description:
        `Uploaded asset: ${asset.originalName}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: asset,
      },
      {
        status: 201,
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
      "POST /api/assets error:",
      error
    );






    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create asset.",
      },
      {
        status: 500,
      }
    );


  }

}