import { portfolioService } from "@/services/portfolio.service";

import { ContactPageContent } from "@/components/public/contact-page-content";




export default async function ContactPage() {


  const portfolio =
    await portfolioService.getPortfolio();




  return (

    <main

      className="
      min-h-screen
      bg-background
      "

    >

      <ContactPageContent

        setting={
          portfolio.setting
        }

        socialLinks={
          portfolio.setting?.socialLinks ?? []
        }

      />

    </main>

  );

}