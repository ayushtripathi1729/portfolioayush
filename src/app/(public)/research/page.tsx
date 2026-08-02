import { portfolioService } from "@/services/portfolio.service";

import { ResearchPageContent } from "@/components/public/research-page-content";




export default async function ResearchPage() {


  const portfolio =
    await portfolioService.getPortfolio();




  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <ResearchPageContent

        research={
          portfolio.research
        }

      />

    </main>

  );

}