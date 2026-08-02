import { portfolioService } from "@/services/portfolio.service";

import { BlogPageContent } from "@/components/public/blog-page-content";



export default async function BlogPage() {


  const portfolio =
    await portfolioService.getPortfolio();



  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <BlogPageContent

        blogs={
          portfolio.blogs
        }

      />

    </main>

  );

}