import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Careers - RYPTO TEC INC",
  description: "Join our team of innovators and creators at RYPTO TEC",
}

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for an experienced frontend developer with expertise in React, Next.js, and modern web technologies to join our growing team.",
    },
    {
      id: 2,
      title: "3D Animator",
      department: "Creative",
      location: "Hybrid",
      type: "Full-time",
      description:
        "Join our creative team to create stunning 3D animations and visual effects for various client projects and internal products.",
    },
    {
      id: 3,
      title: "AI Research Engineer",
      department: "R&D",
      location: "Remote",
      type: "Full-time",
      description:
        "Help us push the boundaries of AI integration in our products by researching and implementing cutting-edge machine learning solutions.",
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      description:
        "Create intuitive and beautiful user experiences for web and mobile applications across various industries and use cases.",
    },
  ]

  return (
    <div className="container py-12 md:py-20">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Join Our Team</h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          At RYPTO TEC, we're building a team of passionate innovators who are excited about creating impactful
          technology solutions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-16">
        {openPositions.map((position) => (
          <Card key={position.id} className="border-border/10 hover:border-border/30 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{position.title}</CardTitle>
                <Badge variant="outline">{position.type}</Badge>
              </div>
              <CardDescription className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center text-sm">{position.department}</span>
                <span className="inline-flex items-center text-sm">• {position.location}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{position.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Why Join RYPTO TEC?</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Work on cutting-edge projects across various industries</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Flexible work arrangements with remote and hybrid options</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Competitive compensation and benefits package</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Continuous learning and professional development opportunities</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Collaborative and inclusive company culture</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Hiring Process</h2>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <div>
                <p className="font-medium">Application Review</p>
                <p className="text-sm text-muted-foreground">
                  We review your resume, portfolio, and application materials.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <div>
                <p className="font-medium">Initial Interview</p>
                <p className="text-sm text-muted-foreground">
                  A conversation with our HR team to discuss your experience and expectations.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <div>
                <p className="font-medium">Technical Assessment</p>
                <p className="text-sm text-muted-foreground">
                  A role-specific assessment to evaluate your skills and problem-solving abilities.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <div>
                <p className="font-medium">Team Interview</p>
                <p className="text-sm text-muted-foreground">
                  Meet with potential team members and discuss technical aspects of the role.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              <div>
                <p className="font-medium">Final Interview</p>
                <p className="text-sm text-muted-foreground">
                  A conversation with leadership to ensure mutual alignment.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">
            Don't see a position that matches your skills? We're always looking for talented individuals.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
