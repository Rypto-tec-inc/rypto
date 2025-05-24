"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const ref1 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    service: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      })
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        service: "general",
      })
    }, 1500)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl gradient-text">Contact Us</h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            Have a question or want to discuss a project? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 rounded-lg border-primary/10"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="glass-card border-primary/20"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="glass-card border-primary/20"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  className="glass-card border-primary/20"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium">
                  Service You're Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full rounded-md glass-card border-primary/20 p-2"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="software">Software Development</option>
                  <option value="animation">3D Animation</option>
                  <option value="vr">VR/AR Development</option>
                  <option value="other">Other Services</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project or question..."
                  rows={5}
                  required
                  className="glass-card border-primary/20"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full hover-glow" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-lg border-primary/10">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-muted-foreground">
                      RYPTO TEC Headquarters
                      <br />
                      Monrovia, Liberia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:rypto2099@gmail.com" className="hover:text-primary">
                        rypto2099@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+2310776800064" className="hover:text-primary">
                        +231 0776800064
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg border-primary/10">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Meet Our Founder</h2>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2-0FakLV0tIP3iJoelQjfSMzKRs69LSt.png"
                    alt="Victor Edet Coleman"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Victor Edet Coleman</h3>
                  <p className="text-sm text-muted-foreground mb-2">Founder & CEO</p>
                  <p className="text-sm">
                    Software Engineer and 3D Animator/Modeler with a passion for creating innovative solutions and
                    transforming ideas into reality.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/about">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map and Locations */}
        <div ref={ref1} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl gradient-text">Our Location</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Visit us at our office in Monrovia, Liberia or reach out to our team online.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 rounded-lg border-primary/10"
          >
            <div className="h-[400px] relative rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63520.00434580661!2d-10.8169863!3d6.3158209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0a0279b3453bfd%3A0x5df5c0deb1e9bdd9!2sMonrovia%2C%20Liberia!5e0!3m2!1sen!2sus!4v1715553600000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="RYPTO TEC Headquarters Map"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-lg border-primary/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "What services does RYPTO TEC INC offer?",
                answer:
                  "We offer a wide range of services including software development, 3D animation, VR/AR development, and emerging technology solutions. Our team specializes in creating custom solutions tailored to your specific needs and goals.",
              },
              {
                question: "How do I request a quote for my project?",
                answer:
                  "You can request a quote by filling out our contact form, sending us an email at rypto2099@gmail.com, or giving us a call at +231 0776800064. We'll schedule a consultation to discuss your project requirements and provide you with a detailed proposal and estimate.",
              },
              {
                question: "What is your typical project timeline?",
                answer:
                  "Project timelines vary depending on the scope and complexity of the work. Small projects may take a few weeks, while larger, more complex projects can take several months. We'll provide you with a detailed timeline during the proposal phase.",
              },
              {
                question: "Do you offer ongoing support and maintenance?",
                answer:
                  "Yes, we offer ongoing support and maintenance for all our projects. We can create a custom support plan tailored to your needs, ensuring your solution continues to perform optimally long after the initial development is complete.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Don't see your question here? Reach out to us directly and we'll be happy to help.
            </p>
            <Button asChild className="hover-glow">
              <Link href="#" onClick={() => document.getElementById("name").focus()}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask a Question
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
