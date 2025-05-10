"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Camera, Film, Layers, Music, Palette, Play, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popup } from "@/components/ui/popup"

export default function StudioPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

  const services = [
    {
      icon: <Video className="h-10 w-10" />,
      title: "Video Production",
      description: "Professional video production services for commercials, corporate videos, product demos, and more.",
      features: [
        "Concept development and storyboarding",
        "Professional filming with high-end equipment",
        "Expert editing and post-production",
        "Color grading and visual effects",
        "Sound design and audio mixing",
      ],
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "3D Animation",
      description:
        "Stunning 3D animations for product visualizations, architectural walkthroughs, character animations, and more.",
      features: [
        "3D modeling and texturing",
        "Character rigging and animation",
        "Environment design",
        "Lighting and rendering",
        "Compositing and visual effects",
      ],
    },
    {
      icon: <Film className="h-10 w-10" />,
      title: "Motion Graphics",
      description:
        "Eye-catching motion graphics for explainer videos, title sequences, advertisements, and social media content.",
      features: [
        "Logo animations",
        "Kinetic typography",
        "Infographic animations",
        "UI/UX animations",
        "Social media content",
      ],
    },
    {
      icon: <Camera className="h-10 w-10" />,
      title: "Photography",
      description:
        "Professional photography services for product photography, corporate portraits, event coverage, and more.",
      features: [
        "Product photography",
        "Corporate portraits",
        "Event coverage",
        "Architectural photography",
        "Retouching and editing",
      ],
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: "Graphic Design",
      description: "Creative graphic design services for branding, marketing materials, packaging, and digital assets.",
      features: ["Brand identity design", "Marketing collateral", "Packaging design", "Digital assets", "Print design"],
    },
    {
      icon: <Music className="h-10 w-10" />,
      title: "Audio Production",
      description:
        "Professional audio production services for voiceovers, sound design, music composition, and audio mixing.",
      features: [
        "Voiceover recording",
        "Sound design",
        "Music composition",
        "Audio mixing and mastering",
        "Podcast production",
      ],
    },
  ]

  const portfolioItems = {
    video: [
      {
        title: "Corporate Brand Film",
        description: "A cinematic brand film showcasing company values and vision.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Product Launch Video",
        description: "Dynamic product launch video highlighting key features and benefits.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    animation: [
      {
        title: "Architectural Visualization",
        description: "3D animation showcasing a modern architectural design.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Character Animation",
        description: "Expressive character animation for a short film.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    design: [
      {
        title: "Brand Identity System",
        description: "Comprehensive brand identity system for a tech startup.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Packaging Design",
        description: "Creative packaging design for a premium product line.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
  }

  const equipmentList = {
    cameras: ["RED Komodo 6K", "Sony FX6", "Canon C300 Mark III", "Blackmagic URSA Mini Pro 12K", "DJI Ronin 4D"],
    lenses: [
      "Canon Cinema Prime Lenses",
      "Sony G Master Series",
      "Zeiss Supreme Primes",
      "Sigma Art Series",
      "Angenieux Optimo Zooms",
    ],
    lighting: [
      "ARRI SkyPanel S60-C",
      "Aputure 600d Pro",
      "Litepanels Gemini 2x1",
      "Kino Flo Celeb LED",
      "Nanlite Forza 500",
    ],
    audio: ["Sennheiser MKH 416", "Rode NTG5", "Sound Devices MixPre-10 II", "Shure SM7B", "Neumann U87"],
    software: ["Adobe Creative Cloud Suite", "Autodesk Maya", "Cinema 4D", "DaVinci Resolve Studio", "Blender"],
  }

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
                  title="RYPTO STUDIO"
                >
                  RYPTO STUDIO
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A creative production studio specializing in video production, 3D animation, motion graphics, and
                  visual storytelling.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Popup
                  trigger={
                    <Button variant="outline" size="lg">
                      Watch Showreel
                      <Play className="ml-2 h-4 w-4" />
                    </Button>
                  }
                  title="RYPTO STUDIO Showreel"
                  size="lg"
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="RYPTO STUDIO Showreel"
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Popup>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[350px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=700&width=700"
                  alt="RYPTO STUDIO"
                  fill
                  className="object-cover"
                  title="RYPTO STUDIO"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-24" ref={ref1}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Services">
              Our Services
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We offer a comprehensive range of creative services to bring your vision to life.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Popup
                  trigger={
                    <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-2 text-primary">{service.icon}</div>
                        <CardTitle title={service.title}>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  }
                  title={service.title}
                >
                  <div className="space-y-4">
                    <p>{service.description}</p>
                    <h3 className="text-lg font-medium">What We Offer:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Button asChild>
                        <Link href="/contact">
                          Get a Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Popup>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 md:py-24 bg-muted/50" ref={ref2}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Portfolio">
              Our Portfolio
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Explore our creative work across video production, animation, and design.
            </p>
          </motion.div>

          <div className="mt-12">
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="video" title="Video Production">
                  Video
                </TabsTrigger>
                <TabsTrigger value="animation" title="3D Animation">
                  Animation
                </TabsTrigger>
                <TabsTrigger value="design" title="Graphic Design">
                  Design
                </TabsTrigger>
              </TabsList>

              {Object.entries(portfolioItems).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="group"
                      >
                        <Popup
                          trigger={
                            <Card className="overflow-hidden cursor-pointer">
                              <div className="aspect-video relative overflow-hidden">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  title={item.title}
                                />
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-semibold" title={item.title}>
                                  {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              </CardContent>
                            </Card>
                          }
                          title={item.title}
                          size="lg"
                        >
                          <div className="space-y-4">
                            <div className="aspect-video relative overflow-hidden rounded-lg">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{item.title}</h3>
                              <p className="text-muted-foreground mt-2">{item.description}</p>
                            </div>
                            <div className="pt-4">
                              <Button asChild>
                                <Link href="/contact">
                                  Discuss a Similar Project
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Popup>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Button asChild variant="outline">
                      <Link href="/gallery">
                        View Full Portfolio
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-12 md:py-24" ref={ref3}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Equipment">
              Our Equipment
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We use professional-grade equipment to ensure the highest quality production.
            </p>
          </motion.div>

          <div className="mt-12">
            <Tabs defaultValue="cameras" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="cameras" title="Cameras">
                  Cameras
                </TabsTrigger>
                <TabsTrigger value="lenses" title="Lenses">
                  Lenses
                </TabsTrigger>
                <TabsTrigger value="lighting" title="Lighting">
                  Lighting
                </TabsTrigger>
                <TabsTrigger value="audio" title="Audio">
                  Audio
                </TabsTrigger>
                <TabsTrigger value="software" title="Software">
                  Software
                </TabsTrigger>
              </TabsList>

              {Object.entries(equipmentList).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="capitalize">{category} Equipment</CardTitle>
                      <CardDescription>
                        Professional-grade {category} equipment for high-quality production.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView3 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.05 * index }}
                            className="flex items-center"
                          >
                            <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Process">
              Our Process
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We follow a structured process to ensure your project is delivered on time and exceeds expectations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We start by understanding your vision, goals, and requirements through in-depth consultation.",
              },
              {
                step: "02",
                title: "Pre-Production",
                description:
                  "We develop concepts, scripts, storyboards, and production plans to prepare for your project.",
              },
              {
                step: "03",
                title: "Production",
                description: "Our team executes the project using professional equipment and creative expertise.",
              },
              {
                step: "04",
                title: "Post-Production",
                description:
                  "We edit, refine, and enhance your project with color grading, sound design, and visual effects.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="text-4xl font-bold text-primary/20">{process.step}</div>
                    <CardTitle className="mt-2">{process.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{process.description}</CardDescription>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to bring your vision to life?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Let's collaborate to create stunning visual content that captivates your audience.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project
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
