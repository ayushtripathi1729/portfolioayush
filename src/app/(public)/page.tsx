import { portfolioService } from "@/services/portfolio.service";

import { HeroSection } from "@/components/public/hero-section";
import { SkillsSection } from "@/components/public/skills-section";
import { ProjectsSection } from "@/components/public/projects-section";
import { ExperienceSection } from "@/components/public/experience-section";
import { EducationSection } from "@/components/public/education-section";
import { ResearchSection } from "@/components/public/research-section";
import { AchievementsSection } from "@/components/public/achievements-section";
import { BlogSection } from "@/components/public/blog-section";
import { ContactSection } from "@/components/public/contact-section";



export default async function HomePage() {


  const portfolio =
    await portfolioService.getPortfolio();



  return (

    <main className="min-h-screen">


      <HeroSection
        setting={portfolio.setting}
      />



      <SkillsSection
        categories={
          portfolio.skillCategories
        }
      />



      <ProjectsSection
        projects={
          portfolio.projects
        }
      />



      <ExperienceSection
        experiences={
          portfolio.experiences
        }
      />



      <EducationSection
        education={
          portfolio.education
        }
      />



      <ResearchSection
        research={
          portfolio.research
        }
      />



      <AchievementsSection
        achievements={
          portfolio.achievements
        }
      />



      <BlogSection
        blogs={
          portfolio.blogs
        }
      />



      <ContactSection
        setting={
          portfolio.setting
        }
      />


    </main>

  );
}