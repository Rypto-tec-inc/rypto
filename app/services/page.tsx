import { ArrowRight, Code, Layers, Cpu, Smartphone, Braces, Headset } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              We specialize in cutting-edge technologies to create innovative solutions tailored for the African
              ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section>
        <div className="section-container">
          <div className="space-y-24">
            {/* Service 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                  <Code className="h-8 w-8" />
                </div>
                <h2 className="heading-lg mb-4">Software Engineering</h2>
                <p className="text-lg mb-6">
                  We build robust, scalable software solutions for web, mobile, and desktop platforms.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">Full-stack Web Development</h4>
                      <p className="text-muted-foreground">Modern, responsive web applications</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">Mobile App Development</h4>
                      <p className="text-muted-foreground">Native and cross-platform mobile applications</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">Desktop Applications</h4>
                      <p className="text-muted-foreground">High-performance desktop software</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-secondary rounded-lg p-8 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold mb-4">{"</>"}</p>
                  <p className="text-muted-foreground">Custom Software Solutions</p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-secondary rounded-lg p-8 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold mb-4">VR</p>
                  <p className="text-muted-foreground">Immersive Experiences</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                  <Headset className="h-8 w-8" />
                </div>
                <h2 className="heading-lg mb-4">Virtual & Augmented Reality</h2>
                <p className="text-lg mb-6">
                  We create immersive VR and AR experiences that transform how users interact with digital content.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">VR Applications</h4>
                      <p className="text-muted-foreground">Fully immersive virtual reality experiences</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">AR Solutions</h4>
                      <p className="text-muted-foreground">Augmented reality for mobile and wearable devices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">360° Virtual Tours</h4>
                      <p className="text-muted-foreground">Interactive panoramic experiences</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                  <Cpu className="h-8 w-8" />
                </div>
                <h2 className="heading-lg mb-4">AI-powered Tools</h2>
                <p className="text-lg mb-6">
                  We develop intelligent systems and chatbots that leverage artificial intelligence to solve complex
                  problems.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">Chatbots & Virtual Assistants</h4>
                      <p className="text-muted-foreground">Intelligent conversational interfaces</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">Natural Language Processing</h4>
                      <p className="text-muted-foreground">Support for African languages and dialects</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">Predictive Analytics</h4>
                      <p className="text-muted-foreground">Data-driven insights and forecasting</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-secondary rounded-lg p-8 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold mb-4">AI</p>
                  <p className="text-muted-foreground">Intelligent Solutions</p>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h2 className="heading-lg text-center mb-12">Additional Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg border bg-card">
                  <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Game Development</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive games and simulations for education, entertainment, and training.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Architectural Visualization</h3>
                  <p className="text-muted-foreground mb-4">
                    3D modeling and visualization services for architectural and urban planning projects.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <div className="p-3 rounded-md bg-primary/10 w-fit mb-4">
                    <Braces className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cybersecurity</h3>
                  <p className="text-muted-foreground mb-4">
                    Security solutions and ethical hacking services to protect digital assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-secondary">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Industries We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our solutions are tailored for various sectors across Africa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "Education",
              "Healthcare",
              "Finance",
              "Agriculture",
              "Tourism",
              "Retail",
              "Government",
              "Manufacturing",
              "Energy",
              "Transportation",
              "Media",
              "Real Estate",
            ].map((industry, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card text-center hover:border-primary transition-colors"
              >
                <p className="font-medium">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <h2 className="heading-lg mb-6">Ready to start your project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact us to discuss how we can help bring your ideas to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
