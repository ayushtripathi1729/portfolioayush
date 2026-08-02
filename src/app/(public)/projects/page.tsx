import { portfolioService } from "@/services/portfolio.service";

import { ProjectsPageContent } from "@/components/public/projects-page-content";



export default async function ProjectsPage() {


  const portfolio =
    await portfolioService.getPortfolio();




  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >


      <ProjectsPageContent

        projects={
          portfolio.projects
        }

      />


    </main>

  );

}