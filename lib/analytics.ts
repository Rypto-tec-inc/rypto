// Simple analytics and user behavior tracking

type PageView = {
  path: string
  timestamp: number
  referrer: string | null
}

type UserInteraction = {
  type: "click" | "hover" | "scroll" | "form"
  element: string
  timestamp: number
  data?: any
}

class UserTracker {
  private pageViews: PageView[] = []
  private interactions: UserInteraction[] = []
  private sessionStartTime: number = Date.now()
  private lastActiveTime: number = Date.now()
  private isInitialized = false

  init() {
    if (this.isInitialized || typeof window === "undefined") return
    this.isInitialized = true

    // Track page view
    this.trackPageView()

    // Set up event listeners
    this.setupEventListeners()

    // Session tracking
    this.trackSession()

    console.log("User behavior tracking initialized")
  }

  private trackPageView() {
    const path = window.location.pathname
    const referrer = document.referrer || null

    this.pageViews.push({
      path,
      timestamp: Date.now(),
      referrer,
    })

    // Store in localStorage for persistence
    this.persistData()
  }

  private setupEventListeners() {
    // Click tracking
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      const elementType = target.tagName.toLowerCase()
      const elementId = target.id || ""
      const elementClass = target.className || ""

      this.trackInteraction("click", `${elementType}#${elementId}.${elementClass}`)
    })

    // Scroll tracking
    let scrollTimeout: NodeJS.Timeout
    document.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
        this.trackInteraction("scroll", "window", { scrollDepth })
      }, 300)
    })

    // Form interaction
    document.addEventListener("submit", (e) => {
      const form = e.target as HTMLFormElement
      const formId = form.id || ""
      const formAction = form.action || ""

      this.trackInteraction("form", `form#${formId}`, { action: formAction })
    })
  }

  private trackSession() {
    // Update last active time
    const updateActiveTime = () => {
      this.lastActiveTime = Date.now()
    }

    // Track user activity
    ;["click", "mousemove", "keydown", "scroll", "touchstart"].forEach((eventType) => {
      document.addEventListener(eventType, updateActiveTime)
    })

    // Check session status periodically
    setInterval(() => {
      const inactiveTime = Date.now() - this.lastActiveTime

      // If inactive for more than 30 minutes, consider it a new session
      if (inactiveTime > 30 * 60 * 1000) {
        this.sessionStartTime = Date.now()
        this.lastActiveTime = Date.now()
      }
    }, 60 * 1000) // Check every minute
  }

  trackInteraction(type: UserInteraction["type"], element: string, data?: any) {
    this.interactions.push({
      type,
      element,
      timestamp: Date.now(),
      data,
    })

    // Don't persist on every interaction to avoid performance issues
    // Only persist after accumulating several or on important events
    if (this.interactions.length % 10 === 0 || type === "form") {
      this.persistData()
    }
  }

  private persistData() {
    try {
      localStorage.setItem("rypto_pageviews", JSON.stringify(this.pageViews))
      localStorage.setItem("rypto_interactions", JSON.stringify(this.interactions))
    } catch (error) {
      console.error("Error persisting analytics data:", error)
    }
  }

  getSessionDuration() {
    return Math.round((Date.now() - this.sessionStartTime) / 1000)
  }

  getMostVisitedPages(limit = 5): string[] {
    const pageCounts: Record<string, number> = {}

    this.pageViews.forEach((view) => {
      pageCounts[view.path] = (pageCounts[view.path] || 0) + 1
    })

    return Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([path]) => path)
  }

  getRecommendations(): string[] {
    // Simple recommendation algorithm based on page views
    const visitedPages = this.getMostVisitedPages()

    // If user has visited work page, recommend gallery and projects
    if (visitedPages.includes("/work")) {
      return ["/gallery", "/projects"]
    }

    // If user has visited services, recommend contact
    if (visitedPages.includes("/services")) {
      return ["/contact"]
    }

    // Default recommendations
    return ["/work", "/services", "/about"]
  }

  getUserProfile() {
    return {
      sessionDuration: this.getSessionDuration(),
      pageViews: this.pageViews.length,
      interactions: this.interactions.length,
      mostVisitedPages: this.getMostVisitedPages(),
      recommendations: this.getRecommendations(),
    }
  }
}

// Export singleton instance
export const userTracker = new UserTracker()
