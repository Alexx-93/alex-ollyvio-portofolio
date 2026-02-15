"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const techs = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node / Express", icon: "🟢" },
  { name: "SQL", icon: "🗄️" },
  { name: "HTML", icon: "🔤" },
  { name: "CSS", icon: "🎨" },
  { name: "Figma", icon: "✏️" },
  { name: "Linux", icon: "🐧" },
  { name: "VS Code", icon: "💻" },
  { name: "GitHub", icon: "🐙" },
  { name: "Postman", icon: "📮" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  const gridVariants = {
    hidden: {},
    show: reduceMotion
      ? {}
      : {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.08,
          },
        },
  };

  const cardVariants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: "blur(6px)" },
    show: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
  };

  return (
    <section id="tech-stack" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
        <motion.div
          className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 16, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }
          }
          transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-180px] right-[-180px] h-[640px] w-[640px] rounded-full bg-violet-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -16, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }
          }
          transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
              Tech Stack
            </span>
          </div>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Tools I{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              work
            </span>{" "}
            with
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            A focused set of technologies I use to design, build, test, and ship products.
          </p>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={gridVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5"
        >
          {techs.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: { duration: 0.22, ease: EASE },
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-3 backdrop-blur-xl
                         shadow-[0_15px_50px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:border-white/18 hover:bg-white/8
                         sm:rounded-3xl sm:p-5 sm:shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
            >
              {/* hover outline */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/0 transition group-hover:ring-white/12" />

              {/* top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent opacity-60" />

              {/* straight shimmer (NOT miring) */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ["-30%", "30%", "-30%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <div className="relative flex flex-col items-center justify-center gap-2 text-center sm:gap-3">
                {/* icon: spring pop on hover (lebih "premium"), idle micro-float */}
                <motion.div
                  className="text-2xl leading-none sm:text-4xl"
                  animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
                  transition={
                    reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                  }
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          transition: { type: "spring", stiffness: 420, damping: 18 },
                        }
                  }
                >
                  {t.icon}
                </motion.div>

                {/* label: slide-up + fade slightly */}
                <motion.div
                  className="text-[10px] font-semibold tracking-[0.14em] uppercase text-foreground/70 transition-colors group-hover:text-foreground sm:text-xs"
                  initial={false}
                  whileHover={reduceMotion ? undefined : { y: -1, opacity: 0.95 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {t.name}
                </motion.div>
              </div>

              {/* bottom hairline */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-80" />

              {/* subtle “breathing” highlight */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{ opacity: [0.12, 0.22, 0.12] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-white/5" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
