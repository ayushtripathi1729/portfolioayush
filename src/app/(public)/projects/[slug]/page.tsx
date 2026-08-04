import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { portfolioService } from "@/services/portfolio.service";

import { ProjectDetailContent } from "@/components/public/project-detail-content";

export const revalidate = 300;



interface ProjectPageProps {

  params: Promise<{
    slug: string;
  }>;

}





export async function generateStaticParams() {


  const portfolio =
    await portfolioService.getPortfolio();



  return portfolio.projects.map(
    (project) => ({
      slug: project.slug,
    })
  );

}








export async function generateMetadata(
  {
    params,
  }: ProjectPageProps
): Promise<Metadata> {



  const {
    slug,
  } = await params;




  const portfolio =
    await portfolioService.getPortfolio();




  const project =
    portfolio.projects.find(
      (item) =>
        item.slug === slug
    );





  if (!project) {

    return {};

  }






  const thumbnail =
    project.assets.find(
      (item) =>
        item.isThumbnail
    )?.asset;







  return {

    title:
      `${project.title} | Ayush Tripathi`,



    description:
      project.shortDescription,



    openGraph: {

      title:
        project.title,


      description:
        project.shortDescription,


      images:
        thumbnail
          ? [
              {
                url:
                  thumbnail.url,
              },
            ]
          : [],

    },


  };


}








export default async function ProjectPage({
  params,
}: ProjectPageProps) {


  const {
    slug,
  } = await params;





  const portfolio =
    await portfolioService.getPortfolio();






  const project =
    portfolio.projects.find(
      (item) =>
        item.slug === slug
    );






  if (!project) {

    notFound();

  }






  return (

    <main
      className="
      min-h-screen
      bg-background
      "
    >

      <ProjectDetailContent

        project={
          project
        }

      />

    </main>

  );

}
