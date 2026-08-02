import Image from "next/image";
import Link from "next/link";

import {
  ExternalLink,
  FileText,
} from "lucide-react";

import type { Research } from "@/types/portfolio";




interface ResearchPageContentProps {

  research: Research[];

}







export function ResearchPageContent({
  research,
}: ResearchPageContentProps) {



  if (!research.length) {

    return null;

  }






  const featuredResearch =
    research.filter(
      item =>
        item.featured
    );






  const otherResearch =
    research.filter(
      item =>
        !item.featured
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
          text-violet-600
          "

        >

          Research

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

          Exploring ideas,
          <br />

          building knowledge
          <span
            className="
            text-violet-600
            "
          >
            {" "}and discoveries.
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

          Research work, technical investigations
          and publications exploring computer science,
          artificial intelligence and emerging technologies.

        </p>



      </section>









      {/* FEATURED */}



      {
        featuredResearch.length > 0 && (

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

              Featured Research

            </h2>







            <div

              className="
              space-y-10
              "

            >



              {
                featuredResearch.map(
                  item => (

                    <ResearchCard

                      key={
                        item.id
                      }

                      research={
                        item
                      }

                      featured

                    />

                  )
                )
              }



            </div>



          </section>

        )
      }









      {/* ALL RESEARCH */}



      {
        otherResearch.length > 0 && (

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

                Publications

              </h2>







              <div

                className="
                grid
                gap-8
                md:grid-cols-2
                "

              >



                {
                  otherResearch.map(
                    item => (

                      <ResearchCard

                        key={
                          item.id
                        }

                        research={
                          item
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









function ResearchCard({

  research,

  featured = false,

}: {

  research: Research;

  featured?: boolean;

}) {



  return (

    <article

      className={`

      overflow-hidden
      rounded-3xl
      border
      bg-card
      transition
      hover:shadow-xl

      ${featured ? "grid lg:grid-cols-2" : ""}

      `}

    >







      {
        research.coverImage && (

          <div

            className="
            relative
            aspect-video
            overflow-hidden
            bg-muted
            "

          >


            <Image

              src={
                research.coverImage.url
              }

              alt={
                research.coverImage.altText ??
                research.title
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
        p-8
        "

      >





        <p

          className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-violet-600
          "

        >

          Research Paper

        </p>







        <Link

          href={
            `/research/${research.slug}`
          }

        >


          <h3

            className="
            mt-4
            text-2xl
            font-semibold
            transition
            hover:text-violet-600
            "

          >

            {research.title}

          </h3>


        </Link>









        {
          research.abstract && (

            <p

              className="
              mt-4
              leading-7
              text-muted-foreground
              "

            >

              {research.abstract}

            </p>

          )
        }









        <div

          className="
          mt-6
          space-y-2
          text-sm
          text-muted-foreground
          "

        >



          {
            research.publisher && (

              <p>
                Publisher: {research.publisher}
              </p>

            )
          }






          {
            research.journal && (

              <p>
                Journal: {research.journal}
              </p>

            )
          }






          {
            research.doi && (

              <p>
                DOI: {research.doi}
              </p>

            )
          }



        </div>









        <div

          className="
          mt-8
          flex
          flex-wrap
          gap-4
          "

        >



          {
            research.pdfAsset && (

              <Link

                href={
                  research.pdfAsset.url
                }

                target="_blank"

                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                px-4
                py-2
                text-sm
                hover:bg-muted
                "

              >

                <FileText
                  className="size-4"
                />

                Read PDF

              </Link>

            )
          }







          {
            research.externalUrl && (

              <Link

                href={
                  research.externalUrl
                }

                target="_blank"

                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-foreground
                px-4
                py-2
                text-sm
                text-background
                "

              >

                <ExternalLink
                  className="size-4"
                />

                View Publication

              </Link>

            )
          }





        </div>





      </div>





    </article>

  );

}