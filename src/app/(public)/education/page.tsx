import { portfolioService } from "@/services/portfolio.service";

import { EducationPageContent } from "@/components/public/education-page-content";




export default async function EducationPage() {


  const portfolio =
    await portfolioService.getPortfolio();




  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <EducationPageContent

        education={
          portfolio.education
        }

      />

    </main>

  );

}