import type { Blog } from "@/types/portfolio";

import { SectionTitle } from "./section-title";


interface BlogSectionProps {
  blogs: Blog[];
}



export function BlogSection({
  blogs,
}: BlogSectionProps) {


  if (!blogs.length) {
    return null;
  }



  return (
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Blog"
        description="Articles, notes and technical write-ups."
      />



      <div className="grid gap-8 md:grid-cols-2">


        {blogs.map((blog) => (

          <article
            key={blog.id}
            className="rounded-xl border p-6"
          >


            <h3 className="text-2xl font-semibold">
              {blog.title}
            </h3>



            {blog.excerpt && (

              <p className="mt-4 text-muted-foreground">
                {blog.excerpt}
              </p>

            )}




            <div className="mt-5 text-sm text-muted-foreground">

              {blog.publishedAt
                ? new Date(
                    blog.publishedAt
                  ).toLocaleDateString()
                : null}

              {" • "}

              {blog.author.name}

            </div>




            <a
              href={`/blog/${blog.slug}`}
              className="mt-5 inline-block rounded-lg border px-4 py-2 text-sm"
            >
              Read Article
            </a>



          </article>

        ))}


      </div>


    </section>
  );
}