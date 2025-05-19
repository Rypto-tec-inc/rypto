import type { Metadata } from "next"
import { FadeInOnScroll, ParallaxOnScroll } from "@/components/scroll-animations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid3X3, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Team | RYPTO TEC INC",
  description: "Meet the talented individuals behind RYPTO TEC and our products.",
}

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  team: "company" | "product"
  product?: string
  bio: string
  skills: string[]
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

// Mock data for team members
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
    },
  },
  {
    id: "2",
    name: "Sarah Okafor",
    role: "CTO",
    department: "Engineering",
    team: "company",
    bio: "Technical visionary with expertise in scalable architecture and emerging technologies.",
    skills: ["System Architecture", "AI/ML", "Cloud Infrastructure"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "3",
    name: "David Mensah",
    role: "Lead Developer",
    department: "Engineering",
    team: "product",
    product: "FinTech Suite",
    bio: "Full-stack developer specializing in financial technology solutions.",
    skills: ["React", "Node.js", "Financial Systems"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "4",
    name: "Amina Diallo",
    role: "UX/UI Lead",
    department: "Design",
    team: "company",
    bio: "Creative designer focused on crafting intuitive and accessible user experiences.",
    skills: ["UI Design", "User Research", "Prototyping"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "5",
    name: "Kwame Adu",
    role: "Product Manager",
    department: "Product",
    team: "product",
    product: "EdTech Platform",
    bio: "Strategic product leader with passion for educational technology.",
    skills: ["Product Strategy", "Agile", "Market Research"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "6",
    name: "Fatima Nkosi",
    role: "Data Scientist",
    department: "Engineering",
    team: "product",
    product: "Analytics Dashboard",
    bio: "Data expert specializing in predictive analytics and machine learning models.",
    skills: ["Python", "Machine Learning", "Data Visualization"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "7",
    name: "Omar Sy",
    role: "DevOps Engineer",
    department: "Engineering",
    team: "company",
    bio: "Infrastructure specialist focused on automation and continuous deployment.",
    skills: ["Kubernetes", "CI/CD", "Cloud Architecture"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "8",
    name: "Zainab Ahmed",
    role: "Marketing Director",
    department: "Marketing",
    team: "company",
    bio: "Strategic marketer with expertise in digital campaigns and brand development.",
    skills: ["Digital Marketing", "Brand Strategy", "Content Creation"],
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
]

export default function TeamPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <FadeInOnScroll>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the talented individuals engineering Africa's digital future at RYPTO TEC.
          </p>
        </div>
      </FadeInOnScroll>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <TabsList className="mb-4 md:mb-0">
            <TabsTrigger value="all">All Teams</TabsTrigger>
            <TabsTrigger value="company">Company Team</TabsTrigger>
            <TabsTrigger value="product">Product Teams</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search by name, role, or skill..." className="pl-10" />
            </div>

            <div className="flex gap-2">
              <Select defaultValue="department">
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="role">Role</SelectItem>
                  <SelectItem value="skills">Skills</SelectItem>
                  {/* For product teams */}
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md overflow-hidden">
                <Button variant="ghost" size="icon" className="rounded-none border-r">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="company" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers
              .filter((member) => member.team === "company")
              .map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="product" className="mt-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Product Teams</h2>
            <p className="text-muted-foreground">
              Our specialized teams working on cutting-edge products across various domains.
            </p>
          </div>

          {/* Group by product */}
          {Array.from(new Set(teamMembers.filter((m) => m.team === "product").map((m) => m.product))).map((product) => (
            <div key={product} className="mb-12">
              <ParallaxOnScroll>
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b">{product}</h3>
              </ParallaxOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teamMembers
                  .filter((member) => member.team === "product" && member.product === product)
                  .map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <FadeInOnScroll>
        <div className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about technology and innovation in Africa.
          </p>
          <Button size="lg" asChild>
            <a href="/careers">View Open Positions</a>
          </Button>
        </div>
      </FadeInOnScroll>
    </main>
  )
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <FadeInOnScroll>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square overflow-hidden relative">
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover" />
            <AvatarFallback className="rounded-none text-4xl">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {member.team === "product" && member.product && (
            <Badge className="absolute top-3 right-3 bg-primary/80 hover:bg-primary">{member.product}</Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle>{member.name}</CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <span>{member.role}</span>
            <span className="text-xs text-muted-foreground">{member.department}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {member.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex gap-2">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            )}
            {member.social.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            )}
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            View Profile
          </Button>
        </CardFooter>
      </Card>
    </FadeInOnScroll>
  )
}
