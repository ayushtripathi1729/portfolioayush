import { portfolioService } from "@/services/portfolio.service";

import { ExperiencePageContent } from "@/components/public/experience-page-content";




export default async function ExperiencePage() {


  const portfolio =
    await portfolioService.getPortfolio();




  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <ExperiencePageContent

        experiences={
          portfolio.experiences
        }

      />

    </main>

  );

}