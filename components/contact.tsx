"use client"

import { Mail, Instagram, Linkedin } from "lucide-react"

export default function Contact() {
  const contacts = [
    {
      label: "Email",
      value: "alexollyvio93@gmail.com",
      href: "mailto:alexollyvio93@gmail.com",
      icon: Mail,
    },
    {
      label: "Instagram",
      value: "@alxnder___",
      href: "https://www.instagram.com/alxnder___?igsh=eXU1MnUzM3JwdGY3&utm_source=qr",
      icon: Instagram,
    },
    {
      label: "LinkedIn",
      value: "Coming Soon",
      href: "#",
      icon: Linkedin,
      disabled: true,
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-background/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center animate-slide-up animate-text-glow">
          Get in <span className="text-amber-600 dark:text-amber-400 animate-neon-flicker">Touch</span>
        </h2>

        <p
          className="text-lg text-foreground/70 text-center mb-12 max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: "50ms" }}
        >
          Interested in collaborating or just want to chat? Feel free to reach out through any of these channels.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {contacts.map((contact, index) => {
            const Icon = contact.icon
            return (
              <a
                key={index}
                href={contact.href}
                target={contact.disabled ? undefined : "_blank"}
                rel={contact.disabled ? undefined : "noopener noreferrer"}
                onClick={(e) => contact.disabled && e.preventDefault()}
                className={`bg-card border border-amber-500/20 dark:border-amber-500/30 rounded-xl p-6 flex flex-col items-center gap-3 transition-all duration-300 group animate-scale-in animate-border-pulse hover:animate-none ${
                  contact.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/20 hover:bg-amber-500/5 hover:-translate-y-2"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors group-hover:animate-rotate-slow">
                  <Icon size={24} className="text-amber-600 dark:text-amber-400 animate-pulse-glow" />
                </div>
                <p
                  className="text-sm font-semibold text-foreground/60 text-center group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors animate-slide-in-right"
                  style={{ animationDelay: `${index * 100 + 50}ms` }}
                >
                  {contact.label}
                </p>
                <p className="text-foreground font-semibold text-center text-sm line-clamp-1 group-hover:animate-text-glow">
                  {contact.value}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
