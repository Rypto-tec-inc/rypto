"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe, Mail, Phone, MapPin } from "lucide-react"

type Partner = {
  id: string
  name: string
  logo: string
  description: string
  category: string
  website: string
  email: string
  phone: string
  location: string
  partnershipType: string[]
  featured: boolean
}

export default function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const partners: Partner[] = [
    {
      id: "1",
      name: "TechVision Solutions",
      logo: "/partners/techvision-logo.png",
      description: "Leading provider of enterprise software solutions and digital transformation services.",
      category: "Technology",
      website: "https://techvision.com",
      email: "contact@techvision.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      partnershipType: ["Software Development", "Cloud Solutions"],
      featured: true
    },
    {
      id: "2",
      name: "Creative Dynamics",
      logo: "/partners/creative-dynamics-logo.png",
      description: "Award-winning design agency specializing in brand identity and user experience.",
      category: "Design",
      website: "https://creativedynamics.com",
      email: "hello@creativedynamics.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      partnershipType: ["UI/UX Design", "Brand Strategy"],
      featured: true
    },
    {
      id: "3",
      name: "Global Innovations",
      logo: "/partners/global-innovations-logo.png",
      description: "International technology consulting firm focused on emerging markets.",
      category: "Consulting",
      website: "https://globalinnovations.com",
      email: "info@globalinnovations.com",
      phone: "+1 (555) 345-6789",
      location: "London, UK",
      partnershipType: ["Market Research", "Strategy"],
      featured: false
    },
    {
      id: "4",
      name: "Digital Future",
      logo: "/partners/digital-future-logo.png",
      description: "Innovative digital marketing and analytics company.",
      category: "Marketing",
      website: "https://digitalfuture.com",
      email: "contact@digitalfuture.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      partnershipType: ["Digital Marketing", "Analytics"],
      featured: false
    },
    {
      id: "5",
      name: "Smart Systems",
      logo: "/partners/smart-systems-logo.png",
      description: "IoT and smart home technology solutions provider.",
      category: "Technology",
      website: "https://smartsystems.com",
      email: "info@smartsystems.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      partnershipType: ["IoT Solutions", "Smart Home"],
      featured: true
    },
    {
      id: "6",
      name: "Creative Studios",
      logo: "/partners/creative-studios-logo.png",
      description: "Full-service creative agency specializing in animation and 3D visualization.",
      category: "Design",
      website: "https://creativestudios.com",
      email: "hello@creativestudios.com",
      phone: "+1 (555) 678-9012",
      location: "Los Angeles, CA",
      partnershipType: ["Animation", "3D Visualization"],
      featured: true
    }
  ]

  const categories = Array.from(new Set(partners.map(partner => partner.category)))
  const filteredPartners = selectedCategory
    ? partners.filter(partner => partner.category === selectedCategory)
    : partners

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Our Partners</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with industry leaders and innovative companies to deliver exceptional solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All Partners
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Partners */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Featured Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners
              .filter(partner => partner.featured)
              .map(partner => (
                <motion.div
                  key={partner.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="p-6 space-y-4">
                      <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{partner.name}</h3>
                        <p className="text-muted-foreground mt-2">{partner.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {partner.partnershipType.map(type => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {partner.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{partner.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{partner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{partner.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Partners */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">All Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners
              .filter(partner => !partner.featured)
              .map(partner => (
                <motion.div
                  key={partner.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="p-6 space-y-4">
                      <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{partner.name}</h3>
                        <p className="text-muted-foreground mt-2">{partner.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {partner.partnershipType.map(type => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {partner.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{partner.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{partner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{partner.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center space-y-4 py-12">
          <h2 className="text-2xl font-semibold">Become a Partner</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in partnering with us? Let's explore how we can create value together.
          </p>
          <Button size="lg" className="mt-4">
            Contact Us
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 