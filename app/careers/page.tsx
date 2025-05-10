"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Briefcase, CheckCircle, Code, Database, Globe, Layers, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popup } from "@/components/ui/popup"

export default function CareersPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      name: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "React", level: "Expert" },
        { name: "Next.js", level: "Expert" },
        { name: "TypeScript", level: "Expert" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "JavaScript", level: "Expert" },
        { name: "HTML/CSS", level: "Expert" },
        { name: "Redux", level: "Advanced" },
        { name: "Framer Motion", level: "Advanced" },
        { name: "Responsive Design", level: "Expert" },
        { name: "Web Accessibility", level: "Advanced" },
      ],
    },
    {
      name: "Backend Development",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "Node.js", level: "Expert" },
        { name: "Express", level: "Expert" },
        { name: "MongoDB", level: "Advanced" },
        { name: "PostgreSQL", level: "Advanced" },
        { name: "GraphQL", level: "Advanced" },
        { name: "REST API Design", level: "Expert" },
        { name: "Authentication/Authorization", level: "Expert" },
        { name: "Serverless Functions", level: "Advanced" },
        { name: "Microservices", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
      ],
    },
    {
      name: "3D and Animation",
      icon: <Layers className="h-6 w-6" />,
      skills: [
        { name: "Three.js", level: "Expert" },
        { name: "WebGL", level: "Advanced" },
        { name: "Blender", level: "Expert" },
        { name: "3D Modeling", level: "Advanced" },
        { name: "Animation", level: "Expert" },
        { name: "Texturing", level: "Advanced" },
        { name: "Rigging", level: "Intermediate" },
        { name: "Lighting", level: "Advanced" },
        { name: "Rendering", level: "Advanced" },
        { name: "Motion Graphics", level: "Expert" },
      ],
    },
    {
      name: "VR/AR Development",
      icon: <Smartphone className="h-6 w-6" />,
      skills: [
        { name: "Unity", level: "Advanced" },
        { name: "A-Frame", level: "Expert" },
        { name: "WebXR", level: "Expert" },
        { name: "AR.js", level: "Advanced" },
        { name: "Oculus SDK", level: "Advanced" },
        { name: "ARKit/ARCore", level: "Advanced" },
        { name: "3D Interaction Design", level: "Expert" },
        { name: "Spatial Computing", level: "Advanced" },
        { name: "VR User Experience", level: "Expert" },
        { name: "Performance Optimization", level: "Advanced" },
      ],
    },
    {
      name: "Web Technologies",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: "Progressive Web Apps", level: "Expert" },
        { name: "Web Performance", level: "Expert" },
        { name: "SEO", level: "Advanced" },
        { name: "Web Security", level: "Advanced" },
        { name: "Cross-Browser Compatibility", level: "Expert" },
        { name: "Responsive Design", level: "Expert" },
        { name: "Web Animations", level: "Expert" },
        { name: "Service Workers", level: "Advanced" },
        { name: "WebSockets", level: "Advanced" },
        { name: "Web Audio/Video", level: "Advanced" },
      ],
    },
  ]

  const benefits = [
    {
      title: "Competitive Salary",
      description: "We offer competitive compensation packages based on experience and skills.",
    },
    {
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision insurance for you and your dependents.",
    },
    {
      title: "Flexible Work",
      description: "Flexible work arrangements including remote and hybrid options for most positions.",
    },
    {
      title: "Professional Development",
      description: "Budget for conferences, courses, and learning resources to support your growth.",
    },
    {
      title: "Paid Time Off",
      description: "Generous vacation policy, paid holidays, and sick leave.",
    },
    {
      title: "Team Events",
      description: "Regular team building activities, social events, and company retreats.",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" title="Join Our Team">
            Join Our Team
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            We're looking for talented individuals who are passionate about technology and innovation to join our
            growing team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg" title={benefit.title}>
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div ref={ref} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight" title="Our Expertise">
              Our Expertise
            </h2>
            <p className="text-muted-foreground">
              At RYPTO TEC INC, we pride ourselves on our diverse range of technical skills and expertise. Here are the
              key areas where our team excels:
            </p>
          </motion.div>

          <Tabs defaultValue={skillCategories[0].name.toLowerCase().replace(/\s+/g, "-")}>
            <TabsList className="flex flex-wrap justify-start mb-6">
              {skillCategories.map((category, index) => (
                <TabsTrigger
                  key={index}
                  value={category.name.toLowerCase().replace(/\s+/g, "-")}
                  className="flex items-center"
                  title={category.name}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category, index) => (
              <TabsContent key={index} value={category.name.toLowerCase().replace(/\s+/g, "-")} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <span className="text-primary">{category.icon}</span>
                        <CardTitle>{category.name} Skills</CardTitle>
                      </div>
                      <CardDescription>
                        Our team's expertise in {category.name.toLowerCase()} technologies and methodologies.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {category.skills.map((skill, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <Badge variant="outline">{skill.level}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-lg bg-muted p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold" title="Interested in joining our team?">
            Interested in joining our team?
          </h2>
          <p className="mx-auto mt-2 max-w-[600px] text-muted-foreground">
            We're always looking for talented individuals to join our team. Send us your resume and let us know how you
            can contribute to RYPTO TEC INC.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Popup
              trigger={
                <Button size="lg">
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
              title="Current Openings"
              size="lg"
            >
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  We're currently building our team in the following areas:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frontend Developer</CardTitle>
                      <Badge>Remote Available</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        We're looking for experienced frontend developers with expertise in React, Next.js, and modern
                        web technologies.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/contact">Apply Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>3D Artist / Animator</CardTitle>
                      <Badge>Hybrid</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        We're seeking talented 3D artists and animators to create immersive digital experiences.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/contact">Apply Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Don't see a perfect match? We're always interested in hearing from talented individuals.
                  </p>
                  <Button asChild>
                    <Link href="/contact">
                      Send Us Your Resume
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Popup>

            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
