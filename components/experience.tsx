"use client"

import Image from "next/image"
import { Calendar, Building2 } from "lucide-react"

export default function Experience() {
  const experiences = [
    {
      title: "Active Student",
      company: "Universitas Atma Jaya Yogyakarta",
      period: "2022 - Present",
      description:
        "Currently studying Computer Science with focus on web development and cybersecurity. Continuously learning and growing through coursework and personal projects.",
      skills: ["Web Development", "Cybersecurity", "Problem Solving"],
      icon: "/uajy-logo.png", // Moved UAJY logo here
      isLogo: true,
    },
    {
      title: "Organization Experience",
      company: "PMK Melisia Christi",
      period: "2022 - 2024",
      description: "Active member and coordinator in various organizational roles including Pubdokmed and Treasury.",
      skills: ["Leadership", "Management", "Documentation"],
      icon: "🤝",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-96 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 -right-96 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center animate-slide-up">
          My <span className="text-amber-600 dark:text-amber-400 animate-text-glow">Journey</span>
        </h2>
        <p
          className="text-center text-sm md:text-base text-foreground/60 mb-8 md:mb-12 max-w-2xl mx-auto animate-slide-up px-2"
          style={{ animationDelay: "50ms" }}
        >
          Experience and professional development
        </p>

        <div className="space-y-6 max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-card border-4 border-amber-500/30 dark:border-amber-500/40 rounded-xl p-3 md:p-8 hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 animate-slide-up group relative overflow-hidden ${
                exp.comingSoon ? "opacity-80 hover:opacity-100" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {exp.comingSoon && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-amber-500/50 to-sky-500/50 px-2 md:px-3 py-1 rounded-full text-xs font-bold text-amber-100 dark:text-amber-200 animate-border-pulse">
                  Coming Soon
                </div>
              )}

              <div className="flex items-start gap-4 md:gap-6 mb-4 relative z-10">
                {exp.isLogo ? (
                  <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 animate-float">
                    <Image
                      src={exp.icon || "/placeholder.svg"}
                      alt="UAJY"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-3xl md:text-4xl group-hover:animate-float flex-shrink-0">{exp.icon}</div>
                )}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base md:text-2xl font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors animate-slide-in-right break-words"
                    style={{ animationDelay: `${index * 100 + 50}ms` }}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-4 mt-2 text-xs md:text-sm">
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors min-w-0">
                      <Building2 size={14} className="flex-shrink-0" />
                      <span className="truncate text-xs">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-foreground/60 group-hover:text-foreground/80 transition-colors flex-shrink-0">
                      <Calendar size={14} />
                      <span className="whitespace-nowrap text-xs">{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-base text-foreground/80 mb-3 md:mb-4 leading-relaxed relative z-10 group-hover:text-foreground transition-colors">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1 md:gap-2 relative z-10">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 md:px-3 py-0.5 md:py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs rounded-full font-medium group-hover:border-amber-500/70 group-hover:bg-amber-500/20 transition-all duration-300 animate-slide-up whitespace-nowrap"
                    style={{ animationDelay: `${index * 100 + i * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
