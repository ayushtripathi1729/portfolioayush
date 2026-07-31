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
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Contact"
        description="Let's connect and discuss opportunities, collaborations or ideas."
      />



      <div className="rounded-xl border p-8">


        <div className="grid gap-6 md:grid-cols-2">


          <div>


            <h3 className="text-xl font-semibold">
              Get in touch
            </h3>


            <div className="mt-4 space-y-2 text-muted-foreground">


              {setting.email && (
                <p>
                  Email: {setting.email}
                </p>
              )}


              {setting.phone && (
                <p>
                  Phone: {setting.phone}
                </p>
              )}


              {setting.location && (
                <p>
                  Location: {setting.location}
                </p>
              )}


            </div>


          </div>





          <div>


            <h3 className="text-xl font-semibold">
              Social Links
            </h3>


            <div className="mt-4 flex flex-wrap gap-3">


              {setting.socialLinks.map(
                (link) => (

                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-4 py-2 text-sm"
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