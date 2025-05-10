"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ExternalLink, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popup } from "@/components/ui/popup"

// Sample partners data
const partnersData = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "/placeholder.svg?height=200&width=200",
    category: "technology",
    description: "Leading provider of cloud computing and AI solutions.",
    website: "https://example.com",
    partnership: "Strategic technology partner providing cloud infrastructure and AI capabilities.",
    yearEstablished: 2018,
    location: "San Francisco, CA",
    featured: true,
  },
  {
    id: 2,
    name: "DesignWorks Studio",
    logo: "/placeholder.svg?height=200&width=200",
    category: "design",
    description: "Award-winning design studio specializing in UI/UX and branding.",
    website: "https://example.com",
    partnership: "Creative partner for UI/UX design and brand identity development.",
    yearEstablished: 2015,
    location: "New York, NY",
    featured: true,
  },
  {
    id: 3,
    name: "VR Innovations",
    logo: "/placeholder.svg?height=200&width=200",
    category: "vr-ar",
    description: "Pioneers in virtual reality hardware and software.",
    website: "https://example.com",
    partnership: "Technology partner for VR/AR hardware integration and optimization.",
    yearEstablished: 2017,
    location: "Seattle, WA",
    featured: false,
  },
  {
    id: 4,
    name: "DataSphere Analytics",
    logo: "/placeholder.svg?height=200&width=200",
    category: "data",
    description: "Specialists in big data analytics and machine learning.",
    website: "https://example.com",
    partnership: "Data analytics partner providing insights and ML capabilities.",
    yearEstablished: 2019,
    location: "Boston, MA",
    featured: false,
  },
  {
    id: 5,
    name: "SecureNet Systems",
    logo: "/placeholder.svg?height=200&width=200",
    category: "security",
    description: "Cybersecurity experts protecting digital assets and infrastructure.",
    website: "https://example.com",
    partnership: "Security partner ensuring data protection and compliance.",
    yearEstablished: 2016,
    location: "Austin, TX",
    featured: true,
  },
  {
    id: 6,
    name: "GlobalReach Marketing",
    logo: "/placeholder.svg?height=200&width=200",
    category: "marketing",
    description: "International marketing agency specializing in digital campaigns.",
    website: "https://example.com",
    partnership: "Marketing partner for global outreach and campaign management.",
    yearEstablished: 2014,
    location: "Los Angeles, CA",
    featured: false,
  },
]

export default function PartnersPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter partners based on search query and category
  const filteredPartners = partnersData.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || partner.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Get featured partners
  const featuredPartners = partnersData.filter((partner) => partner.featured)

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" title="Our Partners">
            Our Partners
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            We collaborate with industry-leading companies to deliver exceptional solutions and experiences.
          </p>
        </motion.div>

        {/* Featured Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Featured Partners</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPartners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center p-6">
                  <div className="relative h-20 w-full">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle title={partner.name}>{partner.name}</CardTitle>
                  <CardDescription>{partner.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* All Partners with Search and Filter */}
        <div ref={ref} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">All Partners</h2>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search partners..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="all" title="All partners">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="technology" title="Technology partners">
                    Tech
                  </TabsTrigger>
                  <TabsTrigger value="design" title="Design partners">
                    Design
                  </TabsTrigger>
                  <TabsTrigger value="vr-ar" title="VR/AR partners">
                    VR/AR
                  </TabsTrigger>
                  <TabsTrigger value="data" title="Data partners">
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="security" title="Security partners">
                    Security
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {filteredPartners.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No partners found matching your search criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
                  >
                    <Popup
                      trigger={
                        <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg">
                          <div className="aspect-[3/2] bg-muted flex items-center justify-center p-6">
                            <div className="relative h-20 w-full">
                              <Image
                                src={partner.logo || "/placeholder.svg"}
                                alt={partner.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle title={partner.name}>{partner.name}</CardTitle>
                            <CardDescription>{partner.description}</CardDescription>
                          </CardHeader>
                          <CardFooter className="p-4 pt-0">
                            <Button variant="ghost" size="sm" className="ml-auto">
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      }
                      title={partner.name}
                      size="lg"
                    >
                      <div className="space-y-6">
                        <div className="aspect-video bg-muted flex items-center justify-center p-6 rounded-lg">
                          <div className="relative h-32 w-full">
                            <Image
                              src={partner.logo || "/placeholder.svg"}
                              alt={partner.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium">About {partner.name}</h3>
                            <p className="text-muted-foreground mt-1">{partner.description}</p>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium">Location</h4>
                              <p className="text-sm text-muted-foreground">{partner.location}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Established</h4>
                              <p className="text-sm text-muted-foreground">{partner.yearEstablished}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium">Partnership</h3>
                            <p className="text-muted-foreground mt-1">{partner.partnership}</p>
                          </div>

                          <div className="pt-4">
                            <Button asChild>
                              <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                                Visit Website
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-lg bg-muted p-8 text-center"
        >
          <h2 className="text-2xl font-bold" title="Become a Partner">
            Become a Partner
          </h2>
          <p className="mx-auto mt-2 max-w-[600px] text-muted-foreground">
            Interested in partnering with RYPTO TEC INC? We're always looking for innovative companies to collaborate
            with.
          </p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/contact" title="Contact us about partnership">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
