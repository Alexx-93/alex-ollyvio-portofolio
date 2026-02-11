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
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Proyek <span className="text-primary">Terbaru</span>
        </h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          Koleksi proyek-proyek yang telah saya kerjakan menampilkan kemampuan dalam berbagai teknologi dan metodologi
          pengembangan.
        </p>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden h-48 bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>

                <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-xs rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.link}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all text-sm group/btn"
                  >
                    Lihat <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.github}
                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all text-sm"
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
