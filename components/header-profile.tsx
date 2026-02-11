"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

export default function HeaderProfile() {
  return (
    <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4 md:gap-8">
          {/* University Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/uajy-logo.png"
              alt="Universitas Atma Jaya Yogyakarta"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 object-contain hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Alexander Ollyvio Kristo Sentono</h1>
            <p className="text-accent font-semibold mt-1">Atma Jaya Yogyakarta University</p>
            <p className="text-foreground/70 text-sm mt-1">Full Stack Developer | Student | Tech Enthusiast</p>
          </div>

          {/* Social Links */}
          <div className="hidden sm:flex gap-3">
            <a
              href="#"
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/70 hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/70 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/70 hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/70 hover:text-foreground"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
