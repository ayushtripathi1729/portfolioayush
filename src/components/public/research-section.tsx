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
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Research"
        description="Research work, publications and technical investigations."
      />



      <div className="grid gap-8 md:grid-cols-2">


        {research.map((item) => (

          <article
            key={item.id}
            className="rounded-xl border p-6"
          >


            <h3 className="text-2xl font-semibold">
              {item.title}
            </h3>



            {item.publisher && (

              <p className="mt-2 text-sm text-muted-foreground">
                {item.publisher}
              </p>

            )}



            {item.journal && (

              <p className="text-sm text-muted-foreground">
                {item.journal}
              </p>

            )}




            {item.abstract && (

              <p className="mt-5 leading-7 text-muted-foreground">
                {item.abstract}
              </p>

            )}




            <div className="mt-6 flex flex-wrap gap-3">


              {item.externalUrl && (

                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  View Publication
                </a>

              )}




              {item.pdfAsset && (

                <a
                  href={item.pdfAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
                >
                  PDF
                </a>

              )}


            </div>



          </article>

        ))}


      </div>


    </section>
  );
}