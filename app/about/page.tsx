"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Lightbulb, Users, Code, Globe, Layers, Brain, GraduationCapIcon as Graduation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })
  const isInView4 = useInView(ref4, { once: true, margin: "-100px" })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">About RYPTO TEC</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                  An independent software and innovation lab founded in 2023 by a team of young, visionary engineers in
                  West Africa.
                </p>
                <p className="text-xl font-semibold text-primary mt-2">Engineering Africa's Digital Future.</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/rypto-logo.png"
                  alt="RYPTO TEC Logo"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section ref={ref1} className="py-24 md:py-32 bg-muted/10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12"
          >
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">01</div>
              <h2 className="text-3xl font-bold mt-4">Our Mission</h2>
              <p className="text-muted-foreground mt-2">Building the future</p>
            </div>

            <div className="md:w-2/3 space-y-6">
              <p className="text-xl">
                At its core, RYPTO TEC INC is committed to building the next generation of immersive, intelligent, and
                interactive software platforms that solve challenges across education, infrastructure, digital commerce,
                entertainment, and social impact.
              </p>
              <p>
                The company is driven by a bold mindset: Liberia and the broader African continent should not only
                consume technology—but define it. With that vision, RYPTO TEC INC operates at the intersection of
                creativity, engineering, and purpose.
              </p>
              <p>
                We believe that the solutions designed here can scale everywhere. From urban cities to remote villages,
                RYPTO aims to bridge the digital divide and unlock opportunities through meaningful software.
              </p>
              <p>
                While RYPTO has global technological ambitions, its foundation is local: Liberia is home. The startup
                builds for underserved markets first and believes the solutions designed here can scale everywhere.
              </p>

              <div className="pt-4">
                <blockquote className="border-l-4 border-primary pl-4 italic">
                  "Liberia is my home. Why not make it a better place?" — Victor Edet Coleman, Founder
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={ref2} className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12"
          >
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">02</div>
              <h2 className="text-3xl font-bold mt-4">Core Values</h2>
              <p className="text-muted-foreground mt-2">What drives us</p>
            </div>

            <div className="md:w-2/3">
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Lightbulb,
                    title: "Innovation over imitation",
                    description:
                      "We build what doesn't exist yet—tools, experiences, and platforms that feel intuitive, futuristic, and rooted in real needs.",
                  },
                  {
                    icon: Users,
                    title: "Access for all",
                    description:
                      "We believe the best technology is useless if it's inaccessible. Everything we build is guided by principles of inclusion, localization, and low-barrier adoption.",
                  },
                  {
                    icon: Code,
                    title: "Engineer-first culture",
                    description:
                      "Every member of the RYPTO team is a creator. We empower our engineers to experiment, fail fast, and solve hard problems with elegance.",
                  },
                  {
                    icon: Globe,
                    title: "Community-centered development",
                    description:
                      "We consult real users, involve local developers, and aim to amplify voices from the margins.",
                  },
                  {
                    icon: Layers,
                    title: "Independence + Integrity",
                    description:
                      "As a self-driven startup, RYPTO maintains full creative and ethical control over its work, placing user trust above all.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="h-full border-border/10 bg-background/50 hover:bg-background transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                          <value.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divisions & Capabilities Section */}
      <section ref={ref3} className="py-24 md:py-32 bg-muted/10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12"
          >
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">03</div>
              <h2 className="text-3xl font-bold mt-4">Divisions & Capabilities</h2>
              <p className="text-muted-foreground mt-2">Our expertise</p>
            </div>

            <div className="md:w-2/3">
              <div className="space-y-8">
                {[
                  {
                    icon: Lightbulb,
                    title: "R&D Lab",
                    description: "Focused on experimental technologies, proof-of-concepts, and frontier design.",
                  },
                  {
                    icon: Code,
                    title: "Platform Engineering",
                    description:
                      "Delivers robust and scalable software infrastructure using modern full-stack workflows.",
                  },
                  {
                    icon: Layers,
                    title: "3D & XR Studio",
                    description:
                      "Builds immersive interfaces, simulations, and virtual environments using WebGL, Blender, and game engines.",
                  },
                  {
                    icon: Brain,
                    title: "AI/ML Unit",
                    description:
                      "Researches and integrates smart automation, language models, and computer vision for practical deployment.",
                  },
                  {
                    icon: Graduation,
                    title: "Education & Training Wing",
                    description:
                      "Focused on teaching local youth and professionals to adopt emerging tech through workshops, open-source, and outreach.",
                  },
                ].map((division, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-2 rounded-full bg-primary/10 mt-1">
                      <division.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{division.title}</h3>
                      <p className="text-muted-foreground">{division.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Culture Section */}
      <section ref={ref4} className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12"
          >
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">04</div>
              <h2 className="text-3xl font-bold mt-4">Leadership Culture</h2>
              <p className="text-muted-foreground mt-2">How we lead</p>
            </div>

            <div className="md:w-2/3 space-y-6">
              <p className="text-xl">
                RYPTO TEC INC is led by a new generation of African engineers who blend hustle with high craft.
              </p>
              <p>
                Leadership isn't about hierarchy—it's about vision ownership. Every team member is encouraged to act
                like a founder, think globally, and build responsibly.
              </p>
              <p>
                Our team consists of young, visionary engineers who are passionate about using technology to solve
                real-world problems and create positive change in their communities.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2-0FakLV0tIP3iJoelQjfSMzKRs69LSt.png"
                    alt="Victor Edet Coleman"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Victor Edet Coleman</h3>
                  <p className="text-muted-foreground">Founder & CEO</p>
                  <p>
                    Victor is a software engineer and 3D animator with a passion for creating innovative solutions that
                    address real-world challenges. Born and raised in Liberia, he founded RYPTO TEC INC with the vision
                    of building a technology company that would not only create exceptional products but also contribute
                    to the development of the tech ecosystem in Liberia.
                  </p>
                  <p>
                    With expertise in both software development and 3D animation, Victor brings a unique perspective to
                    every project, combining technical excellence with creative vision.
                  </p>
                  <div className="pt-2 flex gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://linkedin.com/in/victoredetcoleman" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://twitter.com/victorecoleman" target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl gradient-text">Join Us on Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're looking to collaborate on a project, join our team, or simply learn more about what we do,
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/careers">
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
