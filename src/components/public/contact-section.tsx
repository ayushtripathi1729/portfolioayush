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
      container
      mx-auto
      px-8
      py-28
      lg:px-16
      "
    >



      <SectionTitle
        title="Contact"
        description="Let's connect, collaborate and discuss interesting ideas."
      />







      <div
        className="
        mt-16
        grid
        gap-12
        border-b
        pb-16
        md:grid-cols-2
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
            Let&apos;s build something meaningful.
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



            {setting.email && (

              <p>
                {setting.email}
              </p>

            )}



            {setting.location && (

              <p>
                {setting.location}
              </p>

            )}



            {setting.phone && (

              <p>
                {setting.phone}
              </p>

            )}



          </div>



        </div>









        {/* RIGHT */}



        <div
          className="
          md:flex
          md:justify-end
          "
        >



          <div
            className="
            space-y-5
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



              {setting.socialLinks.map(
                (link) => (

                  <a
                    key={link.id}
                    href={link.url}
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
                    {link.label ?? link.platform}
                  </a>

                )
              )}



            </div>



          </div>



        </div>



      </div>





    </section>
  );
}