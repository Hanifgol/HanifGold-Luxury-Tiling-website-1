
export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string; // e.g., "Homeowner, Lekki"
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  status: 'draft' | 'published';
  category: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfig {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  aboutText: string;
  missionStatement: string;
  primaryColor: string; // Hex code
  logoUrl?: string;
}

export interface DataContextType {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  journalEntries: JournalEntry[];
  config: SiteConfig;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addProject: (project: Project) => void;
  updateService: (service: Service) => void;
  updateConfig: (config: SiteConfig) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addJournalEntry: (entry: Partial<JournalEntry>) => Promise<void>;
  updateJournalEntry: (entry: JournalEntry) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
