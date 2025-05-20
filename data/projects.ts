export type Project = {
  id: string
  title: string
  description: string
  client: string
  year: number
  categories: string[]
  image: string
  featured: boolean
  url?: string
}

export const projectsData: Project[] = [
  {
    id: "orange-dsm",
    title: "Orange DSM Website",
    description: "A modern website for Orange DSM, featuring responsive design and interactive elements.",
    client: "Orange DSM",
    year: 2024,
    categories: ["Web Development", "UI/UX Design"],
    image: "/work/orange-dsm.jpg",
    featured: true,
    url: "/work/orange-dsm"
  },
  {
    id: "liberia-tech-hub",
    title: "Liberia Tech Hub Platform",
    description: "A comprehensive platform for Liberia Tech Hub, connecting tech professionals and opportunities.",
    client: "Liberia Tech Hub",
    year: 2024,
    categories: ["Web Development", "Platform"],
    image: "/work/liberia-tech-hub.jpg",
    featured: true,
    url: "/work/liberia-tech-hub"
  },
  {
    id: "3d-product-visualization",
    title: "3D Product Visualization",
    description: "Immersive 3D product visualization for enhanced customer experience.",
    client: "Various Clients",
    year: 2024,
    categories: ["3D Animation", "Visualization"],
    image: "/work/3d-product.jpg",
    featured: true,
    url: "/work/3d-product"
  },
  {
    id: "educational-vr",
    title: "Educational VR Platform",
    description: "Virtual reality platform for interactive educational experiences.",
    client: "Educational Institutions",
    year: 2024,
    categories: ["VR/AR", "Education"],
    image: "/work/educational-vr.jpg",
    featured: true,
    url: "/work/educational-vr"
  },
  {
    id: "zig-insurance",
    title: "Zig Insurance Platform",
    description: "Comprehensive insurance platform with advanced features and analytics.",
    client: "Zig Insurance",
    year: 2024,
    categories: ["Software Development", "Insurance"],
    image: "/work/zig-insurance.jpg",
    featured: true,
    url: "/work/zig-insurance"
  },
  {
    id: "smart-city-dashboard",
    title: "Smart City Dashboard",
    description: "Real-time dashboard for monitoring and managing smart city infrastructure.",
    client: "City Government",
    year: 2024,
    categories: ["Software Development", "IoT"],
    image: "/work/smart-city.jpg",
    featured: true,
    url: "/work/smart-city"
  }
] 