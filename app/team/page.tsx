"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Twitter, Linkedin, Github, Mail } from "lucide-react"
import Image from "next/image"
import { SVGDecoration } from "@/components/svg-decorations"

// Team data
const teamMembers = [
  {
    id: 1,
    name: "Victor Edet Coleman",
    role: "Founder & CEO",
    bio: "A visionary technologist with a passion for leveraging technology to solve African challenges. Victor founded RYPTO TEC INC with the goal of building a digital ecosystem that empowers Liberians and Africans to lead in global tech innovation.",
    image: "/team/Victor_ceo.jpg",
    social: {
      email: "colemanvictor25@gmail.com",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Lead Developer",
    bio: "With over 8 years of experience in software development, Sarah leads our engineering team with expertise in full-stack development, cloud architecture, and AI integration.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "sarah@example.com",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 3,
    name: "Michael Kamara",
    role: "3D Visualization Expert",
    bio: "Michael specializes in architectural visualization and 3D modeling, bringing spaces and concepts to life through immersive digital experiences.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "michael@example.com",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Amara Diallo",
    role: "UX/UI Designer",
    bio: "Amara combines artistic vision with user-centered design principles to create intuitive and engaging digital interfaces that prioritize the user experience.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      email: "amara@example.com",
      linkedin: "#",
      twitter: "#",
    },
  },
]

export default function TeamPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary relative overflow-hidden">
        <SVGDecoration type="dots" className="absolute top-0 right-0 opacity-20" />
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Meet the talented individuals behind RYPTO TEC INC who are driving innovation and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 relative">
        <SVGDecoration type="circles" className="absolute bottom-0 left-0 opacity-10" />
        <div className="container mx-auto px-4">
          {/* Founder Spotlight */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="text-sm text-muted-foreground mb-2">LEADERSHIP</div>
              <h2 className="heading-lg mb-4">Founder & CEO</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="mt-6 space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="mt-6">
                      <Skeleton className="h-10 w-40" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold mb-2">Victor Edet Coleman</h3>
                    <p className="text-muted-foreground mb-6">Founder & CEO</p>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        A visionary technologist with a passion for leveraging technology to solve African challenges.
                        Victor founded RYPTO TEC INC with the goal of building a digital ecosystem that empowers
                        Liberians and Africans to lead in global tech innovation.
                      </p>
                      <p>
                        With expertise in software development, 3D visualization, and immersive technologies, Victor is
                        leading RYPTO's mission to create transformative digital experiences that serve communities and
                        raise the standard of African innovation on a global scale.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <a
                        href="mailto:colemanvictor25@gmail.com"
                        className="p-2 rounded-full border hover:bg-accent transition-colors"
                        aria-label="Email Victor Coleman"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full border hover:bg-accent transition-colors"
                        aria-label="Victor Coleman's LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full border hover:bg-accent transition-colors"
                        aria-label="Victor Coleman's Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full border hover:bg-accent transition-colors"
                        aria-label="Victor Coleman's GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </>
                )}
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                {loading ? (
                  <Skeleton className="w-64 h-64 md:w-80 md:h-80" />
                ) : (
                  <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden  border-foreground">
                    <Image
                      src={teamMembers[0].image || "/placeholder.svg"}
                      alt="Victor Edet Coleman"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="text-center mb-16">
              <div className="text-sm text-muted-foreground mb-2">OUR EXPERTS</div>
              <h2 className="heading-lg mb-4">Meet the Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of experts brings together skills in software engineering, 3D visualization, UX/UI
                design, and more to deliver exceptional digital solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <div className="flex flex-col items-center text-center">
                        <Skeleton className="w-32 h-32 mb-6" />
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-4" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <div className="flex gap-3">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="w-8 h-8 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))
                : teamMembers.slice(1).map((member) => (
                    <div key={member.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 overflow-hidden mb-6">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="text-primary mb-4">{member.role}</p>
                        <p className="text-muted-foreground mb-6">{member.bio}</p>
                        <div className="flex gap-3">
                          {member.social.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="p-2 rounded-full border hover:bg-accent transition-colors"
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              className="p-2 rounded-full border hover:bg-accent transition-colors"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              className="p-2 rounded-full border hover:bg-accent transition-colors"
                              aria-label={`${member.name}'s Twitter`}
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              className="p-2 rounded-full border hover:bg-accent transition-colors"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-16 bg-muted relative">
        <SVGDecoration type="grid" className="absolute top-0 right-0 opacity-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4">Team Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team working together to build innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="aspect-square w-full" />)
            ) : (
              <>
                {teamMembers.map((member) => (
                  <div key={member.id} className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold">{member.name}</h3>
                      <p className="text-white/80 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
                {/* Additional placeholder images */}
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`placeholder-${index}`} className="aspect-square relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Team member"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="bg-foreground text-background py-16 relative">
        <SVGDecoration type="waves" className="absolute bottom-0 left-0 opacity-10" color="white" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            We're always looking for talented individuals who are passionate about technology and innovation. Check out
            our open positions or send us your resume.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </>
  )
}
