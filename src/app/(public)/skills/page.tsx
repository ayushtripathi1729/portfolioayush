import { portfolioService } from "@/services/portfolio.service";

import { SkillsPageContent } from "@/components/public/skills-page-content";



export default async function SkillsPage() {


  const portfolio =
    await portfolioService.getPortfolio();



  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <SkillsPageContent
        categories={
          portfolio.skillCategories
        }
      />

    </main>

  );

}