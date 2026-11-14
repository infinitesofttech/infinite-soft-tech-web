export interface BaseItem {
  id: string;
  published: boolean;
}

export interface Service extends BaseItem {
  slug: string;
  title: string;
  category: "Development" | "Enterprise" | "AI & Cloud";
  icon: string;
  short: string;
  description: string;
  features: string[];
  technologies: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Product extends BaseItem {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  short: string;
  description: string;
  features: string[];
  audience: string[];
  status: string;
  link?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Project extends BaseItem {
  title: string;
  client?: string;
  category: string;
  summary: string;
  tags: string[];
  status: string;
  link?: string;
  image?: string;
  accent: "blue" | "violet" | "pink" | "emerald" | "orange";
}

export interface Testimonial extends BaseItem {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface TeamMember extends BaseItem {
  name: string;
  role: string;
  group: "Management" | "Team";
  photo?: string;
  linkedin?: string;
}

export interface InternshipProgram extends BaseItem {
  title: string;
  icon: string;
  duration: string;
  mode: string;
  level: string;
  description: string;
  skills: string[];
}

export interface BlogPost extends BaseItem {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Faq extends BaseItem {
  question: string;
  answer: string;
  category: "General" | "Internship";
}

export interface Client extends BaseItem {
  name: string;
  logo?: string;
  url?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Settings {
  companyName: string;
  tagline: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroWords: string[];
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  mapUrl: string;
  mapEmbedUrl: string;
  hours: string[];
  linkedin: string;
  instagram: string;
  youtube: string;
  facebook: string;
  twitter: string;
  stats: Stat[];
  internshipOpen: boolean;
  announcement: string;
}

export interface CollectionMap {
  services: Service;
  products: Product;
  portfolio: Project;
  internships: InternshipProgram;
  blog: BlogPost;
  team: TeamMember;
  testimonials: Testimonial;
  faqs: Faq;
  clients: Client;
}

export type CollectionKey = keyof CollectionMap;

export type LeadType = "contact" | "quote" | "internship";
export type LeadStatus = "new" | "contacted" | "in-progress" | "converted" | "closed";

export interface Lead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  createdAt: string;
  updatedAt?: string;
  name: string;
  email: string;
  phone: string;
  /** Extra form fields (service, budget, college, program, message...) */
  data: Record<string, string>;
  notes?: string;
  source?: string;
}
