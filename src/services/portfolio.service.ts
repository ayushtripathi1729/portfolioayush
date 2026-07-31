import { portfolioRepository } from "@/repositories/portfolio.repository";

import type { PortfolioData } from "@/types/portfolio";


export class PortfolioService {


  async getPortfolio(): Promise<PortfolioData> {


    const portfolio =
      await portfolioRepository.getPortfolio();



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


}



export const portfolioService =
  new PortfolioService();