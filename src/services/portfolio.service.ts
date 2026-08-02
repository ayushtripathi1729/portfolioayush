import { portfolioRepository } from "@/repositories/portfolio.repository";

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





  private transformPortfolio(
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


    const portfolio =
      await portfolioRepository.getPortfolio();



    return this.transformPortfolio(
      portfolio
    );


  }









  async getHomepagePortfolio(): Promise<PortfolioData> {


    const portfolio =
      await portfolioRepository.getHomepagePortfolio();



    return this.transformPortfolio(
      portfolio
    );


  }





}








export const portfolioService =
  new PortfolioService();