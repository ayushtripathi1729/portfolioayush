import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EditBlogForm } from "@/components/admin/blog/edit-blog-form";
import { blogService } from "@/services/blog.service";


interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {

  const { id } = await params;


  const blog =
    await blogService.getById(id);



  if (!blog) {
    notFound();
  }



  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/blog">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>




        <div>

          <div className="flex items-center gap-3">

            <FileText className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Edit Blog
            </h1>

          </div>



          <p className="mt-2 text-muted-foreground">
            Update your blog post details.
          </p>


        </div>


      </section>







      <EditBlogForm

        blog={{

          id: blog.id,

          title:
            blog.title,

          slug:
            blog.slug,

          excerpt:
            blog.excerpt ?? "",

          content:
            blog.content,

          coverImageId:
            blog.coverImageId ?? "",

          published:
            blog.published,

          publishedAt:
            blog.publishedAt,

          featured:
            blog.featured,

          visible:
            blog.visible,

          displayOrder:
            blog.displayOrder,

        }}

      />


    </div>
  );
}