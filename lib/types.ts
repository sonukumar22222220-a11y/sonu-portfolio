export type ProjectCategory =
  | "Video Editing"
  | "Motion Graphics"
  | "YouTube Editing"
  | "Instagram Reels"
  | "Shorts Editing"
  | "Thumbnail Design"
  | "Graphic Design"
  | "Logo Design"
  | "Banner Design"
  | "Social Media Design";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  coverImage: string;
  videoUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  client?: string;
  result?: string;
  software: string[];
  description: string;
  gallery: string[];
  featured: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface AboutContent {
  headline: string;
  bio: string;
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
  skills: { name: string; level: number }[];
}

export interface ContactContent {
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  resumeUrl: string;
}

export interface SiteInfo {
  name: string;
  availabilityBadge: string;
  heroHeadingMain: string;
  heroHeadingAccent: string;
  heroPitch: string;
  footerTagline: string;
}

export interface SiteContent {
  site: SiteInfo;
  about: AboutContent;
  services: Service[];
  testimonials: Testimonial[];
  projects: Project[];
  contact: ContactContent;
}
