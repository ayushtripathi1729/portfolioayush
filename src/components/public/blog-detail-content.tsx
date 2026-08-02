import Image from "next/image";

import type { Blog } from "@/types/portfolio";





interface BlogDetailContentProps {

  blog: Blog;

}








export function BlogDetailContent({

  blog,

}: BlogDetailContentProps) {


  return (

    <div
      className="
      bg-background
      "
    >






      {/* HERO */}


      <section

        className="
        max-w-5xl
        mx-auto
        px-8
        pt-32
        pb-16
        "

      >



        <p

          className="
          text-sm
          uppercase
          tracking-[0.4em]
          text-violet-600
          "

        >

          Blog

        </p>







        <h1

          className="
          mt-8
          text-5xl
          font-semibold
          leading-tight
          tracking-tight
          lg:text-7xl
          "

        >

          {blog.title}

        </h1>







        <div

          className="
          mt-8
          flex
          gap-6
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
                      month:"long",
                      day:"numeric",
                    }
                  )
                }

              </span>

            )
          }


        </div>



      </section>









      {/* COVER IMAGE */}



      {
        blog.coverImage && (

          <section

            className="
            max-w-screen-2xl
            mx-auto
            px-8
            "

          >


            <div

              className="
              relative
              aspect-video
              overflow-hidden
              rounded-3xl
              border
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

                priority

                className="
                object-cover
                "

              />


            </div>


          </section>

        )
      }









      {/* CONTENT */}



      <article

        className="
        max-w-4xl
        mx-auto
        px-8
        py-32
        "

      >



        <div

          className="
          whitespace-pre-line
          text-lg
          leading-9
          text-muted-foreground
          "

        >

          {blog.content}

        </div>



      </article>







    </div>

  );

}