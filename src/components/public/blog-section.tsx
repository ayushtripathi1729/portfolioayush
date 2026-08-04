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
      relative
      overflow-hidden
      bg-background
      py-28
      "
    >





      {/* Ambient Glow */}

      <div
        className="
        pointer-events-none
        absolute
        right-0
        top-20
        -z-10
        h-96
        w-96
        rounded-full
        bg-primary/10
        blur-3xl
        "
      />








      <div
        className="
        container
        mx-auto
        px-8
        lg:px-16
        "
      >





        <SectionTitle

          title="Blog"

          description="
          Technical writing, notes and engineering explorations.
          "

        />









        <div
          className="
          mt-16
          grid
          gap-8
          md:grid-cols-3
          "
        >





          {
            blogs.map(
              (
                blog,
                index
              ) => (


                <article

                  key={blog.id}

                  className="
                  group
                  flex
                  flex-col
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:shadow-lg
                  "

                >







                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    text-sm
                    text-muted-foreground
                    "
                  >



                    <span
                      className="
                      tracking-[0.3em]
                      text-muted-foreground/50
                      "
                    >

                      {String(index + 1).padStart(2, "0")}

                    </span>





                    {
                      blog.publishedAt && (

                        <span>

                          {
                            new Date(
                              blog.publishedAt
                            ).getFullYear()
                          }

                        </span>

                      )
                    }



                  </div>









                  <h3
                    className="
                    mt-6
                    text-xl
                    font-semibold
                    leading-snug
                    tracking-tight
                    transition
                    group-hover:text-primary
                    "
                  >

                    {blog.title}

                  </h3>









                  {
                    blog.excerpt && (

                      <p
                        className="
                        mt-4
                        line-clamp-3
                        leading-7
                        text-muted-foreground
                        "
                      >

                        {blog.excerpt}

                      </p>

                    )
                  }









                  <div
                    className="
                    mt-auto
                    pt-6
                    flex
                    items-center
                    justify-between
                    "
                  >



                    <span
                      className="
                      text-sm
                      text-muted-foreground
                      "
                    >

                      {blog.author.name}

                    </span>






                    <a

                      href={`/blog/${blog.slug}`}

                      className="
                      rounded-full
                      border
                      px-4
                      py-2
                      text-sm
                      transition
                      hover:bg-muted
                      "

                    >

                      Read

                    </a>



                  </div>







                </article>


              )
            )
          }





        </div>






      </div>







    </section>

  );

}