"use client";

import { Mail, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const reduceMotion = useReducedMotion();

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
  ];

  const container = {
    hidden: {},
    show: reduceMotion
      ? {}
      : {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.08,
          },
        },
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
    <section id="contact" className="relative overflow-hidden border-t border-white/10 px-6 py-24">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

        <motion.div
          className="absolute -top-32 left-[-160px] h-[460px] w-[460px] rounded-full bg-cyan-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 16, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }
          }
          transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[-220px] right-[-190px] h-[720px] w-[720px] rounded-full bg-violet-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -16, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }
          }
          transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.35 }}
          className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12"
        >
          {/* LEFT */}
          <motion.div variants={item} className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]"
                animate={reduceMotion ? undefined : { scale: [1, 1.55, 1] }}
                transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
                Let's Connect
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Get in{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
              Interested in collaborating, building something impactful, or just having a meaningful tech discussion?
              I'm always open to new ideas and opportunities.
            </p>

            {/* mini card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl sm:rounded-3xl sm:px-5 sm:py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
              <p className="relative text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/60 sm:text-xs">
                Availability
              </p>
              <p className="relative mt-1 text-sm text-foreground/80">
                Open for collaboration & freelance projects in 2025.
              </p>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={item} className="space-y-5">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.disabled ? undefined : "_blank"}
                  rel={contact.disabled ? undefined : "noopener noreferrer"}
                  onClick={(e) => contact.disabled && e.preventDefault()}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.5 }}
                  whileHover={
                    contact.disabled || reduceMotion
                      ? undefined
                      : { y: -6, transition: { duration: 0.22, ease: EASE } }
                  }
                  whileTap={contact.disabled || reduceMotion ? undefined : { scale: 0.99 }}
                  className={[
                    "group relative flex items-center justify-between overflow-hidden rounded-3xl border border-white/12",
                    "bg-white/5 p-6 backdrop-blur-xl transition-colors duration-300",
                    contact.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-white/10 hover:border-white/18",
                  ].join(" ")}
                >
                  {/* subtle highlight only (no cyan glow center) */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/0 transition group-hover:ring-white/12" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent opacity-60" />

                  {/* straight shimmer top line */}
                  {!reduceMotion && !contact.disabled && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ["-30%", "30%", "-30%"] }}
                      transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  <div className="relative flex items-center gap-3 sm:gap-4">
                    <motion.div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 sm:h-12 sm:w-12 sm:rounded-2xl"
                      whileHover={
                        contact.disabled || reduceMotion
                          ? undefined
                          : { scale: 1.06, transition: { type: "spring", stiffness: 420, damping: 18 } }
                      }
                    >
                      <Icon className="h-4 w-4 text-foreground/80 transition-colors group-hover:text-foreground sm:h-5 sm:w-5" />
                    </motion.div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground/60 sm:text-xs">
                        {contact.label}
                      </p>
                      <p className="truncate text-xs font-semibold text-foreground/85 sm:text-sm">
                        {contact.value}
                      </p>
                    </div>
                  </div>

                  {!contact.disabled ? (
                    <motion.div
                      className="relative"
                      whileHover={reduceMotion ? undefined : { x: 2, y: -2 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <ArrowUpRight className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-foreground" />
                    </motion.div>
                  ) : (
                    <span className="relative text-xs font-semibold tracking-[0.16em] uppercase text-foreground/45">
                      Soon
                    </span>
                  )}

                  {/* bottom hairline */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-80" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
