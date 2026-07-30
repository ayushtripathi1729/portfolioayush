import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BlogForm } from "@/components/admin/blog/blog-form";


export default function NewBlogPage() {

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
              Create Blog
            </h1>

          </div>


          <p className="mt-2 text-muted-foreground">
            Create a new blog post.
          </p>

        </div>


      </section>





      <BlogForm />


    </div>
  );
}