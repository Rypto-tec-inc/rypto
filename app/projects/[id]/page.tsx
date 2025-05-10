"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample project data
const projectsData = [
  {
    id: "1",
    title: "VR Architectural Visualization",
    description:
      "An immersive virtual reality experience allowing clients to explore architectural designs before construction begins. This project showcases our expertise in VR technology and 3D modeling.",
    fullDescription:
      "This project involved creating a fully immersive virtual reality experience for architectural visualization. We developed a detailed 3D model of the proposed building, complete with realistic textures, lighting, and interactive elements. Users can navigate through the virtual space, interact with objects, and visualize different design options in real-time. The solution includes custom VR controllers, spatial audio, and realistic physics to enhance the immersion. This tool has revolutionized the client's design review process, allowing stakeholders to experience the space before construction begins.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    categories: ["VR/AR", "3D Modeling", "Interactive"],
    client: "Modern Architects Inc.",
    year: "2023",
    duration: "4 months",
    team: ["Project Manager", "VR Developer", "3D Artist", "UI/UX Designer"],
    technologies: ["Unity", "Blender", "Oculus SDK", "C#"],
    challenges:
      "One of the main challenges was optimizing the 3D models and textures to maintain high visual fidelity while ensuring smooth performance in VR. We implemented various optimization techniques, including LOD (Level of Detail) systems, texture atlasing, and occlusion culling to achieve the desired balance between visual quality and performance.",
    results:
      "The VR experience has significantly improved the client's design review process, reducing the need for physical mockups and allowing for faster iteration on design changes. Stakeholders can now make more informed decisions earlier in the design process, leading to cost savings and improved client satisfaction.",
    testimonial: {
      quote:
        "The VR experience created by RYPTO TEC INC has transformed how we present designs to our clients. It's an invaluable tool that has improved our design process and client satisfaction.",
      author: "John Smith",
      position: "Design Director, Modern Architects Inc.",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "E-Commerce Platform Redesign",
    description:
      "Complete redesign and development of an e-commerce platform, improving user experience and increasing conversion rates.",
    fullDescription:
      "This project involved a comprehensive redesign and development of an e-commerce platform for a global retail client. We conducted extensive user research to identify pain points in the existing platform and developed a new design that prioritizes user experience, accessibility, and conversion optimization. The new platform features a streamlined checkout process, advanced product filtering, personalized recommendations, and a responsive design that works seamlessly across all devices. We also implemented a robust content management system that allows the client to easily manage products, promotions, and content.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    categories: ["Web Development", "UI/UX Design", "E-Commerce"],
    client: "Global Retail Solutions",
    year: "2023",
    duration: "6 months",
    team: ["Project Manager", "UI/UX Designer", "Frontend Developer", "Backend Developer", "QA Engineer"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    challenges:
      "The main challenge was migrating the existing product database and user accounts without disrupting the business operations. We developed a phased migration strategy and implemented a dual-write system to ensure data consistency during the transition period. Another challenge was optimizing the site performance with a large product catalog, which we addressed through efficient data fetching, caching strategies, and image optimization.",
    results:
      "The redesigned platform resulted in a 35% increase in conversion rate, 28% reduction in cart abandonment, and 42% increase in average order value. The improved mobile experience led to a 50% increase in mobile transactions. The client also reported a significant reduction in customer support inquiries related to website usability issues.",
    testimonial: {
      quote:
        "RYPTO TEC INC delivered a transformative e-commerce platform that exceeded our expectations. The attention to detail in the user experience design and the technical implementation has significantly improved our online sales performance.",
      author: "Sarah Johnson",
      position: "E-Commerce Director, Global Retail Solutions",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Mobile Banking Application",
    description:
      "A secure and user-friendly mobile banking application with advanced features and biometric authentication.",
    fullDescription:
      "We developed a comprehensive mobile banking application that provides users with a secure and intuitive way to manage their finances on the go. The application includes features such as account management, fund transfers, bill payments, mobile check deposits, and financial insights. Security was a top priority, with implementation of biometric authentication, encryption, and fraud detection systems. The app was designed with a focus on accessibility and usability, ensuring that all users, including those with disabilities, can easily navigate and use the application.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    categories: ["Mobile Development", "FinTech", "Security"],
    client: "NextGen Banking",
    year: "2023",
    duration: "8 months",
    team: [
      "Project Manager",
      "UI/UX Designer",
      "iOS Developer",
      "Android Developer",
      "Backend Developer",
      "Security Specialist",
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "AWS"],
    challenges:
      "The primary challenge was ensuring the highest level of security while maintaining a seamless user experience. We implemented a multi-layered security approach, including biometric authentication, encryption, and real-time fraud detection. Another challenge was integrating with the bank's legacy core banking systems, which required developing custom APIs and middleware to ensure reliable data exchange.",
    results:
      "The application has been downloaded by over 500,000 users with a 4.8/5 rating on app stores. It has reduced branch visits by 35% and call center volume by 28%. The bank has reported a 40% increase in mobile banking adoption among their customers, with particularly strong growth in the 55+ age demographic, which was previously underrepresented in mobile banking usage.",
    testimonial: {
      quote: "RYPTO TEC INC delivered a mobile banking application that has transformed our mobile banking services.",
      author: "David Lee",
      position: "CTO, NextGen Banking",
    },
  },
]

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === params.id)
    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push("/projects")
    }
  }, [params.id, router])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      className="container mx-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-4">{project.title}</h1>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{project.year}</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-4 w-4 text-gray-500" />
            <span>Client: {project.client}</span>
          </div>
          <p className="text-gray-600 mb-6">{project.fullDescription}</p>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Technologies</h3>
            <ul className="list-disc list-inside text-gray-600">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Team</h3>
            <ul className="list-disc list-inside text-gray-600">
              {project.team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Challenges</h3>
            <p className="text-gray-600">{project.challenges}</p>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Results</h3>
            <p className="text-gray-600">{project.results}</p>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Testimonial</h3>
              <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700">
                {project.testimonial.quote}
                <cite className="block mt-2 not-italic">
                  - {project.testimonial.author}, {project.testimonial.position}
                </cite>
              </blockquote>
            </div>
          )}
        </div>

        {/* Project Media */}
        <div>
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={600}
            className="rounded-lg shadow-md mb-4"
          />

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.gallery.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${project.title} - Gallery ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>

          {/* Video */}
          {project.videoUrl && (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={project.videoUrl}
                title="Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
