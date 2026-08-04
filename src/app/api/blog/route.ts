import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  blogService,
} from "@/services/blog.service";


import {
  createBlogSchema,
} from "@/validations/blog.schema";


import {
  requireAuth,
  UnauthorizedError,
} from "@/lib/auth-guard";







export async function GET() {


  try {


    const blogs =
      await blogService.getAll();





    return NextResponse.json(
      {
        success: true,
        data: blogs,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/blog error:",
      error
    );



    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch blogs.",
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





    const body =
      await request.json();





    const validation =
      createBlogSchema.safeParse({

        ...body,

        authorId:
          session.user.id,

      });





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
          status:400,
        }
      );


    }









    const blog =
      await blogService.create(
        validation.data
      );








    return NextResponse.json(
      {
        success:true,
        data:blog,
      },
      {
        status:201,
      }
    );



  } catch(error) {


    if(
      error instanceof UnauthorizedError
    ) {


      return NextResponse.json(
        {
          success:false,
          message:
            "Unauthorized.",
        },
        {
          status:401,
        }
      );


    }







    console.error(
      "POST /api/blog error:",
      error
    );







    return NextResponse.json(
      {
        success:false,
        message:
          "Failed to create blog.",
      },
      {
        status:500,
      }
    );


  }

}