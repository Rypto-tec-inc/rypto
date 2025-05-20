import { NextResponse } from 'next/server'

type GalleryItem = {
  id: string
  title: string
  description: string
  image: string
  type: 'image' | 'video'
  videoUrl?: string
  category: string
  creator: {
    name: string
    role: string
    image: string
    profileUrl: string
  }
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "3D Product Visualization",
    description: "Immersive 3D visualization of our latest product designs",
    image: "/gallary/3d-product.jpg",
    type: "image",
    category: "3D Animation",
    creator: {
      name: "Victor Edet Coleman",
      role: "Lead Developer & 3D Artist",
      image: "/Team/victor.jpg",
      profileUrl: "/team"
    }
  },
  {
    id: "2",
    title: "VR Experience",
    description: "Virtual reality showcase of our architectural designs",
    image: "/gallary/vr-experience.jpg",
    type: "video",
    videoUrl: "/gallary/vr-experience.mp4",
    category: "VR/AR",
    creator: {
      name: "Victor Edet Coleman",
      role: "Lead Developer & 3D Artist",
      image: "/Team/victor.jpg",
      profileUrl: "/team"
    }
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json([])
  }

  const results = galleryItems.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    item.creator.name.toLowerCase().includes(query) ||
    item.creator.role.toLowerCase().includes(query)
  )

  return NextResponse.json(results)
} 