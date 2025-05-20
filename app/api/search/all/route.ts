import { NextResponse } from 'next/server'

interface SearchItem {
  id: string
  title: string
  description: string
  url: string
  image: string
  type: 'gallery' | 'team' | 'content' | 'service' | 'about' | 'project'
  tags?: string[]
  category?: string
  date?: string
  priority?: number
}

// Team data
const teamMembers: SearchItem[] = [
  {
    id: "1",
    title: "Victor Edet Coleman",
    description: "CEO & Founder",
    url: "/team/victor",
    image: "/Team/victor.jpg",
    type: "team",
    tags: ["Leadership", "Software Development", "3D Animation"],
    priority: 1
  }
]

// Gallery data
const galleryItems: SearchItem[] = [
  {
    id: "1",
    title: "3D Product Visualization",
    description: "Immersive 3D visualization of our latest product designs",
    url: "/gallery/3d-product",
    image: "/gallary/3d-product.jpg",
    type: "gallery",
    tags: ["3D", "Product", "Visualization"],
    category: "3D Animation",
    date: "2024-03-15"
  },
  {
    id: "2",
    title: "VR Experience",
    description: "Virtual reality showcase of our architectural designs",
    url: "/gallery/vr-experience",
    image: "/gallary/vr-experience.jpg",
    type: "gallery",
    tags: ["VR", "Architecture", "Experience"],
    category: "VR/AR",
    date: "2024-03-10"
  }
]

// Projects data
const projects: SearchItem[] = [
  {
    id: "proj-1",
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    url: "/projects/ecommerce",
    image: "/main/1312223.jpeg",
    type: "project",
    tags: ["Web Development", "E-commerce", "React"],
    category: "Web Development",
    date: "2024-02-20"
  }
]

// Services data
const services: SearchItem[] = [
  {
    id: "software-development",
    title: "Software Development",
    description: "Custom software solutions for businesses of all sizes",
    url: "/services#software-development",
    image: "/main/1312223.jpeg",
    type: "service",
    tags: ["Development", "Custom Solutions", "Business"],
    category: "Development",
    priority: 1
  },
  {
    id: "3d-animation",
    title: "3D Animation",
    description: "High-quality 3D animations and visualizations",
    url: "/services#3d-animation",
    image: "/main/y.jpg",
    type: "service",
    tags: ["Animation", "3D", "Visualization"],
    category: "Creative",
    priority: 2
  }
]

// About sections
const aboutSections: SearchItem[] = [
  {
    id: "mission",
    title: "Our Mission",
    description: "Building Africa's Digital Future through innovative technology solutions",
    url: "/about#mission",
    image: "/main/cyberpunkcity.jpg",
    type: "about",
    tags: ["Mission", "Vision", "Company"],
    priority: 1
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const type = searchParams.get('type')?.toLowerCase()
  const category = searchParams.get('category')?.toLowerCase()
  const tag = searchParams.get('tag')?.toLowerCase()

  if (!query) {
    return NextResponse.json([])
  }

  // Combine all searchable items
  const allItems = [
    ...galleryItems,
    ...teamMembers,
    ...projects,
    ...services,
    ...aboutSections
  ]
  
  // Apply filters
  let filteredItems = allItems
  
  if (type) {
    filteredItems = filteredItems.filter(item => item.type === type)
  }
  
  if (category) {
    filteredItems = filteredItems.filter(item => 
      item.category?.toLowerCase() === category
    )
  }
  
  if (tag) {
    filteredItems = filteredItems.filter(item => 
      item.tags?.some(t => t.toLowerCase() === tag)
    )
  }

  // Search with improved algorithm
  const results = filteredItems.filter(item => {
    const searchableText = [
      item.title,
      item.description,
      ...(item.tags || []),
      item.category
    ].join(' ').toLowerCase()
    
    return searchableText.includes(query)
  })

  // Calculate relevance score with more factors
  const scoredResults = results.map(item => ({
    ...item,
    score: calculateRelevanceScore(item, query)
  }))

  // Sort by relevance and priority
  scoredResults.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (b.priority || 0) - (a.priority || 0)
  })

  return NextResponse.json(scoredResults)
}

function calculateRelevanceScore(item: SearchItem, query: string): number {
  let score = 0
  const queryWords = query.split(' ')
  
  // Title matches
  if (item.title.toLowerCase().includes(query)) {
    score += 3
  }
  
  // Description matches
  if (item.description.toLowerCase().includes(query)) {
    score += 2
  }
  
  // Tag matches
  item.tags?.forEach(tag => {
    if (tag.toLowerCase().includes(query)) {
      score += 2
    }
  })
  
  // Category matches
  if (item.category?.toLowerCase().includes(query)) {
    score += 1.5
  }
  
  // Exact matches get bonus points
  if (item.title.toLowerCase() === query) {
    score += 4
  }
  
  // Word-by-word matching
  queryWords.forEach(word => {
    if (item.title.toLowerCase().includes(word)) score += 1
    if (item.description.toLowerCase().includes(word)) score += 0.5
    if (item.tags?.some(tag => tag.toLowerCase().includes(word))) score += 0.75
  })
  
  // Priority boost
  if (item.priority) {
    score += item.priority
  }
  
  return score
} 