import type { PortfolioSetting } from "@/types/portfolio";

import { SectionTitle } from "./section-title";



interface ContactSectionProps {
  setting: PortfolioSetting | null;
}





export function ContactSection({
  setting,
}: ContactSectionProps) {


  if (!setting) {
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
        left-1/2
        top-20
        -z-10
        h-96
        w-96
        -translate-x-1/2
        rounded-full
        bg-violet-500/10
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

          title="Contact"

          description="
          Let's connect, collaborate and discuss interesting ideas.
          "

        />









        <div
          className="
          mt-16
          grid
          gap-12
          rounded-3xl
          border
          border-border
          bg-card
          p-10
          md:grid-cols-2
          lg:p-14
          "
        >








          {/* LEFT */}

          <div
            className="
            space-y-8
            "
          >





            <h3
              className="
              text-4xl
              font-semibold
              tracking-tight
              "
            >

              Let&apos; build something meaningful.

            </h3>








            <p
              className="
              max-w-xl
              leading-8
              text-muted-foreground
              "
            >

              Open to opportunities, collaborations,
              research discussions and challenging
              technical problems.

            </p>








            <div
              className="
              space-y-3
              text-muted-foreground
              "
            >




              {
                setting.email && (

                  <p>
                    {setting.email}
                  </p>

                )
              }







              {
                setting.location && (

                  <p>
                    {setting.location}
                  </p>

                )
              }







            </div>









            {
              setting.email && (

                <a

                  href={`mailto:${setting.email}`}

                  className="
                  inline-flex
                  rounded-full
                  bg-foreground
                  px-7
                  py-3
                  text-sm
                  font-medium
                  text-background
                  transition
                  hover:scale-105
                  "

                >

                  Send Email

                </a>

              )
            }





          </div>









          {/* RIGHT */}


          <div
            className="
            flex
            items-center
            md:justify-end
            "
          >





            <div
              className="
              space-y-6
              "
            >





              <p
                className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-muted-foreground
                "
              >

                Connect

              </p>









              <div
                className="
                flex
                flex-wrap
                gap-3
                "
              >






                {
                  setting.socialLinks.map(
                    (link) => (


                      <a

                        key={link.id}

                        href={link.url}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="
                        rounded-full
                        border
                        border-border
                        px-6
                        py-2.5
                        text-sm
                        transition
                        hover:border-violet-400
                        hover:bg-muted
                        "

                      >

                        {link.label ?? link.platform}

                      </a>


                    )
                  )
                }






              </div>






            </div>





          </div>






        </div>






      </div>







    </section>

  );

}