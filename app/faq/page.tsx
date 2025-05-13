import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - RYPTO TEC INC",
  description: "Frequently asked questions about RYPTO TEC services and solutions",
}

export default function FAQPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-20">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
        <p className="text-muted-foreground md:text-xl">
          Find answers to common questions about our services and solutions
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What services does RYPTO TEC offer?</AccordionTrigger>
          <AccordionContent>
            RYPTO TEC offers a comprehensive range of technology services including custom software development,
            animation and 3D visualization, VR/AR experiences, AI integration, and digital transformation consulting.
            Our team specializes in creating innovative solutions tailored to each client's specific needs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
          <AccordionContent>
            Project timelines vary based on complexity, scope, and requirements. A simple website might take 2-4 weeks,
            while complex software applications can take 3-6 months or more. During our initial consultation, we'll
            provide a detailed timeline based on your specific project needs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is your development process?</AccordionTrigger>
          <AccordionContent>
            Our development process follows an agile methodology with clear phases: discovery and planning, design,
            development, testing, deployment, and ongoing support. We emphasize collaboration, regular communication,
            and iterative development to ensure the final product meets all requirements and exceeds expectations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer ongoing maintenance and support?</AccordionTrigger>
          <AccordionContent>
            Yes, we offer flexible maintenance and support packages tailored to your needs. These can include regular
            updates, performance monitoring, security patches, feature enhancements, and technical support. We recommend
            ongoing maintenance to ensure your solution remains secure, up-to-date, and optimized.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How do you handle project pricing?</AccordionTrigger>
          <AccordionContent>
            We offer several pricing models including fixed-price contracts, time and materials, and retainer
            agreements. The best approach depends on your project's nature and requirements. We provide transparent
            pricing with detailed proposals outlining all costs, deliverables, and timelines before any work begins.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>What technologies do you specialize in?</AccordionTrigger>
          <AccordionContent>
            Our team has expertise in a wide range of technologies including React, Next.js, Node.js, Python,
            TensorFlow, Unity, Unreal Engine, and various cloud platforms (AWS, Azure, Google Cloud). We stay current
            with emerging technologies to provide cutting-edge solutions that meet modern standards.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>How do you ensure the quality of your deliverables?</AccordionTrigger>
          <AccordionContent>
            Quality assurance is integrated throughout our development process. We implement automated testing, code
            reviews, performance testing, and user acceptance testing. Our QA team works alongside developers to
            identify and resolve issues early, ensuring a polished final product that meets all requirements.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Can you work with our existing team?</AccordionTrigger>
          <AccordionContent>
            Absolutely. We often collaborate with in-house teams, providing specialized expertise or additional
            capacity. We can integrate with your existing workflows, tools, and processes to ensure seamless
            collaboration. Our flexible engagement models allow us to complement your team effectively.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Don't see your question here? Contact us for more information.</p>
        <Button asChild variant="outline">
          <Link href="/contact">
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
