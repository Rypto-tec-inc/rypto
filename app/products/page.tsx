"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Download,
  ExternalLink,
  Check,
  Star,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  Users,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popup } from "@/components/ui/popup"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Barcode from "@/components/barcode"
import AISuggestions from "@/components/ai-suggestions"

export default function ProductsPage() {
  const { toast } = useToast()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTechnologies, setSelectedTechnologies] = useState([])
  const [sortBy, setSortBy] = useState("newest")
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your download will begin shortly.",
    })
  }

  const handleDemoRequest = (e) => {
    e.preventDefault()
    toast({
      title: "Demo requested",
      description: "Our team will contact you shortly to schedule a demo.",
    })
  }

  // Products/Projects data
  const products = [
    {
      id: "RYPT-PRD-001",
      name: "RyptoFlow",
      description:
        "An advanced workflow automation platform designed to streamline business processes and boost productivity.",
      shortDescription: "Workflow automation platform",
      image: "/placeholder.svg?height=600&width=800",
      category: "software",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      features: [
        "Drag-and-drop workflow builder",
        "Pre-built automation templates",
        "Custom trigger and action creation",
        "Integration with 100+ apps and services",
        "Real-time analytics and reporting",
        "Role-based access control",
        "Mobile app for on-the-go management",
        "AI-powered workflow suggestions",
      ],
      pricing: [
        {
          name: "Starter",
          price: "$49",
          description: "Perfect for small teams and startups",
          features: ["Up to 5 users", "10 workflows", "Basic integrations", "Email support"],
        },
        {
          name: "Professional",
          price: "$99",
          description: "Ideal for growing businesses",
          features: ["Up to 20 users", "Unlimited workflows", "Advanced integrations", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large organizations with complex needs",
          features: ["Unlimited users", "Custom development", "Dedicated support", "On-premises option"],
        },
      ],
      releaseDate: "2023-06-15",
      status: "active",
      clients: ["TechCorp", "HealthPlus", "EduSystems"],
      testimonials: [
        {
          quote:
            "RyptoFlow has reduced our manual processing time by 75% and eliminated costly errors. It's been a game-changer for our operations.",
          author: "Sarah Johnson",
          position: "Operations Director",
          company: "TechCorp",
        },
      ],
      demoUrl: "https://demo.ryptotec.com/ryptoflow",
      documentationUrl: "https://docs.ryptotec.com/ryptoflow",
    },
    {
      id: "RYPT-PRD-002",
      name: "EduVR",
      description:
        "An immersive virtual reality platform for educational experiences, designed specifically for African contexts.",
      shortDescription: "VR education platform",
      image: "/placeholder.svg?height=600&width=800",
      category: "vr",
      technologies: ["Unity", "WebXR", "Three.js", "WebGL"],
      features: [
        "Immersive 3D learning environments",
        "Interactive simulations",
        "Curriculum-aligned content",
        "Low-bandwidth optimization",
        "Offline mode for remote areas",
        "Teacher dashboard and analytics",
        "Content creation tools",
        "Multi-user collaboration",
      ],
      pricing: [
        {
          name: "School",
          price: "$199",
          description: "For individual schools",
          features: ["Up to 500 students", "Standard content library", "Basic analytics", "Email support"],
        },
        {
          name: "District",
          price: "$499",
          description: "For school districts",
          features: ["Up to 5,000 students", "Full content library", "Advanced analytics", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For ministries and large organizations",
          features: ["Unlimited students", "Custom content development", "Dedicated support", "On-premises option"],
        },
      ],
      releaseDate: "2023-09-01",
      status: "active",
      clients: ["Ministry of Education", "International School of Monrovia", "African Development Foundation"],
      testimonials: [
        {
          quote:
            "EduVR has transformed how our students learn complex scientific concepts. The immersive experiences make abstract ideas tangible.",
          author: "Dr. James Kollie",
          position: "Principal",
          company: "International School of Monrovia",
        },
      ],
      demoUrl: "https://demo.ryptotec.com/eduvr",
      documentationUrl: "https://docs.ryptotec.com/eduvr",
    },
    {
      id: "RYPT-PRD-003",
      name: "AfriPay",
      description:
        "A digital payment platform designed for African markets, with support for mobile money, bank transfers, and offline transactions.",
      shortDescription: "Digital payment platform",
      image: "/placeholder.svg?height=600&width=800",
      category: "fintech",
      technologies: ["React Native", "Node.js", "PostgreSQL", "Blockchain"],
      features: [
        "Mobile money integration",
        "Bank transfer support",
        "Offline transaction capability",
        "QR code payments",
        "Merchant dashboard",
        "Real-time analytics",
        "Multi-currency support",
        "Regulatory compliance",
      ],
      pricing: [
        {
          name: "Basic",
          price: "1.5% per transaction",
          description: "For small businesses",
          features: ["Up to $10,000 monthly volume", "Standard features", "Email support"],
        },
        {
          name: "Business",
          price: "1.2% per transaction",
          description: "For growing businesses",
          features: ["Up to $50,000 monthly volume", "Advanced features", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large organizations",
          features: ["Unlimited volume", "Custom integration", "Dedicated support", "On-premises option"],
        },
      ],
      releaseDate: "2023-11-15",
      status: "beta",
      clients: ["Local Merchants Association", "Liberia Telecom", "West African Trade Network"],
      testimonials: [
        {
          quote:
            "AfriPay has revolutionized how we handle payments. The offline capability is crucial in our region with inconsistent connectivity.",
          author: "Emmanuel Togba",
          position: "Director",
          company: "Local Merchants Association",
        },
      ],
      demoUrl: "https://demo.ryptotec.com/afripay",
      documentationUrl: "https://docs.ryptotec.com/afripay",
    },
    {
      id: "RYPT-PRD-004",
      name: "HealthTrack",
      description:
        "A healthcare management system designed for clinics and hospitals in resource-constrained environments.",
      shortDescription: "Healthcare management system",
      image: "/placeholder.svg?height=600&width=800",
      category: "healthcare",
      technologies: ["React", "Express", "MongoDB", "PWA"],
      features: [
        "Patient records management",
        "Appointment scheduling",
        "Inventory tracking",
        "Offline functionality",
        "Mobile app for field workers",
        "Reporting and analytics",
        "Integration with lab systems",
        "Telemedicine support",
      ],
      pricing: [
        {
          name: "Clinic",
          price: "$99/month",
          description: "For small clinics",
          features: ["Up to 5 providers", "Basic features", "Email support"],
        },
        {
          name: "Hospital",
          price: "$299/month",
          description: "For hospitals",
          features: ["Up to 20 providers", "Advanced features", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For healthcare networks",
          features: ["Unlimited providers", "Custom development", "Dedicated support", "On-premises option"],
        },
      ],
      releaseDate: "2024-01-10",
      status: "active",
      clients: ["Monrovia Medical Center", "Rural Health Network", "Doctors Without Borders"],
      testimonials: [
        {
          quote:
            "HealthTrack has significantly improved our patient care workflow. The offline capability ensures we can continue working even during power outages.",
          author: "Dr. Sarah Mensah",
          position: "Medical Director",
          company: "Monrovia Medical Center",
        },
      ],
      demoUrl: "https://demo.ryptotec.com/healthtrack",
      documentationUrl: "https://docs.ryptotec.com/healthtrack",
    },
    {
      id: "RYPT-PRD-005",
      name: "AgroInsight",
      description:
        "An AI-powered agricultural analytics platform to help farmers optimize crop yields and resource usage.",
      shortDescription: "Agricultural analytics platform",
      image: "/placeholder.svg?height=600&width=800",
      category: "agriculture",
      technologies: ["Python", "TensorFlow", "React", "Satellite Imagery"],
      features: [
        "Satellite imagery analysis",
        "Weather prediction",
        "Crop disease detection",
        "Soil health monitoring",
        "Resource optimization",
        "Mobile app for farmers",
        "Offline functionality",
        "SMS alerts and recommendations",
      ],
      pricing: [
        {
          name: "Small Farm",
          price: "$19/month",
          description: "For small-scale farmers",
          features: ["Up to 10 hectares", "Basic features", "Email support"],
        },
        {
          name: "Commercial",
          price: "$99/month",
          description: "For commercial farms",
          features: ["Up to 100 hectares", "Advanced features", "Priority support"],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large agricultural operations",
          features: ["Unlimited area", "Custom development", "Dedicated support", "On-premises option"],
        },
      ],
      releaseDate: "2024-03-01",
      status: "beta",
      clients: ["Liberian Farmers Association", "West African Agricultural Cooperative", "Ministry of Agriculture"],
      testimonials: [
        {
          quote:
            "AgroInsight has helped us increase our crop yields by 30% while reducing water usage. The AI recommendations are incredibly valuable.",
          author: "John Kamara",
          position: "President",
          company: "Liberian Farmers Association",
        },
      ],
      demoUrl: "https://demo.ryptotec.com/agroinsight",
      documentationUrl: "https://docs.ryptotec.com/agroinsight",
    },
  ]

  // Get all unique categories and technologies
  const allCategories = Array.from(new Set(products.map((product) => product.category)))
  const allTechnologies = Array.from(new Set(products.flatMap((product) => product.technologies))).sort()

  // Toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Toggle technology selection
  const toggleTechnology = (tech) => {
    if (selectedTechnologies.includes(tech)) {
      setSelectedTechnologies(selectedTechnologies.filter((t) => t !== tech))
    } else {
      setSelectedTechnologies([...selectedTechnologies, tech])
    }
  }

  // Filter products based on search query, categories, and technologies
  const filteredProducts = products.filter((product) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.shortDescription.toLowerCase().includes(searchLower) ||
      product.technologies.some((tech) => tech.toLowerCase().includes(searchLower))

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    // Technology filter
    const matchesTechnology =
      selectedTechnologies.length === 0 || selectedTechnologies.some((tech) => product.technologies.includes(tech))

    return matchesSearch && matchesCategory && matchesTechnology
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.releaseDate) - new Date(a.releaseDate)
    }
    if (sortBy === "oldest") {
      return new Date(a.releaseDate) - new Date(b.releaseDate)
    }
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name)
    }
    return 0
  })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4">
            <div className="text-8xl font-bold tracking-tighter">04</div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Products</h1>
              <p className="mt-2 text-xl text-muted-foreground">
                Innovative solutions designed to transform businesses and communities across Africa.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 rounded-none border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-border"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </Button>

            <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
              <TabsList className="bg-muted/30 p-1 h-auto">
                <TabsTrigger value="grid" className="px-3 py-1.5 h-auto data-[state=active]:bg-background">
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3 py-1.5 h-auto data-[state=active]:bg-background">
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border border-border p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer capitalize"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                          {selectedCategories.includes(category) && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <label className="text-sm font-medium">Sort by</label>
                    <select
                      className="bg-background border border-border rounded-sm px-3 py-1.5 text-sm w-full"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Technologies</label>
                  <div className="flex flex-wrap gap-2">
                    {allTechnologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTechnology(tech)}
                      >
                        {tech}
                        {selectedTechnologies.includes(tech) && <X className="ml-1 h-3 w-3" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategories([])
                      setSelectedTechnologies([])
                      setSortBy("newest")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs value={viewMode} className="w-full">
          <TabsContent value="grid" className="m-0">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid gap-8 md:grid-cols-2"
            >
              {sortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isInView={isInView}
                  handleDownload={handleDownload}
                  handleDemoRequest={handleDemoRequest}
                />
              ))}

              {sortedProducts.length === 0 && (
                <div className="col-span-2 text-center py-12 border border-border">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategories([])
                      setSelectedTechnologies([])
                      setSortBy("newest")
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="list" className="m-0">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {sortedProducts.map((product, index) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  index={index}
                  isInView={isInView}
                  handleDownload={handleDownload}
                  handleDemoRequest={handleDemoRequest}
                />
              ))}

              {sortedProducts.length === 0 && (
                <div className="text-center py-12 border border-border">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategories([])
                      setSelectedTechnologies([])
                      setSortBy("newest")
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="rounded-none border border-border p-8 text-center">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="mx-auto mt-2 max-w-[600px] text-muted-foreground">
            We're working on exciting new products to add to our lineup. Stay tuned for updates!
          </p>
          <Button className="mt-6" variant="outline" asChild className="rounded-none border-border">
            <Link href="/newsletter">
              Subscribe for Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <AISuggestions currentPage="products" />
    </div>
  )
}

function ProductCard({ product, index, isInView, handleDownload, handleDemoRequest }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
      className="relative overflow-hidden rounded-none border border-border h-full"
    >
      <div className="absolute top-4 right-4 z-10">
        <Barcode value={product.id} width={100} height={30} />
      </div>
      <div className="aspect-video relative">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge variant="outline" className="bg-background/80 capitalize">
            {product.category}
          </Badge>
          <Badge variant={product.status === "active" ? "default" : "secondary"} className="bg-background/80">
            {product.status === "active" ? "Active" : "Beta"}
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(product.releaseDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {product.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-muted/50">
              {tech}
            </Badge>
          ))}
        </div>

        <p className="mt-4 text-muted-foreground">{product.description}</p>

        <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
          <TabsList className="bg-muted/30 p-1 h-auto w-full justify-start">
            <TabsTrigger value="overview" className="px-3 py-1.5 h-auto data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="px-3 py-1.5 h-auto data-[state=active]:bg-background">
              Features
            </TabsTrigger>
            <TabsTrigger value="pricing" className="px-3 py-1.5 h-auto data-[state=active]:bg-background">
              Pricing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-foreground text-foreground" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Based on client feedback</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Key clients: {product.clients.join(", ")}</span>
              </div>

              {product.testimonials && product.testimonials.length > 0 && (
                <blockquote className="border-l-4 border-border pl-4 italic mt-4">
                  "{product.testimonials[0].quote}"
                  <footer className="mt-2 text-sm text-muted-foreground">
                    — {product.testimonials[0].author}, {product.testimonials[0].position} at{" "}
                    {product.testimonials[0].company}
                  </footer>
                </blockquote>
              )}
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="pricing" className="mt-4">
            <div className="space-y-4">
              {product.pricing.map((plan, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0 border-border"
                >
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <ul className="mt-2 space-y-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-sm flex items-center">
                          <Check className="mr-2 h-3 w-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{plan.price}</div>
                    {plan.price !== "Custom" && <div className="text-sm text-muted-foreground">per month</div>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-none border-border">
            <Link href={`/products/${product.name.toLowerCase()}`}>
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-none border-border" onClick={handleDownload}>
            Download Brochure
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Popup
            trigger={
              <Button variant="outline" className="rounded-none border-border">
                Request Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            }
            title={`Request a Demo: ${product.name}`}
          >
            <form onSubmit={handleDemoRequest} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" className="w-full rounded-none border-border bg-background" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" className="w-full rounded-none border-border bg-background" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input id="company" className="w-full rounded-none border-border bg-background" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full rounded-none border border-border bg-background p-2"
                  placeholder={`I'm interested in learning more about ${product.name}...`}
                />
              </div>
              <Button type="submit" className="w-full rounded-none">
                Submit Request
              </Button>
            </form>
          </Popup>
        </div>
      </div>
    </motion.div>
  )
}

function ProductListItem({ product, index, isInView, handleDownload, handleDemoRequest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
      className="relative overflow-hidden rounded-none border border-border"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <div className="absolute top-2 right-2">
            <Barcode value={product.id} width={80} height={25} />
          </div>
          <div className="absolute bottom-2 left-2 flex gap-2">
            <Badge variant="outline" className="bg-background/80 capitalize">
              {product.category}
            </Badge>
            <Badge variant={product.status === "active" ? "default" : "secondary"} className="bg-background/80">
              {product.status === "active" ? "Active" : "Beta"}
            </Badge>
          </div>
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.shortDescription}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {product.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-muted/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(product.releaseDate).toLocaleDateString()}
            </div>
          </div>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Key features: {product.features.slice(0, 3).join(", ")}
                {product.features.length > 3 ? "..." : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Key clients: {product.clients.join(", ")}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-none border-border">
              <Link href={`/products/${product.name.toLowerCase()}`}>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-none border-border" onClick={handleDownload}>
              Download Brochure
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Popup
              trigger={
                <Button variant="outline" className="rounded-none border-border">
                  Request Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              }
              title={`Request a Demo: ${product.name}`}
            >
              <form onSubmit={handleDemoRequest} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" className="w-full rounded-none border-border bg-background" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" className="w-full rounded-none border-border bg-background" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company
                  </label>
                  <Input id="company" className="w-full rounded-none border-border bg-background" required />
                </div>
                <Button type="submit" className="w-full rounded-none">
                  Submit Request
                </Button>
              </form>
            </Popup>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
