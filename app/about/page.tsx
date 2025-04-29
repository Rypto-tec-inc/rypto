"use client"

import { useState, useEffect } from "react"
import { ParallaxSection } from "@/components/parallax-section"
import { Skeleton } from "@/components/ui/skeleton"

export default function AboutPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-background border-b">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <div className="text-sm text-muted-foreground mb-4">WHO WE ARE</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
              RYPTO <span className="text-primary">TEC INC</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A next-generation Liberian technology company focused on building immersive digital experiences and
              advanced software systems.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold mb-8">Our Identity</h2>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-4/5" />
                </div>
              ) : (
                <div className="space-y-6 text-lg">
                  <p>
                    Founded in 2023 by Victor Edet Coleman, RYPTO represents the vision of a new, self-driven African
                    tech movement—one that doesn't wait for permission, funding, or approval to innovate.
                  </p>
                  <p>
                    At our core, we are a collective of developers, designers, engineers, and dreamers pushing the
                    boundaries of what's possible with code, creativity, and 3D computation.
                  </p>
                  <p>
                    We exist to empower the digital future of Africa—with products, platforms, and innovations built by
                    us and for us.
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="bg-muted p-8 rounded-lg">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Company Name</div>
                      <div className="font-medium">RYPTO TEC INC</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Founded</div>
                      <div className="font-medium">2023</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Founder</div>
                      <div className="font-medium">Victor Edet Coleman</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Industry</div>
                      <div className="font-medium">Technology, Software, VR/AR, AI, Architecture</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">Monrovia, Liberia</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <div className="text-8xl font-bold text-primary mb-6">01</div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : (
                <p className="text-muted-foreground">
                  To design and develop transformative technology experiences that serve communities, spark creativity,
                  and raise the standard of African innovation on a global scale.
                </p>
              )}

              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">We believe:</h3>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Technology should reflect the culture it comes from.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Africa has the talent—it needs platforms and purpose.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>
                        Real innovation isn't about trends—it's about solving real problems with lasting impact.
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div>
              <div className="text-8xl font-bold text-primary mb-6">02</div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-muted-foreground">
                  A future where Liberia is not just a consumer of global tech, but a creator of it.
                </p>
              )}

              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">We aim to become:</h3>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>A hub for immersive tech in West Africa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>A training ground for software engineers and 3D creators.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>
                        A beacon of homegrown innovation, proving world-class products can come from local soil.
                      </span>
                    </li>
                  </ul>
                )}
              </div>

              <div className="mt-12 p-4 border-l-4 border-primary">
                <p className="text-xl font-medium">We don't follow the rules—we rewrite them.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ParallaxSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loading ? (
                <>
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
                </>
              ) : (
                <>
                  <div className="p-6 rounded-lg border">
                    <div className="text-5xl font-bold mb-4">92%</div>
                    <p className="text-muted-foreground">
                      Of our projects are focused on solving unique African challenges with innovative technology
                    </p>
                  </div>
                  <div className="p-6 rounded-lg border">
                    <div className="text-5xl font-bold mb-4">64%</div>
                    <p className="text-muted-foreground">
                      Of our solutions are designed to work in low-bandwidth and offline environments
                    </p>
                  </div>
                  <div className="p-6 rounded-lg border">
                    <div className="text-5xl font-bold mb-4">100%</div>
                    <p className="text-muted-foreground">
                      Committed to building technology that empowers African communities
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* What We Do */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-sm text-muted-foreground mb-2">WHAT WE DO</div>
            <h2 className="text-4xl font-bold">Core Competencies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </>
            ) : (
              <>
                <div className="p-8 border rounded-lg">
                  <div className="text-primary text-lg font-medium mb-2">01. Software Engineering</div>
                  <p className="mb-6">
                    Full-stack development (Web, Desktop, Mobile), System tools, utilities, and product-based software
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Full-stack Web Development</li>
                    <li>• Mobile App Development</li>
                    <li>• Desktop Applications</li>
                  </ul>
                </div>

                <div className="p-8 border rounded-lg">
                  <div className="text-primary text-lg font-medium mb-2">02. Extended Reality (XR)</div>
                  <p className="mb-6">
                    VR/AR experiences for education, health, entertainment with Unity, A-Frame, and WebXR expertise
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• VR Applications</li>
                    <li>• AR Solutions</li>
                    <li>• 360° Virtual Tours</li>
                  </ul>
                </div>

                <div className="p-8 border rounded-lg">
                  <div className="text-primary text-lg font-medium mb-2">03. 3D Content Creation</div>
                  <p className="mb-6">
                    Blender-based modeling, animation, and visualization for architecture, games, and simulation
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 3D Modeling</li>
                    <li>• Animation</li>
                    <li>• Architectural Visualization</li>
                  </ul>
                </div>

                <div className="p-8 border rounded-lg">
                  <div className="text-primary text-lg font-medium mb-2">04. AI & Automation</div>
                  <p className="mb-6">
                    Custom AI tools for business, language processing, and specialized in underrepresented languages
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Chatbots & Virtual Assistants</li>
                    <li>• Natural Language Processing</li>
                    <li>• Predictive Analytics</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-muted-foreground mb-2">LEADERSHIP</div>
              <h2 className="text-4xl font-bold">Meet the Founder</h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center text-center">
                <Skeleton className="h-32 w-32 rounded-full mb-6" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-4 w-full max-w-md mb-1" />
                <Skeleton className="h-4 w-full max-w-md mb-1" />
                <Skeleton className="h-4 w-full max-w-md mb-1" />
                <Skeleton className="h-4 w-3/4 max-w-md" />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-muted mb-6 flex items-center justify-center">
                  <span className="text-4xl font-bold">VC</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Victor Edet Coleman</h3>
                <p className="text-primary mb-6">Founder & CEO</p>
                <p className="text-muted-foreground max-w-md">
                  A visionary technologist with a passion for leveraging technology to solve African challenges. Victor
                  founded RYPTO TEC INC with the goal of building a digital ecosystem that empowers Liberians and
                  Africans to lead in global tech innovation.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
