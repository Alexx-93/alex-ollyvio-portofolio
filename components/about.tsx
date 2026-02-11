"use client"

import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-background/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center animate-slide-up">
          About <span className="text-amber-600 dark:text-amber-400">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center animate-slide-in-left">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-sky-500 to-amber-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow"></div>
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-amber-500/50 dark:border-amber-500/60 shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 bg-card animate-border-pulse group-hover:animate-border-pulse">
                <Image
                  src="/alexander-profile.jpg"
                  alt="Alexander Ollyvio Kristo Sentono"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 animate-glow-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="bg-card border-2 border-amber-500/20 dark:border-amber-500/30 rounded-xl p-4 md:p-8 space-y-4 md:space-y-6 hover:border-amber-500/50 transition-all duration-300 relative group overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4 md:space-y-6">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed animate-slide-up">
                  Hi! I'm{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                    Alexander Ollyvio Kristo Sentono
                  </span>
                  , a computer science student at{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                    Atma Jaya Yogyakarta University
                  </span>{" "}
                  passionate about web development and cybersecurity. Outside of tech, I am an avid mountain climber who
                  finds peace and perspective at high altitudes, having conquered peaks like Mt. Lawu and Mt. Merbabu.
                </p>

                <p
                  className="text-base md:text-lg text-foreground/80 leading-relaxed animate-slide-up"
                  style={{ animationDelay: "100ms" }}
                >
                  I love building useful things that people can actually use, and I believe curiosity, hard work, and
                  adaptability are essential in any project. For me, technology isn't just about writing code—it's about
                  finding creative ways to solve real problems.
                </p>

                <p
                  className="text-base md:text-lg text-foreground/80 leading-relaxed animate-slide-up"
                  style={{ animationDelay: "200ms" }}
                >
                  That's why I always try to understand what people need and genuinely enjoy collaborating in every
                  project I take on. I'm constantly learning and excited about what's next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
