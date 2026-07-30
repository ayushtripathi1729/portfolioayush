"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteBlogButton } from "@/components/admin/blog/delete-blog-button";


interface BlogTableProps {
  blogs: Array<{
    id: string;
    title: string;
    slug: string;
    published: boolean;
    featured: boolean;
    visible: boolean;
    publishedAt: Date | null;
    author?: {
      name?: string | null;
      email?: string | null;
    } | null;
  }>;
}



export function BlogTable({
  blogs,
}: BlogTableProps) {


  return (
    <div className="overflow-x-auto rounded-xl border">


      <table className="w-full text-sm">


        <thead className="border-b bg-muted/50">

          <tr>

            <th className="px-4 py-3 text-left">
              Title
            </th>


            <th className="px-4 py-3 text-left">
              Author
            </th>


            <th className="px-4 py-3 text-left">
              Status
            </th>


            <th className="px-4 py-3 text-left">
              Featured
            </th>


            <th className="px-4 py-3 text-right">
              Actions
            </th>

          </tr>

        </thead>





        <tbody>

          {blogs.map((blog) => (

            <tr
              key={blog.id}
              className="border-b last:border-none"
            >


              <td className="px-4 py-3">

                <div className="font-medium">
                  {blog.title}
                </div>


                <div className="text-xs text-muted-foreground">
                  {blog.slug}
                </div>

              </td>





              <td className="px-4 py-3">

                {blog.author?.name ??
                  blog.author?.email ??
                  "Unknown"}

              </td>





              <td className="px-4 py-3">

                <span className="rounded-full border px-2 py-1 text-xs">

                  {blog.published
                    ? "Published"
                    : "Draft"}

                </span>

              </td>





              <td className="px-4 py-3">

                {blog.featured
                  ? "Yes"
                  : "No"}

              </td>





              <td className="px-4 py-3 text-right">


                <div className="flex justify-end gap-2">


                  <Link
                    href={`/admin/blog/${blog.id}/edit`}
                  >

                    <Button
                      size="icon"
                      variant="outline"
                    >

                      <Pencil className="size-4" />

                    </Button>

                  </Link>





                  <DeleteBlogButton
                    id={blog.id}
                  />


                </div>


              </td>


            </tr>

          ))}

        </tbody>


      </table>


    </div>
  );
}