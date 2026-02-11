"use client"

import { useState } from "react"

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const skillCategories = [
    {
      category: "Frontend",
      id: "frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    },
    {
      category: "Backend",
      id: "backend",
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools & Platform",
      id: "tools",
      skills: ["Git", "Docker", "AWS", "Firebase", "Vercel"],
    },
    {
      category: "Soft Skills",
      id: "soft",
      skills: ["Problem Solving", "Team Leadership", "Communication", "Project Management"],
    },
  ]

  const categories = skillCategories.map((cat) => ({ label: cat.category, id: cat.id }))
  const activeSkillsData = skillCategories.find((cat) => cat.id === activeCategory)

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Keterampilan <span className="text-primary">Teknis</span>
        </h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          Penguasaan teknologi dan tools yang saya gunakan dalam mengembangkan solusi digital
        </p>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card border border-border text-foreground/70 hover:border-primary/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {activeSkillsData?.skills.map((skill, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300 animate-slide-up"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-foreground">{skill}</h4>
                <span className="text-sm text-primary font-bold">Expert</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
