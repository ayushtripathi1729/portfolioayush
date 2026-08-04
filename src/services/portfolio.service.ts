import { portfolioRepository } from "@/repositories/portfolio.repository";
import { cache } from "react";

import type { PortfolioData } from "@/types/portfolio";





type RawPortfolioData = {

  setting: unknown;

  skills: unknown[];

  skillCategories: unknown[];

  projects: unknown[];

  experiences: unknown[];

  education: Array<{
    gradeValue: {
      toString(): string;
    };

    [key: string]: unknown;
  }>;

  research: unknown[];

  achievements: unknown[];

  blogs: unknown[];

};









export class PortfolioService {





  transformPortfolio(
    portfolio: RawPortfolioData
  ): PortfolioData {


    return {

      ...portfolio,


      education:
        portfolio.education.map(
          (item) => ({

            ...item,

            gradeValue:
              item.gradeValue.toString(),

          })
        ),


    } as PortfolioData;


  }









  async getPortfolio(): Promise<PortfolioData> {
    return getPortfolio();


  }









  async getHomepagePortfolio(): Promise<PortfolioData> {
    return getHomepagePortfolio();


  }





}








export const portfolioService =
  new PortfolioService();

// React deduplicates these server-side reads within a render. This prevents the
// public layout's metadata and page tree from issuing identical database work.
const getPortfolio = cache(async (): Promise<PortfolioData> => {
  const portfolio = await portfolioRepository.getPortfolio();
  return portfolioService.transformPortfolio(portfolio);
});

const getHomepagePortfolio = cache(async (): Promise<PortfolioData> => {
  const portfolio = await portfolioRepository.getHomepagePortfolio();
  return portfolioService.transformPortfolio(portfolio);
});
