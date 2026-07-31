import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  blogService,
} from "@/services/blog.service";


import {
  updateBlogSchema,
} from "@/validations/blog.schema";


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





    const blog =
      await blogService.getById(id);





    if (!blog) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found.",
        },
        {
          status: 404,
        }
      );


    }







    return NextResponse.json(
      {
        success: true,
        data: blog,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    console.error(
      "GET /api/blog/[id] error:",
      error
    );



    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch blog.",
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





    const existingBlog =
      await blogService.getById(id);





    if (!existingBlog) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found.",
        },
        {
          status: 404,
        }
      );


    }







    const body =
      await request.json();





    const validation =
      updateBlogSchema.safeParse(
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








    const blog =
      await blogService.update(
        id,
        validation.data
      );








    await logActivity({

      action:
        "UPDATE",

      entity:
        "Blog",

      entityId:
        blog.id,

      description:
        `Updated blog: ${blog.title}`,

    });







    return NextResponse.json(
      {
        success: true,
        data: blog,
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
      "PUT /api/blog/[id] error:",
      error
    );






    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update blog.",
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





    const existingBlog =
      await blogService.getById(id);





    if (!existingBlog) {


      return NextResponse.json(
        {
          success: false,
          message:
            "Blog not found.",
        },
        {
          status: 404,
        }
      );


    }








    await blogService.delete(id);








    await logActivity({

      action:
        "DELETE",

      entity:
        "Blog",

      entityId:
        id,

      description:
        `Deleted blog: ${existingBlog.title}`,

    });







    return NextResponse.json(
      {
        success: true,
        message:
          "Blog deleted successfully.",
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
      "DELETE /api/blog/[id] error:",
      error
    );







    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete blog.",
      },
      {
        status: 500,
      }
    );


  }

}