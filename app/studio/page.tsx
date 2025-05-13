"use client"

import { useState, useRef, useEffect } from "react"
import { FadeInOnScroll, ScaleOnScroll, FloatingElements } from "@/components/scroll-animations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Code,
  Layers,
  Palette,
  Wand2,
  Sparkles,
  Zap,
  Save,
  Share2,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"
import { useInView, useScroll, useTransform } from "framer-motion"
import { Film, CuboidIcon as Cube, Monitor } from "lucide-react"

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("design")
  const [isPlaying, setIsPlaying] = useState(false)
  const [theme, setTheme] = useState("light")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasElements, setCanvasElements] = useState<any[]>([])
  const [selectedElement, setSelectedElement] = useState<number | null>(null)

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const heroRef = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Corporate Brand Animation",
      category: "character",
      tags: ["3D Animation", "Character Design", "Corporate"],
      image: "/placeholder.svg?height=400&width=600&text=Project+1",
      client: "Global Finance Corp",
      duration: "4 weeks",
      team: ["Michael Johnson", "Ryan Kim"],
      description:
        "A dynamic 3D character animation for a corporate brand identity, featuring custom character design and storytelling.",
      testimonial: {
        text: "The animation exceeded our expectations and perfectly captured our brand values.",
        author: "Sarah Chen, Marketing Director",
      },
    },
    {
      id: 2,
      title: "Architectural Visualization",
      category: "environment",
      tags: ["3D Modeling", "Architectural", "Visualization"],
      image: "/placeholder.svg?height=400&width=600&text=Project+2",
      client: "Urban Developers Ltd",
      duration: "6 weeks",
      team: ["Sarah Williams", "Ryan Kim"],
      description:
        "Photorealistic 3D visualization of a proposed urban development project, including exterior and interior spaces.",
      testimonial: {
        text: "The visualizations helped us secure funding by bringing our vision to life.",
        author: "James Wilson, Project Manager",
      },
    },
    {
      id: 3,
      title: "Educational Character Series",
      category: "character",
      tags: ["Character Animation", "Educational", "Series"],
      image: "/placeholder.svg?height=400&width=600&text=Project+3",
      client: "Learn & Grow Education",
      duration: "12 weeks",
      team: ["Michael Johnson", "Emily Martinez"],
      description:
        "A series of animated characters designed for an educational platform, teaching science concepts to children.",
      testimonial: {
        text: "Children love the characters and engagement with our content has increased by 40%.",
        author: "Maria Lopez, Content Director",
      },
    },
    {
      id: 4,
      title: "Virtual Reality Environment",
      category: "environment",
      tags: ["VR", "Environment Design", "Interactive"],
      image: "/placeholder.svg?height=400&width=600&text=Project+4",
      client: "Tech Innovations Inc",
      duration: "8 weeks",
      team: ["Sarah Williams", "David Lee"],
      description:
        "An immersive virtual reality environment for a training simulation, featuring realistic physics and interactions.",
      testimonial: {
        text: "The VR environment has revolutionized our training program with incredible realism.",
        author: "Robert Chang, Training Manager",
      },
    },
    {
      id: 5,
      title: "Product Visualization",
      category: "product",
      tags: ["Product Design", "3D Modeling", "Commercial"],
      image: "/placeholder.svg?height=400&width=600&text=Project+5",
      client: "NextGen Products",
      duration: "3 weeks",
      team: ["Ryan Kim", "Emily Martinez"],
      description:
        "Detailed 3D visualization of a new consumer electronics product, showcasing features and design elements.",
      testimonial: {
        text: "The product visualizations were key to our successful product launch campaign.",
        author: "Thomas Wright, Product Manager",
      },
    },
    {
      id: 6,
      title: "Animated Short Film",
      category: "character",
      tags: ["Storytelling", "Character Animation", "Short Film"],
      image: "/placeholder.svg?height=400&width=600&text=Project+6",
      client: "Independent Production",
      duration: "16 weeks",
      team: ["Michael Johnson", "Ryan Kim", "Sarah Williams"],
      description:
        "An award-winning animated short film featuring original characters and a compelling narrative about climate change.",
      testimonial: {
        text: "The film has been selected for multiple international film festivals and received critical acclaim.",
        author: "Film Festival Jury",
      },
    },
  ]

  // Filter portfolio items
  const filteredPortfolio = portfolioItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Services data with pricing
  const services = [
    {
      icon: Cube,
      title: "3D Modeling",
      description: "High-quality 3D models for characters, environments, products, and architectural visualization.",
      features: [
        "Custom character modeling",
        "Environment and scene creation",
        "Product visualization",
        "Architectural modeling",
        "Texturing and materials",
      ],
      pricing: [
        { name: "Basic", price: "$500+", description: "Simple models with basic texturing" },
        { name: "Standard", price: "$1,500+", description: "Detailed models with advanced texturing" },
        { name: "Premium", price: "$3,000+", description: "Complex models with photorealistic details" },
      ],
    },
    {
      icon: Film,
      title: "Character Animation",
      description: "Bringing characters to life with fluid, expressive animation for games, films, and commercials.",
      features: [
        "Character rigging",
        "Facial animation",
        "Motion capture integration",
        "Stylized animation",
        "Realistic movement",
      ],
      pricing: [
        { name: "Basic", price: "$1,000+", description: "Simple character animations (15-30 seconds)" },
        { name: "Standard", price: "$3,000+", description: "Complex character animations (30-60 seconds)" },
        { name: "Premium", price: "$7,000+", description: "Full animated sequences with multiple characters" },
      ],
    },
    {
      icon: Layers,
      title: "Visual Effects",
      description: "Stunning visual effects that enhance storytelling and create immersive experiences.",
      features: ["Particle systems", "Fluid simulations", "Destruction effects", "Environment effects", "Compositing"],
      pricing: [
        { name: "Basic", price: "$800+", description: "Simple effects integration" },
        { name: "Standard", price: "$2,500+", description: "Complex effect sequences" },
        { name: "Premium", price: "$5,000+", description: "Photorealistic effects with advanced physics" },
      ],
    },
    {
      icon: Code,
      title: "Technical Animation",
      description: "Specialized animation for technical products, scientific visualization, and educational content.",
      features: [
        "Product demonstrations",
        "Scientific visualizations",
        "Medical animations",
        "Educational content",
        "Technical explainers",
      ],
      pricing: [
        { name: "Basic", price: "$1,200+", description: "Simple technical animations (30-60 seconds)" },
        { name: "Standard", price: "$3,500+", description: "Detailed technical sequences (1-2 minutes)" },
        { name: "Premium", price: "$8,000+", description: "Comprehensive technical presentations (2+ minutes)" },
      ],
    },
    {
      icon: Palette,
      title: "Art Direction",
      description: "Creative guidance to ensure visual consistency and artistic excellence across projects.",
      features: [
        "Style development",
        "Visual language creation",
        "Color theory application",
        "Mood boards and concepts",
        "Creative consultation",
      ],
      pricing: [
        { name: "Basic", price: "$1,000+", description: "Style consultation and basic direction" },
        { name: "Standard", price: "$3,000+", description: "Comprehensive art direction for medium projects" },
        { name: "Premium", price: "$6,000+", description: "Full creative direction for large-scale projects" },
      ],
    },
    {
      icon: Monitor,
      title: "Motion Graphics",
      description: "Dynamic motion graphics for branding, UI/UX animation, and promotional content.",
      features: [
        "Logo animations",
        "UI/UX motion design",
        "Infographics animation",
        "Title sequences",
        "Promotional videos",
      ],
      pricing: [
        { name: "Basic", price: "$600+", description: "Simple motion graphics (15-30 seconds)" },
        { name: "Standard", price: "$1,800+", description: "Complex motion graphics (30-60 seconds)" },
        { name: "Premium", price: "$4,000+", description: "Premium motion graphics packages (60+ seconds)" },
      ],
    },
  ]

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault()
    // This would normally connect to an API
    alert(`Thank you for subscribing with ${email}! You'll receive our latest studio updates.`)
    setEmail("")
  }

  // Simulate canvas rendering
  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set background
    ctx.fillStyle = theme === "light" ? "#ffffff" : "#1a1a1a"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Draw grid
    ctx.strokeStyle = theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
    ctx.lineWidth = 1

    const gridSize = 20
    for (let x = 0; x <= canvasRef.current.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasRef.current.height)
      ctx.stroke()
    }

    for (let y = 0; y <= canvasRef.current.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasRef.current.width, y)
      ctx.stroke()
    }

    // Draw elements
    canvasElements.forEach((element, index) => {
      ctx.save()

      // Highlight selected element
      if (index === selectedElement) {
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4)
      }

      // Draw element
      ctx.fillStyle = element.color
      ctx.fillRect(element.x, element.y, element.width, element.height)

      // Draw label
      ctx.fillStyle = theme === "light" ? "#000000" : "#ffffff"
      ctx.font = "12px sans-serif"
      ctx.fillText(element.name, element.x + 5, element.y + 15)

      ctx.restore()
    })
  }, [canvasElements, selectedElement, theme])

  // Add a random element to canvas
  const addElement = () => {
    const newElement = {
      name: `Element ${canvasElements.length + 1}`,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }

    setCanvasElements([...canvasElements, newElement])
  }

  // Toggle play/pause animation
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Reset canvas
  const resetCanvas = () => {
    setCanvasElements([])
    setSelectedElement(null)
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <main className="min-h-screen">
      <FloatingElements />

      <div className="container mx-auto px-4 py-12">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">RYPTO TEC Studio</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced design and development environment for creating cutting-edge digital experiences.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar */}
          <Card className="lg:col-span-3 h-[calc(100vh-200px)] overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>Tools</CardTitle>
              <CardDescription>Design and development tools</CardDescription>
            </CardHeader>

            <Tabs defaultValue="design" onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger value="design" className="flex-1">
                    <Palette className="h-4 w-4 mr-2" />
                    Design
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex-1">
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex-1">
                    <Wand2 className="h-4 w-4 mr-2" />
                    AI
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <TabsContent value="design" className="mt-0 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Elements</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={addElement}>
                          <Layers className="h-4 w-4 mr-2" />
                          Add Shape
                        </Button>
                        <Button variant="outline" size="sm">
                          <Layers className="h-4 w-4 mr-2" />
                          Add Text
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Properties</h3>
                      {selectedElement !== null ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="element-x" className="text-xs">
                                X Position
                              </Label>
                              <Input
                                id="element-x"
                                type="number"
                                value={canvasElements[selectedElement]?.x}
                                onChange={() => {}}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label htmlFor="element-y" className="text-xs">
                                Y Position
                              </Label>
                              <Input
                                id="element-y"
                                type="number"
                                value={canvasElements[selectedElement]?.y}
                                onChange={() => {}}
                                className="h-8"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="element-width" className="text-xs">
                                Width
                              </Label>
                              <Input
                                id="element-width"
                                type="number"
                                value={canvasElements[selectedElement]?.width}
                                onChange={() => {}}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label htmlFor="element-height" className="text-xs">
                                Height
                              </Label>
                              <Input
                                id="element-height"
                                type="number"
                                value={canvasElements[selectedElement]?.height}
                                onChange={() => {}}
                                className="h-8"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="element-color" className="text-xs">
                              Color
                            </Label>
                            <div className="flex gap-2">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: canvasElements[selectedElement]?.color }}
                              />
                              <Input
                                id="element-color"
                                value={canvasElements[selectedElement]?.color}
                                onChange={() => {}}
                                className="h-8 flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Select an element to edit its properties</div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Layers</h3>
                      <div className="border rounded-md overflow-hidden">
                        {canvasElements.length > 0 ? (
                          <div className="max-h-[200px] overflow-y-auto">
                            {canvasElements.map((element, index) => (
                              <div
                                key={index}
                                className={`flex items-center p-2 text-sm hover:bg-muted cursor-pointer ${
                                  selectedElement === index ? "bg-muted" : ""
                                }`}
                                onClick={() => setSelectedElement(index)}
                              >
                                <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: element.color }} />
                                {element.name}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-sm text-muted-foreground">No elements added yet</div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-0 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Code Editor</h3>
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-2 text-xs border-b flex justify-between">
                          <span>main.js</span>
                          <div className="flex gap-1">
                            <button className="hover:text-primary">
                              <Code className="h-3 w-3" />
                            </button>
                            <button className="hover:text-primary">
                              <Download className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <Textarea
                          className="font-mono text-xs border-0 resize-none h-[300px]"
                          value={`// RYPTO TEC Studio Code
// Generated JavaScript

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Initialize elements
const elements = ${JSON.stringify(canvasElements, null, 2)};

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw elements
  elements.forEach(element => {
    ctx.fillStyle = element.color;
    ctx.fillRect(
      element.x, 
      element.y, 
      element.width, 
      element.height
    );
  });
  
  requestAnimationFrame(render);
}

// Start rendering
render();`}
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Export Options</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export JS
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export HTML
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="mt-0 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">AI Assistant</h3>
                      <div className="border rounded-md p-3">
                        <p className="text-sm text-muted-foreground mb-3">
                          Describe what you want to create and our AI will help generate it.
                        </p>
                        <Textarea placeholder="Describe your design or code needs..." className="resize-none mb-3" />
                        <Button className="w-full">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate with AI
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">AI Features</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm">Smart Layout</span>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="text-sm">Code Generation</span>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Palette className="h-4 w-4 text-primary" />
                            <span className="text-sm">Color Suggestions</span>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>

          {/* Main canvas area */}
          <Card className="lg:col-span-9 h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="pb-2 border-b flex-shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Canvas</CardTitle>
                  <CardDescription>Design preview</CardDescription>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="theme-toggle" className="text-sm">
                      Theme:
                    </Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-[100px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={resetCanvas}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 relative overflow-hidden">
              <ScaleOnScroll className="w-full h-full flex items-center justify-center p-6">
                <div
                  className={`relative border rounded-lg shadow-sm overflow-hidden ${
                    theme === "dark" ? "bg-gray-900" : "bg-white"
                  }`}
                >
                  <canvas ref={canvasRef} width={800} height={500} className="touch-none" />

                  {canvasElements.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Your Canvas is Empty</h3>
                      <p className="text-muted-foreground mb-4 max-w-md">
                        Start by adding elements from the tools panel or use our AI assistant to generate a design.
                      </p>
                      <Button onClick={addElement}>
                        <Layers className="h-4 w-4 mr-2" />
                        Add Your First Element
                      </Button>
                    </div>
                  )}
                </div>
              </ScaleOnScroll>
            </CardContent>

            <CardFooter className="border-t flex-shrink-0">
              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-muted-foreground">{canvasElements.length} elements • Canvas: 800×500</div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="zoom" className="text-sm">
                      Zoom:
                    </Label>
                    <Slider id="zoom" defaultValue={[100]} max={200} min={50} step={10} className="w-32" />
                    <span className="text-sm w-10">100%</span>
                  </div>

                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
