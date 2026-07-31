import Image from "next/image";

import type { PortfolioSetting } from "@/types/portfolio";


interface HeroSectionProps {
  setting: PortfolioSetting | null;
}



export function HeroSection({
  setting,
}: HeroSectionProps) {


  if (!setting) {
    return null;
  }



  return (
    <section className="container mx-auto px-6 py-20">

      <div className="grid items-center gap-12 md:grid-cols-2">


        <div className="space-y-6">


          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Computer Science Engineer
          </p>



          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">

            {setting.fullName}

          </h1>



          {setting.tagline && (

            <p className="text-xl text-muted-foreground">

              {setting.tagline}

            </p>

          )}




          {setting.bio && (

            <p className="max-w-xl leading-7 text-muted-foreground">

              {setting.bio}

            </p>

          )}




          <div className="flex flex-wrap gap-4">


            {setting.resume && (

              <a
                href={setting.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
              >
                View Resume
              </a>

            )}



            {setting.socialLinks.map(
              (link) => (

                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-6 py-3"
                >
                  {link.label ?? link.platform}
                </a>

              )
            )}


          </div>


        </div>





        <div className="flex justify-center">


          {setting.profileImage ? (

            <Image
              src={setting.profileImage.url}
              alt={
                setting.profileImage.altText ??
                setting.fullName
              }
              width={400}
              height={400}
              className="rounded-2xl object-cover"
            />

          ) : (

            <div className="flex h-80 w-80 items-center justify-center rounded-2xl border text-muted-foreground">
              No Image
            </div>

          )}


        </div>



      </div>

    </section>
  );
}