import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { portfolioService } from "@/services/portfolio.service";

import { BlogDetailContent } from "@/components/public/blog-detail-content";





interface BlogDetailPageProps {

  params: Promise<{
    slug: string;
  }>;

}







export async function generateStaticParams() {


  const portfolio =
    await portfolioService.getPortfolio();




  return portfolio.blogs.map(

    (blog) => ({

      slug: blog.slug,

    })

  );


}









export async function generateMetadata({

  params,

}: BlogDetailPageProps): Promise<Metadata> {



  const {
    slug,
  } = await params;





  const portfolio =
    await portfolioService.getPortfolio();





  const blog =
    portfolio.blogs.find(

      item =>
        item.slug === slug

    );





  if (!blog) {

    return {};

  }





  return {

    title:
      `${blog.title} | Blog`,

    description:
      blog.excerpt ??
      blog.title,

    openGraph: {

      title:
        blog.title,

      description:
        blog.excerpt ??
        "",


      images:

        blog.coverImage

          ? [
              {
                url:
                  blog.coverImage.url,
              },
            ]

          : [],

    },

  };

}









export default async function BlogDetailPage({

  params,

}: BlogDetailPageProps) {



  const {
    slug,
  } = await params;







  const portfolio =
    await portfolioService.getPortfolio();







  const blog =
    portfolio.blogs.find(

      item =>
        item.slug === slug

    );







  if (!blog) {

    notFound();

  }








  return (

    <main

      className="
      min-h-screen
      bg-background
      "

    >

      <BlogDetailContent

        blog={
          blog
        }

      />

    </main>

  );

}