import { portfolioService } from "@/services/portfolio.service";

import { AboutPageContent } from "@/components/public/about-page-content";



export const metadata = {
  title: "About | Ayush Tripathi",
  description:
    "Learn more about Ayush Tripathi, a Computer Science engineer passionate about algorithms, cybersecurity, artificial intelligence and building impactful systems.",
};





export default async function AboutPage() {


  const portfolio =
    await portfolioService.getPortfolio();





  if (!portfolio.setting) {

    return (

      <main
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        "
      >

        <p
          className="
          text-muted-foreground
          "
        >
          Portfolio information is not available.
        </p>


      </main>

    );

  }






  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <AboutPageContent
        setting={
          portfolio.setting
        }
      />

    </main>

  );

}