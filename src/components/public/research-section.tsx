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

          title="Research"

          description="
          Research work, publications and technical investigations.
          "

        />









        <div
          className="
          mt-16
          grid
          gap-8
          "
        >








          {
            research.map(
              (item, index) => (


                <article

                  key={item.id}

                  className="
                  group
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  p-10
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
                    flex-col
                    gap-8
                    md:flex-row
                    md:justify-between
                    "
                  >








                    {/* CONTENT */}



                    <div
                      className="
                      space-y-6
                      "
                    >





                      <div>


                        <span
                          className="
                          text-sm
                          tracking-[0.3em]
                          text-muted-foreground/50
                          "
                        >

                          {String(index + 1).padStart(2, "0")}

                        </span>







                        <h3
                          className="
                          mt-4
                          text-3xl
                          font-semibold
                          tracking-tight
                          transition
                          group-hover:text-primary
                          "
                        >

                          {item.title}

                        </h3>



                      </div>









                      <div
                        className="
                        flex
                        flex-wrap
                        gap-x-4
                        text-sm
                        text-muted-foreground
                        "
                      >



                        {
                          item.publisher && (

                            <span>
                              {item.publisher}
                            </span>

                          )
                        }






                        {
                          item.journal && (

                            <span>
                              • {item.journal}
                            </span>

                          )
                        }






                        {
                          item.publishedAt && (

                            <span>
                              • {item.publishedAt.getFullYear()}
                            </span>

                          )
                        }




                      </div>









                      {
                        item.abstract && (

                          <p
                            className="
                            max-w-3xl
                            leading-8
                            text-muted-foreground
                            "
                          >

                            {item.abstract}

                          </p>

                        )
                      }









                      <div
                        className="
                        flex
                        flex-wrap
                        gap-4
                        pt-3
                        "
                      >








                        {
                          item.externalUrl && (

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

                              Publication

                            </a>

                          )
                        }









                        {
                          item.pdfAsset && (

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

                          )
                        }







                      </div>







                    </div>









                    {/* DATE */}



                    <div
                      className="
                      text-sm
                      text-muted-foreground
                      md:text-right
                      "
                    >



                      {
                        item.publishedAt && (

                          <p>
                            {item.publishedAt.getFullYear()}
                          </p>

                        )
                      }



                    </div>








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