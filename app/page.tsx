"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Certificates from "@/components/certificates" // added certificates import
import Hobbies from "@/components/hobbies" // Added Hobbies import
import TechStack from "@/components/tech-stack"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import EndGamePage from "@/components/endGame"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(savedMode)
    if (savedMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("darkMode", String(newMode))
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="scroll-smooth bg-background">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Hero setActiveSection={setActiveSection} />
      <About />
      <Experience />
      <Certificates /> {/* added certificates section after experience */}
      <Hobbies /> {/* Added Hobbies section before tech stack */}
      <TechStack />
      <Contact />
      <EndGamePage/>
      <Footer />
    </div>
  )
}
