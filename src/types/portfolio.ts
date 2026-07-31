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
  email: string | null;
  phone: string | null;
  location: string | null;

  profileImage?: Asset | null;

  resume?: Asset | null;

  socialLinks: SocialLink[];
}


export interface Asset {
  id: string;
  url: string;
  originalName: string;
  altText: string | null;
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
  description: string | null;
  skills: Skill[];
}


export interface Skill {
  id: string;
  name: string;
  level: string;
  icon: string | null;
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

  description: string;

  companyLogo?: Asset | null;
}



export interface Education {
  id: string;

  institution: string;

  degree: string;

  branch: string | null;

  location: string | null;

  startDate: Date;

  endDate: Date | null;

  gradeType: string;

  gradeValue: string;

  description: string | null;

  institutionLogo?: Asset | null;
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

  coverImage?: Asset | null;

  pdfAsset?: Asset | null;
}



export interface Achievement {
  id: string;

  title: string;

  description: string | null;

  category: string | null;

  issuer: string | null;

  issueDate: Date | null;

  credentialUrl: string | null;

  image?: Asset | null;
}



export interface Blog {
  id: string;

  title: string;

  slug: string;

  excerpt: string | null;

  content: string;

  publishedAt: Date | null;

  featured: boolean;

  coverImage?: Asset | null;

  author: {
    name: string;
  };
}