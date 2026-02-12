"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeaderProfile() {
  return (
    <div className="sticky top-16 z-40 backdrop-blur-xl border-b border-white/10 bg-background/70">
      {/* subtle neon top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-4 rounded-full bg-cyan-400/10 blur-2xl" />
            <Image
              src="/uajy-logo.png"
              alt="Universitas Atma Jaya Yogyakarta"
              width={90}
              height={90}
              className="relative w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              Alexander Ollyvio Kristo Sentono
            </h1>

            <p className="mt-1 text-sm font-medium text-foreground/70">
              Universitas Atma Jaya Yogyakarta
            </p>

            <p className="mt-1 text-xs md:text-sm text-foreground/60">
              Full Stack Developer • Student • Tech Enthusiast
            </p>
          </div>

          {/* Social */}
          <div className="hidden sm:flex items-center gap-3">
            {[ 
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={label}
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full
                           border border-white/10 bg-white/5 backdrop-blur-md
                           text-foreground/70 hover:text-foreground
                           transition-all duration-300 hover:-translate-y-1"
              >
                {/* hover glow */}
                <span className="pointer-events-none absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                 bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_60%)] rounded-full blur-xl" />
                <Icon className="relative h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
