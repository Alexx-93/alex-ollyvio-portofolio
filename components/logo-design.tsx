export default function LogoDesign() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#0099ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#6600ff" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="xGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff006e" stopOpacity="1" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#6600ff" stopOpacity="1" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glitch-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>

        {/* Outer glitch circles */}
        <g className="animate-glitch-color-1" style={{ animationDelay: "0s" }}>
          <circle cx="100" cy="100" r="95" fill="none" stroke="#ff006e" strokeWidth="1.5" opacity="0.2" />
        </g>

        <g className="animate-glitch-color-2" style={{ animationDelay: "0.5s" }}>
          <circle cx="100" cy="100" r="95" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.2" />
        </g>

        {/* Main X lines with glitch effect */}
        <g filter="url(#glow)" className="animate-glitch-shift">
          <line x1="50" y1="50" x2="150" y2="150" stroke="url(#xGradient)" strokeWidth="8" strokeLinecap="round" />
          <line x1="150" y1="50" x2="50" y2="150" stroke="url(#xGradient)" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Glitch duplicates for effect */}
        <g className="animate-glitch-offset-1" style={{ animationDelay: "0.1s" }} opacity="0.5">
          <line x1="50" y1="50" x2="150" y2="150" stroke="#ff006e" strokeWidth="7" strokeLinecap="round" />
        </g>

        <g className="animate-glitch-offset-2" style={{ animationDelay: "0.2s" }} opacity="0.5">
          <line x1="150" y1="50" x2="50" y2="150" stroke="#00d4ff" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* Center pulse circle */}
        <circle cx="100" cy="100" r="12" fill="url(#xGradient)" filter="url(#glow)" className="animate-pulse-slow" />

        {/* Inner concentric circles */}
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="url(#xGradient2)"
          strokeWidth="1.5"
          opacity="0.25"
          className="animate-rotate-slow"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="url(#xGradient)"
          strokeWidth="1.5"
          opacity="0.15"
          className="animate-glitch-spin-reverse"
        />

        {/* Corner accents for cyberpunk feel */}
        <g className="animate-glitch-flicker">
          <rect x="30" y="30" width="8" height="8" fill="url(#xGradient)" opacity="0.8" />
          <rect x="162" y="30" width="8" height="8" fill="url(#xGradient)" opacity="0.8" />
          <rect x="30" y="162" width="8" height="8" fill="url(#xGradient)" opacity="0.8" />
          <rect x="162" y="162" width="8" height="8" fill="url(#xGradient)" opacity="0.8" />
        </g>
      </svg>

      {/* Glitch effect overlay */}
      <div className="absolute inset-0 animate-glitch-distort opacity-30 pointer-events-none"></div>
    </div>
  )
}
