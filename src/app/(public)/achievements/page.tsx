import { portfolioService } from "@/services/portfolio.service";

import { AchievementsPageContent } from "@/components/public/achievements-page-content";




export default async function AchievementsPage() {


  const portfolio =
    await portfolioService.getPortfolio();




  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <AchievementsPageContent

        achievements={
          portfolio.achievements
        }

      />

    </main>

  );

}