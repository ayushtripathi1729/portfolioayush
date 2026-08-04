import Image from "next/image";
import Link from "next/link";

import {
  ExternalLink,
  FileText,
} from "lucide-react";

import type { Research } from "@/types/portfolio";




interface ResearchDetailContentProps {

  research: Research;

}







export function ResearchDetailContent({
  research,
}: ResearchDetailContentProps) {



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
        pb-20
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

          Research Paper

        </p>







        <h1

          className="
          mt-8
          max-w-6xl
          text-5xl
          font-semibold
          tracking-tight
          leading-tight
          lg:text-7xl
          "

        >

          <AccentTitle title={research.title} />

        </h1>







        {
          research.abstract && (

            <p

              className="
              mt-10
              max-w-4xl
              text-xl
              leading-9
              text-muted-foreground
              "

            >

              {research.abstract}

            </p>

          )
        }







        <div

          className="
          mt-10
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
                rel="noopener noreferrer"

                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                px-5
                py-3
                text-sm
                hover:bg-muted
                "

              >

                <FileText
                  className="size-4"
                />

                Read Paper

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
                rel="noopener noreferrer"

                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-foreground
                px-5
                py-3
                text-sm
                text-background
                "

              >

                <ExternalLink
                  className="size-4"
                />

                Publication Link

              </Link>

            )
          }



        </div>





      </section>









      {/* COVER IMAGE */}


      {
        research.coverImage && (

          <section

            className="
            max-w-screen-2xl
            mx-auto
            px-8
            lg:px-16
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
                  research.coverImage.url
                }

                alt={
                  research.coverImage.altText ??
                  research.title
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









      {/* INFORMATION */}



      <section

        className="
        max-w-5xl
        mx-auto
        px-8
        py-32
        "

      >





        <div

          className="
          grid
          gap-6
          md:grid-cols-3
          "

        >





          {
            research.publisher && (

              <InfoCard

                title="Publisher"

                value={
                  research.publisher
                }

              />

            )
          }







          {
            research.journal && (

              <InfoCard

                title="Journal"

                value={
                  research.journal
                }

              />

            )
          }







          {
            research.publishedAt && (

              <InfoCard

                title="Published"

                value={
                  new Date(
                    research.publishedAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      year:"numeric",
                      month:"long",
                    }
                  )
                }

              />

            )
          }



        </div>







        {
          research.doi && (

            <div

              className="
              mt-10
              rounded-2xl
              border
              p-6
              "

            >

              <p

                className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-muted-foreground
                "

              >

                DOI

              </p>


              <p

                className="
                mt-3
                font-medium
                "

              >

                {research.doi}

              </p>


            </div>

          )
        }





      </section>









      {/* PDF VIEWER */}


      {
        research.pdfAsset && (

          <section

            className="
            border-y
            bg-muted/20
            "

          >


            <div

              className="
              max-w-6xl
              mx-auto
              px-8
              py-24
              "

            >


              <h2

                className="
                text-3xl
                font-semibold
                "

              >

                Paper Preview

              </h2>




              <iframe

                src={
                  research.pdfAsset.url
                }

                className="
                mt-8
                h-225
                w-full
                rounded-2xl
                border
                "

                title={
                  research.title
                }

              />


            </div>


          </section>

        )
      }






    </div>

  );

}









function InfoCard({

  title,

  value,

}: {

  title:string;

  value:string;

}) {


  return (

    <div

      className="
      rounded-2xl
      border
      bg-card
      p-5
      "

    >


      <p

        className="
        text-xs
        uppercase
        tracking-[0.3em]
        text-muted-foreground
        "

      >

        {title}

      </p>



      <p

        className="
        mt-3
        font-medium
        "

      >

        {value}

      </p>



    </div>

  );

}

function AccentTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const accent = words.pop();

  return <>{words.join(" ") && `${words.join(" ")} `}<span className="text-primary">{accent}</span></>;
}
