"use client";

import Image from "next/image";
import React from "react";
import { Calendar, Building2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  icon?: string; // emoji or image path
  isLogo?: boolean;
  comingSoon?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const reduceMotion = useReducedMotion();

  const experiences: ExperienceItem[] = [
    {
      title: "Active Student",
      company: "Universitas Atma Jaya Yogyakarta",
      period: "2022 — Present",
      description:
        "Studying Computer Science with a focus on building modern web systems and strengthening cybersecurity fundamentals through coursework and real projects.",
      skills: ["Web Development", "Cybersecurity", "Problem Solving"],
      icon: "/uajy-logo.png",
      isLogo: true,
    },
    {
      title: "Organization Experience",
      company: "PMK Melisia Christi",
      period: "2022 — 2024",
      description:
        "Active member and coordinator in multiple roles, supporting events and operations with strong teamwork and execution.",
      skills: ["Leadership", "Management", "Documentation"],
      icon: "🤝",
    },
  ];

  return (
    <section id="experience" className="relative overflow-hidden px-6 py-24">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-[520px] w-[520px] rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.07),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-8 sm:mb-12"
        >
          {/* ❌ remove glass: no bg translucent + no blur */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-transparent px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_16px_rgba(167,139,250,0.55)]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
              Experience
            </span>
          </div>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            A timeline of where I learned, contributed, and grew—academically and beyond.
          </p>
        </motion.div>

        {/* timeline */}
        <div className="relative grid gap-6">
          {/* vertical line */}
          <div className="pointer-events-none absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/12 to-transparent sm:block" />

          {experiences.map((exp, idx) => (
            <motion.article
              key={`${exp.title}-${idx}`}
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: idx * 0.06, ease: EASE }}
              className="relative sm:pl-16"
            >
              {/* timeline node */}
              <div className="absolute left-0 top-8 hidden sm:block">
                <div className="relative">
                  {/* ❌ remove glass: no translucent bg + no blur */}
                  <div className="h-10 w-10 rounded-2xl border border-white/14 bg-black/20 shadow-[0_18px_60px_rgba(0,0,0,0.35)]" />

                  {/* keep subtle inner glow (not glass) */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-80 [background:radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_60%)]" />

                  {/* pulse ring (still ok, not glass) */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/25"
                      animate={{ opacity: [0.0, 0.8, 0.0], scale: [1, 1.18, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* soft aura */}
                  <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-cyan-400/10 blur-2xl" />
                </div>
              </div>

              {/* card */}
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-2xl border border-white/12 bg-black/20 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.3)]
                           transition-colors duration-300 hover:border-white/18 hover:bg-black/28 sm:rounded-3xl sm:p-6 sm:shadow-[0_25px_90px_rgba(0,0,0,0.35)]"
              >
                {/* hover glow (keep, bukan glass) */}
                <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle,rgba(34,211,238,0.18),transparent_55%)]" />
                <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle,rgba(167,139,250,0.14),transparent_55%)]" />

                {/* ❌ remove glass shimmer sweep */}
                {/* (diagonal/horizontal sweep dihapus total) */}

                {exp.comingSoon && (
                  <div className="absolute right-4 top-4 rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[11px] font-semibold text-foreground/75">
                    Coming Soon
                  </div>
                )}

                <div className="flex items-start gap-3 sm:gap-4">
                  {/* icon */}
                  <div className="shrink-0">
                    {exp.isLogo ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/12 bg-black/20 sm:h-12 sm:w-12 sm:rounded-2xl">
                        <Image
                          src={exp.icon || "/placeholder.svg"}
                          alt={exp.company}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain p-2 opacity-90"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-black/20 text-xl sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
                        {exp.icon ?? "⭐"}
                      </div>
                    )}
                  </div>

                  {/* main */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-foreground sm:text-lg md:text-2xl">{exp.title}</h3>

                    <div className="mt-1 flex flex-col gap-2 text-[11px] text-foreground/65 sm:mt-2 sm:text-xs sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-cyan-300/90" />
                        <span className="truncate font-semibold text-foreground/80">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-violet-300/90" />
                        <span className="font-semibold">{exp.period}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-foreground/75 md:text-base">{exp.description}</p>

                    {/* skills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.skills.map((s) => (
                        <motion.span
                          key={s}
                          whileHover={reduceMotion ? undefined : { y: -1 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                          className="rounded-full border border-white/12 bg-transparent px-3 py-1 text-[11px] font-semibold text-foreground/70
                                     transition-colors hover:bg-white/6 hover:text-foreground"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* bottom micro-line */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-70" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
