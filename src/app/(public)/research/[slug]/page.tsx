import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { portfolioService } from "@/services/portfolio.service";

import { ResearchDetailContent } from "@/components/public/research-detail-content";

export const revalidate = 300;



interface ResearchPageProps {

  params: Promise<{
    slug: string;
  }>;

}






export async function generateStaticParams() {


  const portfolio =
    await portfolioService.getPortfolio();



  return portfolio.research.map(
    (research) => ({
      slug: research.slug,
    })
  );


}








export async function generateMetadata(
  {
    params,
  }: ResearchPageProps
): Promise<Metadata> {



  const {
    slug,
  } = await params;




  const portfolio =
    await portfolioService.getPortfolio();





  const research =
    portfolio.research.find(
      item =>
        item.slug === slug
    );





  if (!research) {

    return {};

  }






  return {

    title:
      `${research.title} | Research`,

    description:
      research.abstract ??
      research.title,

    openGraph: {

      title:
        research.title,

      description:
        research.abstract ??
        "",


      images:
        research.coverImage
          ? [
              {
                url:
                  research.coverImage.url,
              },
            ]
          : [],

    },

  };

}








export default async function ResearchDetailPage({
  params,
}: ResearchPageProps) {


  const {
    slug,
  } = await params;





  const portfolio =
    await portfolioService.getPortfolio();





  const research =
    portfolio.research.find(
      item =>
        item.slug === slug
    );






  if (!research) {

    notFound();

  }






  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <ResearchDetailContent

        research={
          research
        }

      />

    </main>

  );

}
