"use client";

import React from "react";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  const links = [
    { label: "About", href: "#about" },
    { label: "Journey", href: "#experience" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/alxnder___?igsh=eXU1MnUzM3JwdGY3&utm_source=qr",
      icon: Instagram,
    },
    {
      label: "Email",
      href: "mailto:alexollyvio93@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: Linkedin,
      disabled: true,
    },
  ];

  const wrap = {
    hidden: {},
    show: reduceMotion
      ? {}
      : { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(8px)" },
    show: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease: EASE },
        },
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 py-16">
      {/* ambient bg (lebih konsisten + lebih “clean”) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <motion.div
          className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-cyan-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 14, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }
          }
          transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[-210px] right-[-190px] h-[720px] w-[720px] rounded-full bg-violet-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -14, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }
          }
          transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={wrap}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 sm:gap-8 md:grid-cols-3 md:gap-10"
        >
          {/* Brand */}
          <motion.div variants={item} className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]"
                animate={reduceMotion ? undefined : { scale: [1, 1.5, 1] }}
                transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
                Closing
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Alexander Ollyvio
            </h3>

            <p className="max-w-sm text-xs leading-relaxed text-foreground/70 sm:text-sm">
              Computer Science student at Universitas Atma Jaya Yogyakarta. Interested in web systems and cybersecurity,
              focused on building clean, reliable products.
            </p>

            {/* tiny divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-70" />
          </motion.div>

          {/* Links */}
          <motion.div variants={item} className="space-y-4">
            <h4 className="text-sm font-semibold tracking-[0.22em] uppercase text-foreground/70">
              Quick Links
            </h4>

            <ul className="grid grid-cols-2 gap-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <motion.a
                    href={l.href}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="group inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/0 px-3 py-2
                               text-foreground/70 transition-colors hover:bg-white/6 hover:text-foreground"
                  >
                    <span className="truncate">{l.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* subtle note */}
            <p className="text-xs text-foreground/55">
              Built with Next.js • Tailwind • Framer Motion
            </p>
          </motion.div>

          {/* Social */}
          <motion.div variants={item} className="space-y-4">
            <h4 className="text-sm font-semibold tracking-[0.22em] uppercase text-foreground/70">
              Find Me
            </h4>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, icon: Icon, disabled }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={disabled ? undefined : "_blank"}
                  rel={disabled ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  onClick={(e) => disabled && e.preventDefault()}
                  whileHover={
                    disabled || reduceMotion
                      ? undefined
                      : { y: -6, transition: { duration: 0.2, ease: EASE } }
                  }
                  whileTap={disabled || reduceMotion ? undefined : { scale: 0.98 }}
                  className={[
                    "group relative inline-flex h-11 w-11 items-center justify-center rounded-full",
                    "border border-white/12 bg-white/5 backdrop-blur-md",
                    "text-foreground/70 transition-colors duration-300",
                    disabled ? "cursor-not-allowed opacity-45" : "hover:bg-white/10 hover:text-foreground hover:border-white/18",
                  ].join(" ")}
                >
                  {/* no cyan glow; just ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/0 transition group-hover:ring-white/12" />
                  <Icon className="relative h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_220px_at_18%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
              <div className="relative text-xs font-semibold tracking-[0.22em] uppercase text-foreground/60">
                Email
              </div>
              <a
                href="mailto:alexollyvio93@gmail.com"
                className="relative mt-2 block text-sm font-semibold text-foreground/80 hover:text-foreground"
              >
                alexollyvio93@gmail.com
              </a>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-80" />
            </div>
          </motion.div>
        </motion.div>

        {/* bottom */}
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8 lg:mt-12">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
            <p className="text-[11px] text-foreground/60 sm:text-xs">
              © {currentYear} Alexander Ollyvio Kristo Sentono.
            </p>

            <motion.a
              href="#top"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-foreground/70 backdrop-blur-md
                         transition-colors hover:border-white/18 hover:bg-white/10 hover:text-foreground sm:px-4"
            >
              Back to top
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
