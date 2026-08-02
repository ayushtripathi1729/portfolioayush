import type { ReactNode } from "react";

import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";

import { portfolioService } from "@/services/portfolio.service";



export async function generateMetadata() {


  const portfolio =
    await portfolioService.getPortfolio();



  const setting =
    portfolio.setting;



  return {

    title:
      setting?.siteTitle ??
      "Portfolio",


    description:
      setting?.siteDescription ??
      "",



    icons: {

      icon:
        setting?.favicon?.url ??
        "/favicon.ico",

    },



    openGraph: {

      title:
        setting?.siteTitle ??
        "Portfolio",


      description:
        setting?.siteDescription ??
        "",


      images:

        setting?.ogImage

          ? [
              {
                url:
                  setting.ogImage.url,

                width:
                  setting.ogImage.width ?? 1200,

                height:
                  setting.ogImage.height ?? 630,

                alt:
                  setting.ogImage.altText ??
                  setting.siteTitle,

              },
            ]

          : [],

    },


    twitter: {

      card:
        "summary_large_image",


      images:

        setting?.ogImage
          ? [
              setting.ogImage.url
            ]
          : [],

    },

  };

}







export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {


  return (

    <div
      className="
      min-h-screen
      flex
      flex-col
      "
    >

      <Navbar />


      <main className="flex-1">

        {children}

      </main>


      <Footer />


    </div>

  );

}