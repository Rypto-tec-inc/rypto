import { NextResponse } from 'next/server'

type TeamMember = {
  id: string
  name: string
  role: string
  department: string
  team: string
  bio: string
  skills: string[]
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Victor Edet Coleman",
    role: "CEO & Founder",
    department: "Software Engineering & 3D Animation",
    team: "company",
    bio: "Visionary leader and full-stack developer with expertise in software engineering and 3D animation. Leading RYPTO TEC's mission to build innovative solutions for Africa's digital future.",
    skills: ["Software Development", "3D Animation", "Leadership", "VR/AR", "Web Development"],
    image: "/Team/victor.jpg",
    social: {
      linkedin: "https://linkedin.com/in/victoredetcoleman",
      twitter: "https://twitter.com/victorecoleman",
      github: "https://github.com/victoredetcoleman"
    }
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json([])
  }

  const results = teamMembers.filter(member => 
    member.name.toLowerCase().includes(query) ||
    member.role.toLowerCase().includes(query) ||
    member.department.toLowerCase().includes(query) ||
    member.bio.toLowerCase().includes(query) ||
    member.skills.some(skill => skill.toLowerCase().includes(query))
  )

  return NextResponse.json(results)
} 