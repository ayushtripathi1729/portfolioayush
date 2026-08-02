export interface PortfolioData {

  setting: PortfolioSetting | null;

  skills: Skill[];

  skillCategories: SkillCategory[];

  projects: Project[];

  experiences: Experience[];

  education: Education[];

  research: Research[];

  achievements: Achievement[];

  blogs: Blog[];

}






export interface PortfolioSetting {

  id: string;

  siteTitle: string;

  siteDescription: string | null;

  fullName: string;

  tagline: string | null;

  bio: string | null;

  about: string | null;

  email: string | null;

  phone: string | null;

  location: string | null;


  profileImage: Asset | null;
  aboutImage: Asset | null;

  ogImage: Asset | null;

  favicon: Asset | null;

  resume: Asset | null;


  socialLinks: SocialLink[];

}






export interface Asset {

  id: string;

  fileName: string;

  originalName: string;

  url: string;

  mimeType: string;

  type: string;

  extension: string | null;

  size: number;

  width: number | null;

  height: number | null;

  altText: string | null;

  uploadedAt?: Date;

}





export interface SocialLink {

  id: string;

  platform: string;

  label: string | null;

  url: string;

  username: string | null;

}






export interface SkillCategory {

  id: string;

  name: string;

  slug: string;

  description: string | null;

  featured: boolean;

  skills: Skill[];

}






export interface Skill {

  id: string;

  name: string;

  level: string;

  icon: string | null;

  featured: boolean;

}






export interface Project {

  id: string;

  title: string;

  slug: string;

  shortDescription: string;

  description: string;


  githubUrl: string | null;

  liveUrl: string | null;


  featured: boolean;


  category: {

    id: string;

    name: string;

  };


  technologies: {

    technology: {

      id: string;

      name: string;

      icon: string | null;

    };

  }[];


  assets: {

    id: string;

    caption: string | null;

    isThumbnail: boolean;

    displayOrder: number;

    asset: Asset;

  }[];

}






export interface Experience {

  id: string;

  company: string;

  position: string;

  employmentType: string | null;

  location: string | null;


  startDate: Date;

  endDate: Date | null;


  isCurrent: boolean;

  featured: boolean;


  description: string;


  companyLogo: Asset | null;

}






export interface Education {

  id: string;

  institution: string;

  degree: string;

  branch: string | null;

  location: string | null;


  startDate: Date;

  endDate: Date | null;


  isCurrent: boolean;


  gradeType: string;

  gradeValue: string;


  description: string | null;


  institutionLogo: Asset | null;

}






export interface Research {

  id: string;

  title: string;

  slug: string;


  abstract: string | null;


  publisher: string | null;

  journal: string | null;

  doi: string | null;


  externalUrl: string | null;


  publishedAt: Date | null;


  featured: boolean;


  coverImage: Asset | null;

  pdfAsset: Asset | null;

}






export interface Achievement {

  id: string;


  title: string;


  description: string | null;


  category: string | null;


  issuer: string | null;


  issueDate: Date | null;


  credentialUrl: string | null;


  featured: boolean;


  image: Asset | null;

}






export interface Blog {

  id: string;


  title: string;


  slug: string;


  excerpt: string | null;


  content: string;


  publishedAt: Date | null;


  featured: boolean;


  coverImage: Asset | null;


  author: {

    name: string;

  };

}