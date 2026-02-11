"use client"

import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count}+</span>
}

function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={className}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-slide-up"
          style={{
            animationDelay: `${delay + index * 50}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  )
}

export default function Hero({
  setActiveSection,
}: {
  setActiveSection: (section: string) => void
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleScroll = () => {
    setActiveSection("about")
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-subtle" />

      <div className="grid lg:grid-cols-2 w-full max-w-[1400px] gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6 md:space-y-8 text-left">
          <div className="space-y-2">
            {/* Added animate-slide-up to the paragraph */}
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm animate-slide-up">
              Personal Showcase
            </p>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-balance overflow-hidden">
              <span className="block animate-slide-up" style={{ animationDelay: "100ms" }}>
                PORTFOLIO
              </span>
              <span className="block animate-slide-up" style={{ animationDelay: "200ms" }}>
                <span className="text-primary italic">Alexander</span> OLLYVIO.
              </span>
            </h1>
          </div>

          <div className="max-w-md space-y-6">
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              Computer Science student at Universitas Atma Jaya Yogyakarta. Bridging the gap between technical
              foundations and thoughtful design.
            </p>

            <div className="flex gap-6">
              <button
                onClick={handleScroll}
                className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase
                           border-b-2 border-primary pb-1
                           hover:text-primary transition-colors"
              >
                Explore Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE (SLIGHTLY SMALLER) */}
        <div
          className="relative aspect-square md:aspect-[4/5]
                     w-[90%] lg:w-[85%]
                     max-h-[440px] md:max-h-[520px]
                     justify-self-end
                     overflow-hidden rounded-xl shadow-2xl animate-reveal perspective-1000"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="/images/img-2273.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-90
                       hover:scale-110 transition-transform duration-1000 ease-out"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

          {/* IMAGE CAPTION */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-white/80 text-[10px] md:text-xs tracking-widest uppercase vertical-rl">
              © 2025 SERIES
            </div>
            <div className="text-white/80 text-[10px] md:text-xs tracking-widest uppercase">MERBABU PEAK</div>
          </div>
        </div>
      </div>
    </section>
  )
}
