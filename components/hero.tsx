"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Counter */
function AnimatedCounter({ end, duration = 900 }: { end: number; duration?: number }) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      setValue(end);
      return;
    }

    let rafId = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * end));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, reduceMotion]);

  return <span>{value}</span>;
}

function useMouseSpotlight() {
  const raf = useRef<number | null>(null);
  const [p, setP] = useState({ x: 50, y: 42 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        setP({
          x: clamp((e.clientX / window.innerWidth) * 100, 0, 100),
          y: clamp((e.clientY / window.innerHeight) * 100, 0, 100),
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return p;
}

function useTilt(maxDeg = 10) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 26, mass: 0.6 });
  const ry = useSpring(0, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      rx.set(clamp(dy * -maxDeg, -maxDeg, maxDeg));
      ry.set(clamp(dx * maxDeg, -maxDeg, maxDeg));
    };

    const onLeave = () => {
      rx.set(0);
      ry.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxDeg, rx, ry]);

  return { ref, rotateX: rx, rotateY: ry };
}

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const mx = useSpring(0, { stiffness: 320, damping: 22 });
  const my = useSpring(0, { stiffness: 320, damping: 22 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      mx.set(clamp(dx * 0.12, -10, 10));
      my.set(clamp(dy * 0.12, -10, 10));
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my, reduceMotion]);

  return (
    <motion.button ref={ref} onClick={onClick} style={reduceMotion ? undefined : { x: mx, y: my }} className={className}>
      {children}
    </motion.button>
  );
}

function PremiumName({ text, className = "" }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const letters = Array.from(text);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
  };

  const item = {
    hidden: { y: 32, opacity: 0, filter: "blur(6px)", rotateX: 80 },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  };

  if (reduceMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span variants={container} initial="hidden" animate="show" className="inline-block perspective-[1000px]">
      {letters.map((char, i) => (
        <motion.span key={i} variants={item} className={`inline-block will-change-transform ${className}`}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const reduceMotion = useReducedMotion();
  const spotlight = useMouseSpotlight();
  const tilt = useTilt(10);

  const overlayStyle = useMemo(
    () => ({
      background: `
        radial-gradient(900px circle at ${spotlight.x}% ${spotlight.y}%,
          rgba(34,211,238,0.14),
          rgba(10, 12, 20, 0.0) 60%),
        radial-gradient(780px circle at ${spotlight.x}% ${spotlight.y}%,
          rgba(167,139,250,0.10),
          rgba(10, 12, 20, 0.0) 64%)
      `,
    }),
    [spotlight.x, spotlight.y]
  );

  const goTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="
        relative overflow-hidden
        min-h-[100svh]
        pt-[calc(env(safe-area-inset-top)+88px)]
        pb-14
        sm:pt-[calc(env(safe-area-inset-top)+100px)]
        sm:pb-16
      "
    >
      {/* background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#070a12] via-[#0b1220] to-[#060812]" />
      <div className="pointer-events-none absolute inset-0 -z-10" style={overlayStyle} />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 -z-10 h-[520px] w-[520px] rounded-full bg-violet-400/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* IMPORTANT: mobile 1 kolom (text dulu), md+ baru 2 kolom */}
        <div className="grid items-start gap-10 md:items-center md:gap-12 lg:grid-cols-2">
          {/* left */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="space-y-7"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]" />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                  College Students
                </span>
              </div>
            </div>

            <h1 className="text-balance font-semibold tracking-tight text-white leading-[0.98] text-[clamp(40px,8.6vw,72px)]">
              Alexander{" "}
              <PremiumName
                text="Ollyvio"
                className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent"
              />
            </h1>

            <p className="max-w-[56ch] text-base leading-relaxed text-white/70 sm:text-lg">
              Computer science student at Universitas Atma Jaya Yogyakarta focused on web development and cybersecurity,
              specializing in frontend and UI/UX. Committed to building modern, secure, and user-centered digital systems.
            </p>

            {/* CTA - mobile full width */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton
                onClick={() => goTo("projects")}
                className="
                  group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6
                  text-sm font-semibold text-black
                  shadow-[0_16px_60px_rgba(255,255,255,0.08)]
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_80px_rgba(34,211,238,0.18)]
                  sm:w-auto
                "
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => goTo("contact")}
                className="
                  inline-flex h-12 w-full items-center justify-center gap-2 rounded-full
                  border border-white/16 bg-white/6 px-6 text-sm font-semibold text-white
                  backdrop-blur-md transition-colors hover:bg-white/10
                  sm:w-auto
                "
              >
                <Mail className="h-4 w-4" />
                Contact
              </MagneticButton>

              <a
                href="/cv.pdf"
                className="
                  inline-flex h-12 w-full items-center justify-center gap-2 rounded-full
                  border border-white/16 bg-white/0 px-6 text-sm font-semibold text-white/80
                  transition-colors hover:text-white hover:bg-white/6
                  sm:w-auto
                "
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>

            {/* socials */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: "https://github.com/", label: "GitHub", icon: Github },
                { href: "https://www.linkedin.com/", label: "LinkedIn", icon: Linkedin },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    group relative inline-flex h-11 w-11 items-center justify-center rounded-full
                    border border-white/12 bg-white/5 backdrop-blur-md
                    hover:bg-white/10 transition-colors
                  "
                >
                  <span
                    className="
                      pointer-events-none absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_60%)] blur-xl rounded-full
                    "
                  />
                  <s.icon className="relative h-5 w-5 text-white/75 group-hover:text-white" />
                </a>
              ))}
            </div>

            {/* stats - mobile 1 kolom, sm 3 kolom */}
            <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: "Projects", value: 7 },
                { label: "Stacks", value: 6 },
                { label: "Experiences", value: 2 },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/8 transition-colors"
                >
                  <div className="text-2xl font-semibold text-white">
                    <AnimatedCounter end={s.value} />+
                  </div>
                  <div className="mt-1 text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* right image */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="relative flex justify-center md:justify-end"
          >
            <motion.div
              ref={tilt.ref}
              style={reduceMotion ? undefined : { rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
              className="
                relative w-full max-w-[420px]
                aspect-[4/3] sm:aspect-[3/4]
                overflow-hidden rounded-3xl
                border border-white/12 bg-white/5 backdrop-blur-xl shadow-2xl
              "
            >
              <div className="pointer-events-none absolute -inset-10 bg-cyan-400/10 blur-3xl" />
              <div className="pointer-events-none absolute -inset-10 bg-violet-400/10 blur-3xl" />

              <div className="absolute inset-0" style={{ transform: "translateZ(18px)" }}>
                <Image
                  src="/images/img-2273.jpeg"
                  alt="Merbabu Peak"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 92vw, 420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="rounded-full border border-white/14 bg-black/30 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70 backdrop-blur-md">
                  Merbabu Peak • 2025
                </div>
                <div className="rounded-full border border-white/14 bg-black/30 px-3 py-2 text-[11px] font-semibold text-white/70 backdrop-blur-md">
                  ✦
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
