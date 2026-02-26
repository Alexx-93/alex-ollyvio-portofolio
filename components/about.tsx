"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function useTiltGlare(max = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1100px) rotateX(${clamp(-(py - 0.5) * (max * 2), -max, max)}deg) rotateY(${clamp((px - 0.5) * (max * 2), -max, max)}deg) translateZ(0)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "35%");
  };

  return { ref, onMove, onLeave };
}

function AnimatedCounter({ end, duration = 1100, startWhen = false }: {
  end: number; duration?: number; startWhen?: boolean;
}) {
  const [value, setValue] = useState(0);
  const t0 = useRef<number | null>(null);

  useEffect(() => {
    if (!startWhen) return;
    let id = 0;
    const tick = (t: number) => {
      if (t0.current == null) t0.current = t;
      const p = clamp((t - t0.current) / duration, 0, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [end, duration, startWhen]);

  return <span>{value}</span>;
}

const BIOS: React.ReactNode[] = [
  <>
    Hi! I'm <span className="font-semibold text-white">Alexander Ollyvio Kristo Sentono</span>. I care
    about building products people can actually use — by keeping things{" "}
    <span className="font-semibold text-white">simple</span>,{" "}
    <span className="font-semibold text-white">clean</span>, and{" "}
    <span className="font-semibold text-white">reliable</span>.
  </>,
  <>
    Passionate about <span className="font-semibold text-white">web development</span> and{" "}
    <span className="font-semibold text-white">cybersecurity</span>. I enjoy collaborating, learning
    fast, and turning real-world requirements into scalable solutions.
  </>,
  <>
    Outside tech, I'm an avid mountain climber — peaks like{" "}
    <span className="font-semibold text-white">Mt. Lawu</span> and{" "}
    <span className="font-semibold text-white">Mt. Merbabu</span> remind me to stay disciplined and
    consistent, values I bring into every project.
  </>,
];

const STATS = [
  { label: "Projects", value: 7 },
  { label: "Tech Stacks", value: 6 },
  { label: "Experience", value: 2 },
];

export default function About() {
  const reduceMotion = useReducedMotion();
  const tilt = useTiltGlare(8);
  const [statsVisible, setStatsVisible] = useState(false);

  const fadeUp = useMemo(() => ({
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  }), []);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 sm:py-24 md:py-28"
    >
      {/* ── Ambient BG ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-[360px] w-[360px] rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-violet-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(56,189,248,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-10 sm:mb-14"
        >
          {/* pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">About</span>
          </div>

          <h2 className="mb-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
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

          <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
            A Computer Science student at Universitas Atma Jaya Yogyakarta who enjoys shipping real
            products with clean UI and dependable backend logic.
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid items-start gap-8 lg:grid-cols-[5fr_6fr] lg:gap-12 xl:gap-16">

          {/* ── LEFT: Photo Card ── */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: -16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="relative"
          >
            {/* outer glow */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-cyan-400/8 blur-3xl" />

            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMove}
              onMouseLeave={tilt.onLeave}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/4
                         shadow-[0_20px_80px_rgba(0,0,0,0.50)]
                         transition-[transform] duration-300 ease-out will-change-transform"
              style={{
                transform: "perspective(1100px) rotateX(0deg) rotateY(0deg)",
                ["--gx" as string]: "50%",
                ["--gy" as string]: "35%",
              } as React.CSSProperties}
            >
              {/* inner glass border */}
              <div className="pointer-events-none absolute inset-0 z-[2] rounded-3xl ring-1 ring-inset ring-white/10" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />

              {/* grain */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[3] opacity-[0.07] mix-blend-overlay"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")" }}
              />

              {/* photo — portrait crop, fixed aspect */}
              <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/alexander-profile.jpg"
                  alt="Alexander Ollyvio"
                  fill
                  className="object-cover object-top opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px"
                />
              </div>

              {/* gradient fade bottom */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a12]/70 via-black/10 to-transparent" />

              {/* sweep shimmer on hover */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 opacity-0 group-hover:opacity-100
                             bg-gradient-to-r from-transparent via-white/8 to-transparent"
                  animate={{ x: ["-50%", "300%"] }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                />
              )}

              {/* cursor glare */}
              <div
                className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(440px circle at var(--gx) var(--gy), rgba(255,255,255,0.11), rgba(34,211,238,0.07), transparent 60%)" }}
              />

              {/* bottom label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/50">Profile</div>
                  <div className="mt-0.5 text-sm font-semibold text-white">Alexander Ollyvio</div>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white/65 backdrop-blur-md">
                  UAJY • CS
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Bio + Stats + CTA ── */}
          <motion.div
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
            }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            {/* Bio cards */}
            {BIOS.map((text, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4
                           backdrop-blur-xl transition-colors
                           hover:border-white/15 hover:bg-white/[0.07]
                           sm:rounded-3xl sm:p-5"
              >
                <p className="text-sm leading-[1.75] text-white/68 sm:text-[15px]">{text}</p>
              </motion.div>
            ))}

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE }}
              onViewportEnter={() => setStatsVisible(true)}
              className="grid grid-cols-3 gap-2 sm:gap-3"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]
                             p-3 backdrop-blur-xl transition-colors
                             hover:border-white/15 hover:bg-white/[0.07]
                             sm:rounded-3xl sm:p-5"
                >
                  {/* radial glow on hover */}
                  <div className="pointer-events-none absolute -inset-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(circle,rgba(34,211,238,0.10),transparent_60%)]" />
                  <div className="relative text-xl font-semibold text-white sm:text-2xl">
                    <AnimatedCounter end={s.value} startWhen={statsVisible} />
                    <span className="text-cyan-300">+</span>
                  </div>
                  <div className="relative mt-1 text-[9px] font-bold tracking-[0.20em] uppercase text-white/45 sm:text-[10px]">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA strip */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl
                         transition-colors hover:border-white/15 hover:bg-white/[0.07]
                         sm:rounded-3xl sm:p-5"
            >
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-center sm:text-left">
                  <p className="text-[13px] font-semibold text-white/80">Want to see what I've built?</p>
                  <p className="mt-0.5 text-[11px] text-white/45">Browse through my projects below.</p>
                </div>
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="group/btn relative w-full overflow-hidden rounded-full border border-white/14 bg-white/6
                             px-5 py-2.5 text-[13px] font-semibold text-white/80
                             transition-colors hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <span className="relative z-10">Explore Projects →</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}