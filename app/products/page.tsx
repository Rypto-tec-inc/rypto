"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const PRODUCTS = [
  {
    name: "Rypto Core Platform",
    description: "Our flagship blockchain and AI integration platform",
    team: "Tech Team",
    status: "Active",
    image: "/products/core-platform.jpg"
  },
  {
    name: "Rypto Studio Creative Suite",
    description: "Advanced creative tools for digital content creators",
    team: "Studio Team",
    status: "Beta",
    image: "/products/creative-suite.jpg"
  }
]

export default function ProductsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-center mb-12">Rypto Products</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {PRODUCTS.map((product, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{product.team}</span>
                <span 
                  className={`px-3 py-1 rounded-full text-xs ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="mb-4">{product.description}</p>
              <Link 
                href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
