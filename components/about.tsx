"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Tilt + glare (simple & smooth, no extra deps) */
function useTiltGlare(max = 10) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    const rotY = (px - 0.5) * (max * 2);
    const rotX = -(py - 0.5) * (max * 2);

    el.style.transform = `perspective(1150px) rotateX(${clamp(rotX, -max, max)}deg) rotateY(${clamp(
      rotY,
      -max,
      max
    )}deg) translateZ(0)`;

    // glare point
    el.style.setProperty("--glare-x", `${px * 100}%`);
    el.style.setProperty("--glare-y", `${py * 100}%`);

    // slight sheen shift
    el.style.setProperty("--sheen-x", `${clamp(px * 100, 10, 90)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1150px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--glare-x", `50%`);
    el.style.setProperty("--glare-y", `35%`);
    el.style.setProperty("--sheen-x", `35%`);
  };

  return { ref, onMove, onLeave };
}

/** Counter only runs when visible */
function AnimatedCounter({
  end,
  duration = 1100,
  startWhen = false,
}: {
  end: number;
  duration?: number;
  startWhen?: boolean;
}) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startWhen) return;
    let rafId = 0;

    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(eased * end));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, startWhen]);

  return <span>{value}</span>;
}

export default function About() {
  const reduceMotion = useReducedMotion();
  const tilt = useTiltGlare(10);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );

  const [statsVisible, setStatsVisible] = useState(false);

  return (
    <section id="about" className="relative overflow-hidden px-6 py-24">
      {/* soft ambient (match Hero/Navbar vibe) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-[520px] w-[520px] rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.07),transparent_58%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-8 flex flex-col gap-3 sm:mb-12 sm:gap-4"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
              About
            </span>
          </div>

          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Building systems with{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              clarity
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-violet-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              impact
            </span>
            .
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            A Computer Science student at Universitas Atma Jaya Yogyakarta who enjoys shipping real products—from
            dashboards to attendance systems—with clean UI and dependable backend logic.
          </p>
        </motion.div>

        <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — Photo card (tilt + glare + shimmer) */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-cyan-400/10 blur-3xl" />

            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMove}
              onMouseLeave={tilt.onLeave}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl
                         shadow-[0_25px_90px_rgba(0,0,0,0.45)]
                         transition-transform duration-300 will-change-transform"
              style={
                {
                  transform: "perspective(1150px) rotateX(0deg) rotateY(0deg)",
                  ["--glare-x" as any]: "50%",
                  ["--glare-y" as any]: "35%",
                  ["--sheen-x" as any]: "35%",
                } as React.CSSProperties
              }
            >
              {/* glass refinement: inner border + top highlight + subtle noise */}
              <div className="pointer-events-none absolute inset-0 z-[2] rounded-3xl ring-1 ring-white/10" />
              <div className="pointer-events-none absolute inset-0 z-[2] rounded-3xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(255,255,255,0.06)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* subtle grain */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[3] opacity-[0.10] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
                }}
              />

              <div className="relative aspect-[4/5]">
                <Image
                  src="/alexander-profile.jpg"
                  alt="Alexander Ollyvio"
                  fill
                  className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>

              {/* overlays */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/18 to-transparent" />

              {/* ✅ ONLY ONE SWEEP: horizontal (left → right), NO DIAGONAL */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 opacity-0 group-hover:opacity-100
                             bg-gradient-to-r from-transparent via-white/12 to-transparent"
                  animate={{ x: ["-30%", "330%"] }}
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
                />
              )}

              {/* interactive glare */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(520px circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.16), rgba(34,211,238,0.10), transparent 62%)",
                }}
              />

              {/* bottom label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase text-white/70">Profile</div>
                  <div className="mt-1 text-lg font-semibold text-white">Alexander Ollyvio</div>
                </div>

                <div className="rounded-2xl border border-white/12 bg-white/10 px-3 py-2 text-[11px] font-semibold text-white/70 backdrop-blur-md">
                  UAJY • CS
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Text blocks + interactive stats */}
          <motion.div
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { staggerChildren: 0.10 } },
            }}
            className="space-y-3 sm:space-y-4"
          >
            {[
              <>
                Hi! I'm{" "}
                <span className="font-semibold text-foreground">Alexander Ollyvio Kristo Sentono</span>. I care about
                building useful products that people can actually use—by keeping things{" "}
                <span className="font-semibold text-foreground">simple</span>,{" "}
                <span className="font-semibold text-foreground">clean</span>, and{" "}
                <span className="font-semibold text-foreground">reliable</span>.
              </>,
              <>
                I'm passionate about <span className="font-semibold text-foreground">web development</span> and{" "}
                <span className="font-semibold text-foreground">cybersecurity</span>. I enjoy collaborating, learning
                fast, and turning real-world requirements into a scalable solution.
              </>,
              <>
                Outside tech, I'm an avid mountain climber—finding perspective at high altitudes. Peaks like{" "}
                <span className="font-semibold text-foreground">Mt. Lawu</span> and{" "}
                <span className="font-semibold text-foreground">Mt. Merbabu</span> remind me to stay disciplined and
                consistent.
              </>,
            ].map((text, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                whileInView={reduceMotion ? undefined : "show"}
                className="rounded-2xl border border-white/12 bg-white/5 p-4 backdrop-blur-xl
                           transition-all hover:border-white/16 hover:bg-white/8 sm:rounded-3xl sm:p-6"
              >
                <p className="text-sm leading-relaxed text-foreground/75 sm:text-base md:text-lg">{text}</p>
              </motion.div>
            ))}

            {/* Stats */}
            {/* <motion.div
              variants={fadeUp}
              transition={{ duration: 0.75, ease: EASE }}
              onViewportEnter={() => setStatsVisible(true)}
              viewport={{ once: true, amount: 0.45 }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {[
                { label: "Projects", value: 12 },
                { label: "Tech Stacks", value: 6 },
                { label: "Experiences", value: 3 },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-5 backdrop-blur-xl
                             hover:bg-white/10 hover:border-white/16 transition-colors"
                >
                  <div className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [background:radial-gradient(circle,rgba(34,211,238,0.14),transparent_60%)]" />
                  <div className="relative text-2xl font-semibold text-foreground">
                    <AnimatedCounter end={s.value} startWhen={statsVisible} />+
                  </div>
                  <div className="relative mt-1 text-xs font-semibold tracking-[0.18em] uppercase text-foreground/60">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div> */}

            {/* mini CTA strip (simple but nice) */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.75, ease: EASE }}
              className="rounded-2xl border border-white/12 bg-white/5 p-4 backdrop-blur-xl sm:rounded-3xl sm:p-5"
            >
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-center text-sm font-semibold text-foreground/80 sm:text-left">Want to see what I've built?</div>
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground/80
                             transition-colors hover:bg-white/10 hover:text-foreground sm:w-auto"
                >
                  Explore Projects →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
