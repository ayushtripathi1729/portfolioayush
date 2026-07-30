import Link from "next/link";
import { FileText } from "lucide-react";

import { blogService } from "@/services/blog.service";
import { Button } from "@/components/ui/button";
import { BlogTable } from "@/components/admin/blog/blog-table";


export default async function BlogAdminPage() {

  const blogs =
    await blogService.getAll();



  return (
    <div className="space-y-8">


      <section className="flex items-center justify-between">


        <div className="flex items-center gap-3">

          <FileText className="size-8 text-primary" />


          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Blog
            </h1>


            <p className="text-muted-foreground">
              Manage your blog posts.
            </p>

          </div>

        </div>





        <Link href="/admin/blog/new">

          <Button>
            Create Blog
          </Button>

        </Link>


      </section>







      {blogs.length === 0 ? (

        <div className="rounded-xl border p-6 text-muted-foreground">

          No blog posts found.

        </div>

      ) : (

        <BlogTable
          blogs={blogs}
        />

      )}


    </div>
  );
}