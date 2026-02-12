"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Platform e-commerce modern dengan fitur pembayaran, inventory management, dan admin dashboard.",
      image: "/ecommerce-platform.jpg",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "full-stack",
      link: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description: "Aplikasi manajemen tugas real-time dengan kolaborasi tim, notifikasi, dan integrasi calendar.",
      image: "/task-management-board.png",
      tags: ["React", "Firebase", "Tailwind CSS"],
      category: "frontend",
      link: "#",
      github: "#",
    },
    {
      title: "Analytics Dashboard",
      description: "Dashboard analytics komprehensif dengan visualisasi data real-time dan laporan bisnis interaktif.",
      image: "/analytics-dashboard.png",
      tags: ["Next.js", "Chart.js", "PostgreSQL"],
      category: "full-stack",
      link: "#",
      github: "#",
    },
    {
      title: "Social Media App",
      description: "Aplikasi media sosial dengan fitur posting, messaging, dan sistem notifikasi real-time.",
      image: "/social-media.jpg",
      tags: ["React", "WebSocket", "MongoDB"],
      category: "frontend",
      link: "#",
      github: "#",
    },
    {
      title: "Learning Platform",
      description: "Platform pembelajaran online dengan video streaming, quiz, dan tracking progress siswa.",
      image: "/learning-platform.jpg",
      tags: ["Next.js", "Stripe", "AWS S3"],
      category: "full-stack",
      link: "#",
      github: "#",
    },
    {
      title: "CRM System",
      description: "Sistem CRM untuk manajemen pelanggan dengan pipeline sales, lead tracking, dan reporting.",
      image: "/crm-system.jpg",
      tags: ["React", "Express", "PostgreSQL"],
      category: "full-stack",
      link: "#",
      github: "#",
    },
  ]

  const categories = [
    { label: "Semua", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Full Stack", value: "full-stack" },
  ]

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:py-28 bg-background">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Proyek <span className="text-primary">Terbaru</span>
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-foreground/60 sm:text-base md:text-lg max-w-3xl mx-auto">
            Koleksi proyek-proyek yang telah saya kerjakan menampilkan kemampuan dalam berbagai teknologi dan metodologi
            pengembangan.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3 md:mb-12 lg:mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all sm:px-6 ${
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-40 overflow-hidden bg-muted sm:h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="text-lg font-bold text-foreground sm:text-xl">{project.title}</h3>

                <p className="mt-2 line-clamp-2 text-sm text-foreground/70">{project.description}</p>

                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-2 py-1 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">
                  <a
                    href={project.link}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:px-4"
                  >
                    Lihat <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.github}
                    className="inline-flex items-center justify-center rounded-lg border border-primary px-3 py-2 text-sm text-primary transition-all hover:bg-primary/10 sm:px-4"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
