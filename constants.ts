
import { Project, Service, Testimonial, SiteConfig, BlogPost } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  companyName: "HanifGold Luxury Tiling",
  phone: "+234 800 123 4567",
  email: "contact@hanifgold.com",
  address: "15 Victoria Island Blvd, Lagos, Nigeria",
  whatsappNumber: "2348001234567",
  instagramUrl: "#",
  facebookUrl: "#",
  tiktokUrl: "#",
  aboutText: "HanifGold Luxury Tiling Services is the premier provider of exquisite floor and wall solutions in Lagos, Ibadan, and Ogun State. With over a decade of experience, we transform spaces into masterpieces using the finest Italian and Spanish materials.",
  missionStatement: "To deliver perfection in every square inch, ensuring durability meets luxury.",
  primaryColor: "#C59D24",
  logoUrl: ""
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    title: "Italian Marble Installation",
    shortDescription: "Timeless elegance for your living spaces with premium imported marble.",
    fullDescription: "Our Italian Marble installation service is designed for those who appreciate the finer things in life. We source the highest grade Carrera and Calacatta marble, ensuring perfect vein matching and zero-lippage installation.",
    imageUrl: "https://images.unsplash.com/photo-1618221639263-1655d59d901f?q=80&w=1000&auto=format&fit=crop",
    features: ["Precision Cutting", "Vein Matching", "Polishing & Sealing"]
  },
  {
    id: "2",
    title: "Spanish Porcelain",
    shortDescription: "Durability meets modern aesthetics with high-grade Spanish tiles.",
    fullDescription: "Spanish Porcelain offers the perfect blend of rugged durability and sleek modern design. Ideal for high-traffic areas, these tiles are resistant to scratches and stains while providing a stunning finish.",
    imageUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1000&auto=format&fit=crop",
    features: ["Heavy Traffic Rated", "Large Format Options", "Stain Resistant"]
  },
  {
    id: "3",
    title: "Bathroom Redesign",
    shortDescription: "Transform your bathroom into a personal spa sanctuary.",
    fullDescription: "We specialize in complete bathroom wet-area tiling. From waterproofing to the final grout line, we ensure your bathroom is not only beautiful but completely water-tight and functional.",
    imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop",
    features: ["Waterproofing", "Mosaic Accents", "Non-slip Options"]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lekki Phase 1 Penthouse",
    category: "Residential",
    location: "Lekki, Lagos",
    description: "Complete floor overhaul using 120x120 High Gloss White Granite. The result is a seamless, mirror-like finish that expands the visual space of the apartment.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    date: "2023-11-15"
  },
  {
    id: "p2",
    title: "Ibadan Boutique Hotel",
    category: "Commercial",
    location: "Bodija, Ibadan",
    description: "Lobby and reception tiling featuring intricate mosaic patterns and durable hallway styling for high footfall.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    date: "2023-09-20"
  },
  {
    id: "p3",
    title: "Abeokuta Country Home",
    category: "Outdoor",
    location: "Abeokuta, Ogun",
    description: "Outdoor patio and pool deck tiling using non-slip, weather-resistant natural stone textures.",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
    date: "2023-08-05"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Chief Mrs. Adebayo",
    role: "Homeowner, Victoria Island",
    content: "The attention to detail HanifGold showed was impeccable. My living room looks like a palace now.",
    rating: 5
  },
  {
    id: "t2",
    clientName: "Mr. Johnson",
    role: "Developer, Ibadan",
    content: "Professional, on time, and within budget. Best tilers in the South West.",
    rating: 5
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Top 5 Trends in Luxury Tiling for 2024",
    excerpt: "Discover what's hot in the world of high-end flooring, from large format porcelain to sustainable natural stone.",
    content: "The world of luxury tiling is ever-evolving. This year, we are seeing a massive shift towards large format tiles that minimize grout lines, creating a seamless, expansive look. Additionally, biophilic designs that mimic natural textures like wood and stone are in high demand across Lagos luxury apartments...",
    imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop",
    date: "2024-01-10",
    author: "HanifGold Team",
    status: 'published',
    category: 'Trends'
  },
  {
    id: "b2",
    title: "Maintaining Your Italian Marble Floors",
    excerpt: "A comprehensive guide to keeping your marble surfaces pristine and polished for decades.",
    content: "Italian Marble is an investment in timeless beauty. However, it requires specific care to maintain its luster. Avoid acidic cleaners like lemon or vinegar, as they can etch the surface. Instead, use pH-neutral cleaners and ensure you seal your floors annually to prevent staining...",
    imageUrl: "https://images.unsplash.com/photo-1599690940578-8fc5668e1a6c?q=80&w=1000&auto=format&fit=crop",
    date: "2024-02-15",
    author: "HanifGold Team",
    status: 'published',
    category: 'Maintenance'
  }
];