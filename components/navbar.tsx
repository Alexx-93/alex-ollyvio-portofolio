"use client"

import { useState } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"

export default function Navbar({
  activeSection,
  setActiveSection,
  isDarkMode,
  toggleDarkMode,
}: {
  activeSection: string
  setActiveSection: (section: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", id: "about" },
    { label: "Journey", id: "experience" },
    { label: "Hobbies", id: "hobbies" }, // Added Hobbies link to nav
    { label: "Tech Stack", id: "tech-stack" },
    { label: "Contact", id: "contact" },
  ]

  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setIsOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-amber-500/20 dark:border-amber-500/30 z-50 animate-slide-down group hover:border-amber-500/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 group/logo">
            <div className="">
              <div className="font-bold text-lg text-foreground group-hover/logo:text-amber-600 dark:group-hover/logo:text-amber-400 transition-colors animate-slide-in-right">
                Alexander Ollyvio
              </div>
              <div
                className="text-xs text-amber-600 dark:text-amber-400/80 group-hover/logo:text-amber-700 dark:group-hover/logo:text-amber-300 transition-colors animate-slide-in-right"
                style={{ animationDelay: "50ms" }}
              >
                Creative Tech Portfolio
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all duration-300 text-sm font-medium relative group/nav-item animate-slide-in-right ${
                  activeSection === item.id
                    ? "text-amber-600 dark:text-amber-400 animate-text-glow"
                    : "text-foreground/60 hover:text-amber-600 dark:hover:text-amber-400"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-sky-500 group-hover/nav-item:w-full transition-all duration-300 animate-glitch-distort"></span>
              </button>
            ))}

            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300 text-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300 text-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-all duration-300 hover:scale-110 group/menu animate-float"
            >
              {isOpen ? (
                <X size={24} className="animate-rotate-slow" />
              ) : (
                <Menu size={24} className="group-hover/menu:rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-down">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 animate-slide-in-left group ${
                  activeSection === item.id
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 animate-border-pulse"
                    : "hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
