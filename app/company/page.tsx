"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Award, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompanyPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description:
        "RYPTO TEC INC was founded by Victor Edet Coleman with a vision to transform ideas into impactful solutions.",
    },
    {
      year: "2023",
      title: "First Major Client",
      description:
        "Secured our first major client and delivered a successful VR project for architectural visualization.",
    },
    {
      year: "2023",
      title: "Team Expansion",
      description: "Expanded our team to include specialists in various technologies and opened our first office.",
    },
    {
      year: "2023",
      title: "Technology Innovation Award",
      description: "Received recognition for innovation in VR/AR technologies at the Tech Innovation Summit.",
    },
    {
      year: "2024",
      title: "International Expansion",
      description: "Expanded operations to serve international clients and opened a second office location.",
    },
    {
      year: "2024",
      title: "Strategic Partnerships",
      description: "Formed strategic partnerships with leading technology providers to enhance our service offerings.",
    },
  ]

  const values = [
    {
      icon: <Award className="h-10 w-10" />,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we do, constantly pushing the boundaries of what's possible.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to create innovative solutions.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Efficiency",
      description:
        "We value time and resources, focusing on efficient processes that deliver results without compromise.",
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
                  title="Our Company"
                >
                  Our Company
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  RYPTO TEC INC is a forward-thinking technology company committed to innovation, excellence, and
                  pushing the boundaries of what's possible with technology.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/about" title="Learn more about us">
                    About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact" title="Get in touch with us">
                    Contact Us
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
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="RYPTO TEC Office"
                  fill
                  className="object-cover"
                  title="Our headquarters"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-24 bg-muted/50" ref={ref1}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Mission & Vision">
              Our Mission & Vision
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We're committed to creating innovative solutions that transform industries and improve lives.
            </p>
          </motion.div>

          <div className="mt-12">
            <Tabs defaultValue="mission" className="mx-auto max-w-3xl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mission" title="Our mission">
                  Mission
                </TabsTrigger>
                <TabsTrigger value="vision" title="Our vision">
                  Vision
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle title="Our Mission">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      To create innovative digital solutions that solve real-world problems and enhance human
                      experiences through the seamless integration of technology, design, and creativity. We strive to
                      deliver exceptional value to our clients by combining technical expertise with creative thinking.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="vision" className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle title="Our Vision">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      To be a global leader in creating transformative digital experiences that push the boundaries of
                      what's possible with technology, setting new standards for innovation and excellence. We envision
                      a future where our solutions redefine industries and create meaningful impact in people's lives.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-12 md:py-24" ref={ref2}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Values">
              Our Values
            </h2>
            <p className="text-muted-foreground md:text-lg">
              The core principles that guide our work and define our company culture.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2 text-primary">{value.icon}</div>
                    <CardTitle title={value.title}>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-12 md:py-24 bg-muted/50" ref={ref3}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center rounded-full bg-background px-3 py-1 text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Our Journey</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Company Timeline">
              Company Timeline
            </h2>
            <p className="text-muted-foreground md:text-lg">Key milestones in our journey of innovation and growth.</p>
          </motion.div>

          <div className="mt-12 mx-auto max-w-3xl">
            <div className="relative border-l border-muted-foreground/20 pl-6 ml-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="mb-10 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="h-3 w-3" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground" title={milestone.year}>
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold" title={milestone.title}>
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Join Our Team">
                Join Our Team
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We're always looking for talented individuals to join our team and help us push the boundaries of
                technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/careers" title="View open positions">
                  View Careers
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
