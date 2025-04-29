"use client"

import { useState } from "react"
import { Quote } from "lucide-react"
import { SectionTitle } from "./section-title"
import { AnimatedSection } from "./animated-section"

const testimonials = [
  {
    id: 1,
    content:
      "RYPTO TEC INC transformed our business with their innovative VR solution. Their team's expertise and dedication to quality is unmatched in the industry.",
    author: "Sarah Johnson",
    position: "CEO, TechVision",
  },
  {
    id: 2,
    content:
      "Working with RYPTO was a game-changer for our architectural visualization needs. Their 3D models brought our designs to life in ways we never imagined possible.",
    author: "Michael Kamara",
    position: "Lead Architect, DesignHub",
  },
  {
    id: 3,
    content:
      "The AI solution developed by RYPTO has significantly improved our customer service efficiency. Their understanding of our needs and technical execution was exceptional.",
    author: "Amara Diallo",
    position: "CTO, ServiceNow Africa",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-24 bg-muted" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Clients Say"
          subtitle="TESTIMONIALS"
          description="Hear from the organizations and individuals we've worked with"
          align="center"
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={testimonial.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="bg-card border rounded-lg p-8 md:p-12">
                  <Quote className="h-12 w-12 text-primary/20 mb-6" />
                  <p className="text-xl md:text-2xl mb-8">{testimonial.content}</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-primary" : "bg-primary/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
