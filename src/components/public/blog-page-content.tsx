import Image from "next/image";
import Link from "next/link";

import type { Blog } from "@/types/portfolio";




interface BlogPageContentProps {

  blogs: Blog[];

}








export function BlogPageContent({

  blogs,

}: BlogPageContentProps) {



  if (!blogs.length) {

    return null;

  }






  const featuredBlogs =

    blogs.filter(

      blog => blog.featured

    );






  const normalBlogs =

    blogs.filter(

      blog => !blog.featured

    );








  return (

    <div
      className="
      bg-background
      "
    >







      {/* HERO */}


      <section

        className="
        max-w-screen-2xl
        mx-auto
        px-8
        pt-32
        pb-24
        lg:px-16
        "

      >



        <p

          className="
          text-sm
          uppercase
          tracking-[0.4em]
          text-primary
          "

        >

          Blog

        </p>







        <h1

          className="
          mt-8
          max-w-none
          text-5xl
          font-semibold
          tracking-tight
          leading-[1.05]
          lg:text-8xl
          "

        >

          Thoughts,
          <br />

          experiments
          <span
            className="
            text-primary
            "
          >
            {" "}and ideas.
          </span>


        </h1>







        <p

          className="
          mt-10
          max-w-4xl
          text-xl
          leading-9
          text-muted-foreground
          "

        >

          Articles about computer science,
          programming, cybersecurity, artificial
          intelligence and things I learn while building.

        </p>



      </section>









      {/* FEATURED BLOGS */}



      {
        featuredBlogs.length > 0 && (

          <section

            className="
            max-w-screen-2xl
            mx-auto
            px-8
            pb-20
            lg:px-16
            "

          >



            <h2

              className="
              mb-10
              text-3xl
              font-semibold
              "

            >

              Featured Articles

            </h2>







            <div

              className="
              grid
              gap-8
              lg:grid-cols-3
              "

            >



              {
                featuredBlogs.map(

                  blog => (

                    <BlogCard

                      key={
                        blog.id
                      }

                      blog={
                        blog
                      }

                    />

                  )

                )
              }



            </div>



          </section>

        )
      }









      {/* ALL BLOGS */}



      {
        normalBlogs.length > 0 && (

          <section

            className="
            border-y
            bg-muted/20
            "

          >



            <div

              className="
              max-w-screen-2xl
              mx-auto
              px-8
              py-24
              lg:px-16
              "

            >



              <h2

                className="
                mb-10
                text-3xl
                font-semibold
                "

              >

                Latest Articles

              </h2>







              <div

                className="
                grid
                gap-8
                md:grid-cols-2
                "

              >



                {
                  normalBlogs.map(

                    blog => (

                      <BlogCard

                        key={
                          blog.id
                        }

                        blog={
                          blog
                        }

                      />

                    )

                  )
                }



              </div>



            </div>



          </section>

        )
      }







    </div>

  );

}









function BlogCard({

  blog,

}: {

  blog: Blog;

}) {



  return (

    <article

      className="
      overflow-hidden
      rounded-3xl
      border
      bg-card
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "

    >





      {
        blog.coverImage && (

          <div

            className="
            relative
            aspect-video
            "

          >


            <Image

              src={
                blog.coverImage.url
              }

              alt={

                blog.coverImage.altText ??

                blog.title

              }

              fill

              className="
              object-cover
              "

            />


          </div>

        )
      }








      <div

        className="
        p-6
        "

      >




        <Link

          href={
            `/blog/${blog.slug}`
          }

        >


          <h3

            className="
            text-2xl
            font-semibold
            transition
            hover:text-primary
            "

          >

            {blog.title}

          </h3>


        </Link>








        {
          blog.excerpt && (

            <p

              className="
              mt-4
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
          mt-6
          flex
          items-center
          justify-between
          text-sm
          text-muted-foreground
          "

        >



          <span>

            {blog.author.name}

          </span>





          {
            blog.publishedAt && (

              <span>

                {
                  new Date(
                    blog.publishedAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      year:"numeric",
                      month:"short",
                    }
                  )
                }

              </span>

            )
          }





        </div>





      </div>





    </article>

  );

}