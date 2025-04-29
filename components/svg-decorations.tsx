import { cn } from "@/lib/utils"

interface SVGDecorationProps {
  className?: string
  type: "circles" | "grid" | "dots" | "waves" | "triangles"
  color?: string
  width?: number
  height?: number
}

export function SVGDecoration({
  className,
  type,
  color = "currentColor",
  width = 200,
  height = 200,
}: SVGDecorationProps) {
  const renderSVG = () => {
    switch (type) {
      case "circles":
        return (
          <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("svg-decoration", className)}
          >
            <circle cx="30" cy="30" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="70" cy="30" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="110" cy="30" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="150" cy="30" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="30" cy="70" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="70" cy="70" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="110" cy="70" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="150" cy="70" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="30" cy="110" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="70" cy="110" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="110" cy="110" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="150" cy="110" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="30" cy="150" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="70" cy="150" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="110" cy="150" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="150" cy="150" r="10" fill={color} fillOpacity="0.1" />
          </svg>
        )
      case "grid":
        return (
          <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("svg-decoration", className)}
          >
            <line x1="0" y1="0" x2="200" y2="0" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="40" x2="200" y2="40" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="80" x2="200" y2="80" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="120" x2="200" y2="120" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="160" x2="200" y2="160" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="200" x2="200" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="40" y1="0" x2="40" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="80" y1="0" x2="80" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="120" y1="0" x2="120" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="160" y1="0" x2="160" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
            <line x1="200" y1="0" x2="200" y2="200" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
          </svg>
        )
      case "dots":
        return (
          <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("svg-decoration", className)}
          >
            {Array.from({ length: 10 }).map((_, i) =>
              Array.from({ length: 10 }).map((_, j) => (
                <circle key={`${i}-${j}`} cx={i * 20 + 10} cy={j * 20 + 10} r="2" fill={color} fillOpacity="0.2" />
              )),
            )}
          </svg>
        )
      case "waves":
        return (
          <svg
            width={width}
            height={height}
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("svg-decoration", className)}
          >
            <path
              d="M0 50C20 30 40 70 60 50C80 30 100 70 120 50C140 30 160 70 180 50C200 30 220 70 240 50"
              stroke={color}
              strokeOpacity="0.2"
              strokeWidth="2"
            />
            <path
              d="M0 70C20 50 40 90 60 70C80 50 100 90 120 70C140 50 160 90 180 70C200 50 220 90 240 70"
              stroke={color}
              strokeOpacity="0.1"
              strokeWidth="2"
            />
            <path
              d="M0 30C20 10 40 50 60 30C80 10 100 50 120 30C140 10 160 50 180 30C200 10 220 50 240 30"
              stroke={color}
              strokeOpacity="0.1"
              strokeWidth="2"
            />
          </svg>
        )
      case "triangles":
        return (
          <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("svg-decoration", className)}
          >
            <path d="M20 20L40 50L0 50L20 20Z" fill={color} fillOpacity="0.1" />
            <path d="M70 20L90 50L50 50L70 20Z" fill={color} fillOpacity="0.1" />
            <path d="M120 20L140 50L100 50L120 20Z" fill={color} fillOpacity="0.1" />
            <path d="M170 20L190 50L150 50L170 20Z" fill={color} fillOpacity="0.1" />
            <path d="M20 70L40 100L0 100L20 70Z" fill={color} fillOpacity="0.1" />
            <path d="M70 70L90 100L50 100L70 70Z" fill={color} fillOpacity="0.1" />
            <path d="M120 70L140 100L100 100L120 70Z" fill={color} fillOpacity="0.1" />
            <path d="M170 70L190 100L150 100L170 70Z" fill={color} fillOpacity="0.1" />
            <path d="M20 120L40 150L0 150L20 120Z" fill={color} fillOpacity="0.1" />
            <path d="M70 120L90 150L50 150L70 120Z" fill={color} fillOpacity="0.1" />
            <path d="M120 120L140 150L100 150L120 120Z" fill={color} fillOpacity="0.1" />
            <path d="M170 120L190 150L150 150L170 120Z" fill={color} fillOpacity="0.1" />
          </svg>
        )
      default:
        return null
    }
  }

  return renderSVG()
}
