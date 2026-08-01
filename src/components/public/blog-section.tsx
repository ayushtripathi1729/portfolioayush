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
    <section
      className="
      container
      mx-auto
      px-8
      py-28
      lg:px-16
      "
    >



      <SectionTitle
        title="Blog"
        description="Technical writing, notes and engineering explorations."
      />







      <div
        className="
        mt-16
        space-y-12
        "
      >



        {blogs.map((blog, index) => (


          <article
            key={blog.id}
            className="
            grid
            gap-8
            border-b
            pb-12
            lg:grid-cols-[100px_1fr_180px]
            "
          >




            {/* NUMBER */}


            <div
              className="
              text-4xl
              font-light
              text-muted-foreground/40
              "
            >
              {String(index + 1).padStart(2, "0")}
            </div>









            {/* CONTENT */}



            <div
              className="
              space-y-5
              "
            >



              <h3
                className="
                text-3xl
                font-semibold
                tracking-tight
                "
              >
                {blog.title}
              </h3>







              {blog.excerpt && (

                <p
                  className="
                  max-w-3xl
                  leading-8
                  text-muted-foreground
                  "
                >
                  {blog.excerpt}
                </p>

              )}








              <a
                href={`/blog/${blog.slug}`}
                className="
                inline-flex
                rounded-full
                border
                px-6
                py-2.5
                text-sm
                transition
                hover:bg-muted
                "
              >
                Read Article
              </a>



            </div>









            {/* META */}



            <div
              className="
              text-sm
              text-muted-foreground
              lg:text-right
              "
            >


              {blog.publishedAt && (

                <p>
                  {new Date(
                    blog.publishedAt
                  ).getFullYear()}
                </p>

              )}



              <p className="mt-2">
                {blog.author.name}
              </p>


            </div>





          </article>


        ))}



      </div>



    </section>
  );
}