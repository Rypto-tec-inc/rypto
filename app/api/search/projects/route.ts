import { NextResponse } from 'next/server'
import { projectsData } from '@/data/projects'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json([])
  }

  const results = projectsData.filter(project => 
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.client.toLowerCase().includes(query) ||
    project.categories.some(category => category.toLowerCase().includes(query))
  )

  return NextResponse.json(results)
} 