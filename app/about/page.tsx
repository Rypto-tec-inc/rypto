"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { CheckCircle, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popup } from "@/components/ui/popup"

export default function AboutPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

  const teamMembers = [
    {
      name: "Victor Edet Coleman",
      role: "CEO & Founder",
      bio: "Victor brings a passion for innovation and a deep expertise in software engineering, animation, and emerging technologies. Founded RYPTO TEC INC in 2023 with a vision to transform ideas into impactful solutions.",
      image: "/placeholder.svg?height=400&width=400",
      details: {
        expertise: ["Software Engineering", "3D Animation", "VR/AR Development", "Business Strategy"],
        education: "BSc in Computer Science, MSc in Digital Media",
        experience: "Over 10 years of experience in technology and digital media industries.",
        vision:
          "To create innovative solutions that push the boundaries of what's possible with technology, setting new standards for excellence and creativity.",
      },
    },
    {
      name: "Jane Smith",
      role: "CTO",
      bio: "With over 15 years of experience in software development, Jane leads our technical strategy and innovation.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Michael Johnson",
      role: "Creative Director",
      bio: "Michael oversees all creative aspects of our projects, bringing his extensive background in design and animation.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Sarah Williams",
      role: "Head of VR/AR",
      bio: "Sarah specializes in virtual and augmented reality technologies, pushing the boundaries of immersive experiences.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                  title="About RYPTO TEC INC"
                >
                  About RYPTO TEC INC
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A pioneering Liberian tech company founded in 2023 by Victor Edet Coleman, specializing in software engineering, animation, and emerging technologies across Africa and beyond.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[350px] w-[350px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="RYPTO TEC Office"
                  fill
                  className="object-cover"
                  title="Our office"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-24" ref={ref1}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Story">
                Our Story
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                RYPTO TEC INC was founded in 2023 by Victor Edet Coleman with a vision to transform ideas into
                impactful, real-world solutions that redefine industries and improve lives through digital and
                interactive experiences.
              </p>
            </div>
            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mission" title="Our mission">
                  Mission
                </TabsTrigger>
                <TabsTrigger value="vision" title="Our vision">
                  Vision
                </TabsTrigger>
                <TabsTrigger value="values" title="Our values">
                  Values
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="mt-6 space-y-4 text-left">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p>
                  To create innovative digital solutions that solve real-world problems and enhance human experiences
                  through the seamless integration of technology, design, and creativity.
                </p>
              </TabsContent>
              <TabsContent value="vision" className="mt-6 space-y-4 text-left">
                <h3 className="text-xl font-semibold">Our Vision</h3>
                <p>
                  To be a global leader in creating transformative digital experiences that push the boundaries of
                  what's possible with technology, setting new standards for innovation and excellence.
                </p>
              </TabsContent>
              <TabsContent value="values" className="mt-6 space-y-4 text-left">
                <h3 className="text-xl font-semibold">Our Values</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0" />
                    <span>Innovation: We constantly push boundaries and explore new possibilities.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0" />
                    <span>Excellence: We strive for the highest quality in everything we do.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0" />
                    <span>Collaboration: We believe in the power of teamwork and diverse perspectives.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0" />
                    <span>Integrity: We conduct business with honesty, transparency, and ethical standards.</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 md:py-24 bg-muted/50" ref={ref2}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Technology Stack">
              Our Technology Stack
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We leverage a modern and dynamic tech stack to build scalable, efficient, and user-centric solutions.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Frontend Development",
                items: ["Next.js", "React", "Tailwind CSS", "Vite"],
              },
              {
                title: "Backend Development",
                items: ["Node.js", "Express", "MongoDB", "GraphQL"],
              },
              {
                title: "3D and Animation",
                items: ["Blender", "Three.js", "WebGL", "GSAP"],
              },
              {
                title: "VR/AR Technologies",
                items: ["Unity", "A-Frame", "WebXR", "AR.js"],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle title={category.title}>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          <span title={item}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24" ref={ref3}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center rounded-full bg-muted px-3 py-1 text-sm">
              <Users className="mr-2 h-4 w-4" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Meet Our Team">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Our talented team of experts is passionate about creating innovative solutions.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <Popup
                  trigger={
                    <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          title={member.name}
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle title={member.name}>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                      </CardContent>
                    </Card>
                  }
                  title={member.name}
                  size="lg"
                >
                  {member.name === "Victor Edet Coleman" ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="aspect-square relative overflow-hidden rounded-lg">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-muted-foreground">{member.role}</p>
                        </div>
                        <p>{member.bio}</p>
                        <div className="space-y-3">
                          <h4 className="font-medium">Areas of Expertise</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {member.details?.expertise.map((item, i) => (
                              <li key={i} className="flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4 text-primary shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">Education</h4>
                          <p className="text-sm">{member.details?.education}</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">Experience</h4>
                          <p className="text-sm">{member.details?.experience}</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">Vision</h4>
                          <p className="text-sm">{member.details?.vision}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-muted-foreground">{member.role}</p>
                      </div>
                      <p>{member.bio}</p>
                    </div>
                  )}
                </Popup>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
