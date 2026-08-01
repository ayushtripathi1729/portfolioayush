import type { Research } from "@/types/portfolio";

import { SectionTitle } from "./section-title";


interface ResearchSectionProps {
  research: Research[];
}



export function ResearchSection({
  research,
}: ResearchSectionProps) {


  if (!research.length) {
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
        title="Research"
        description="Research work, publications and technical investigations."
      />







      <div
        className="
        mt-16
        space-y-12
        "
      >



        {research.map((item, index) => (


          <article
            key={item.id}
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
                {item.title}
              </h3>






              <div
                className="
                flex
                flex-wrap
                gap-x-4
                text-sm
                text-muted-foreground
                "
              >


                {item.publisher && (

                  <span>
                    {item.publisher}
                  </span>

                )}



                {item.journal && (

                  <span>
                    • {item.journal}
                  </span>

                )}



                {item.publishedAt && (

                  <span>
                    • {item.publishedAt.getFullYear()}
                  </span>

                )}



              </div>








              {item.abstract && (

                <p
                  className="
                  max-w-3xl
                  whitespace-pre-line
                  leading-8
                  text-muted-foreground
                  "
                >
                  {item.abstract}
                </p>

              )}








              <div
                className="
                flex
                flex-wrap
                gap-4
                pt-3
                "
              >



                {item.externalUrl && (

                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    rounded-full
                    border
                    px-6
                    py-2.5
                    text-sm
                    transition
                    hover:bg-muted
                    "
                  >
                    View Publication
                  </a>

                )}





                {item.pdfAsset && (

                  <a
                    href={item.pdfAsset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    rounded-full
                    bg-foreground
                    px-6
                    py-2.5
                    text-sm
                    text-background
                    transition
                    hover:opacity-80
                    "
                  >
                    PDF
                  </a>

                )}



              </div>



            </div>









            {/* DATE */}



            <div
              className="
              text-sm
              text-muted-foreground
              lg:text-right
              "
            >

              {item.publishedAt
                ? item.publishedAt.getFullYear()
                : ""
              }


            </div>





          </article>


        ))}



      </div>



    </section>
  );
}