"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Counter (self-contained) */
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

/** ✅ iOS Safari viewport fix */
function useVhVar() {
  useEffect(() => {
    const set = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    set();
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
    };
  }, []);
}

function useMouseSpotlight() {
  const raf = useRef<number | null>(null);
  const [p, setP] = useState({ x: 50, y: 45 });

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

function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 26, mass: 0.6 });
  const ry = useSpring(0, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch =
      typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

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

    const isTouch =
      typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

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
    <motion.button
      ref={ref}
      onClick={onClick}
      style={reduceMotion ? undefined : { x: mx, y: my }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

import type { FC } from "react";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

// Inject keyframes once globally
const GLITCH_STYLE = `
@keyframes glitch {
  0%   { clip-path: inset(20% 0 50% 0); }
  5%   { clip-path: inset(10% 0 60% 0); }
  10%  { clip-path: inset(15% 0 55% 0); }
  15%  { clip-path: inset(25% 0 35% 0); }
  20%  { clip-path: inset(30% 0 40% 0); }
  25%  { clip-path: inset(40% 0 20% 0); }
  30%  { clip-path: inset(10% 0 60% 0); }
  35%  { clip-path: inset(15% 0 55% 0); }
  40%  { clip-path: inset(25% 0 35% 0); }
  45%  { clip-path: inset(30% 0 40% 0); }
  50%  { clip-path: inset(20% 0 50% 0); }
  55%  { clip-path: inset(10% 0 60% 0); }
  60%  { clip-path: inset(15% 0 55% 0); }
  65%  { clip-path: inset(25% 0 35% 0); }
  70%  { clip-path: inset(30% 0 40% 0); }
  75%  { clip-path: inset(40% 0 20% 0); }
  80%  { clip-path: inset(20% 0 50% 0); }
  85%  { clip-path: inset(10% 0 60% 0); }
  90%  { clip-path: inset(15% 0 55% 0); }
  95%  { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}
.glitch-text {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
}
.glitch-text::after,
.glitch-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #070a12;
}
.glitch-text::after {
  left: 10px;
  text-shadow: -5px 0 red;
  animation: glitch var(--after-duration, 3s) infinite linear alternate-reverse;
}
.glitch-text::before {
  left: -10px;
  text-shadow: 5px 0 cyan;
  animation: glitch var(--before-duration, 2s) infinite linear alternate-reverse;
}
.glitch-text.no-shadows::after { text-shadow: none; }
.glitch-text.no-shadows::before { text-shadow: none; }
.glitch-text.on-hover::after,
.glitch-text.on-hover::before {
  animation: none;
  opacity: 0;
}
.glitch-text.on-hover:hover::after,
.glitch-text.on-hover:hover::before {
  animation: glitch var(--after-duration, 3s) infinite linear alternate-reverse;
  opacity: 1;
}
`;

let glitchStyleInjected = false;

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}) => {
  useEffect(() => {
    if (glitchStyleInjected) return;
    const style = document.createElement("style");
    style.textContent = GLITCH_STYLE;
    document.head.appendChild(style);
    glitchStyleInjected = true;
  }, []);

  const inlineStyle = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
  } as React.CSSProperties;

  const cls = [
    "glitch-text",
    !enableShadows ? "no-shadows" : "",
    enableOnHover ? "on-hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span style={inlineStyle} data-text={children} className={cls}>
      {children}
    </span>
  );
};

export default function Hero({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const reduceMotion = useReducedMotion();
  const spotlight = useMouseSpotlight();
  const tilt = useTilt(8);

  useVhVar();

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
      className="relative overflow-hidden [--nav:80px] sm:[--nav:80px] pt-[var(--nav)]"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#070a12] via-[#0b1220] to-[#060812]" />
      <div className="pointer-events-none absolute inset-0 -z-10" style={overlayStyle} />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 -z-10 h-[520px] w-[520px] rounded-full bg-violet-400/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid items-center gap-8
            py-10 sm:py-12 lg:py-0
            lg:min-h-[calc(calc(var(--vh,1vh)*100)-var(--nav))]
            lg:grid-cols-[1fr_auto] lg:gap-10
          "
        >
          {/* left */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="space-y-5 sm:space-y-6"
          >
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                College Students
              </span>
            </div>

            {/* title */}
            <h1 className="font-semibold tracking-tight text-white leading-[0.98] text-[clamp(34px,9vw,72px)]">
              <GlitchText
                speed={1}
                enableShadows
                enableOnHover={false}
                className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent font-semibold tracking-tight leading-[0.98] text-[clamp(34px,9vw,72px)]"
              >
                Alexander
              </GlitchText>{" "}
              <GlitchText
                speed={1.4}
                enableShadows
                enableOnHover={false}
                className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent font-semibold tracking-tight leading-[0.98] text-[clamp(34px,9vw,72px)]"
              >
                Ollyvio
              </GlitchText>
            </h1>

            <p className="max-w-[56ch] text-[13px] leading-relaxed text-white/70 sm:text-lg">
              Computer science student at Universitas Atma Jaya Yogyakarta focused on web development and cybersecurity,
              specializing in frontend and UI/UX. Committed to building modern, secure, and user-centered digital systems.
            </p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
            >
              <MagneticButton
                onClick={() => goTo("projects")}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black
                           shadow-[0_16px_60px_rgba(255,255,255,0.08)]
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_80px_rgba(34,211,238,0.18)]
                           sm:w-auto"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => goTo("contact")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/16 bg-white/6 px-6 text-sm font-semibold text-white
                           backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Contact
              </MagneticButton>

              <a
                href="/cv.pdf"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/16 bg-white/0 px-6 text-sm font-semibold text-white/80
                           transition-colors hover:text-white hover:bg-white/6 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>

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
                  className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 backdrop-blur-md
                             transition-colors hover:bg-white/10"
                >
                  <span
                    className="pointer-events-none absolute -inset-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100
                               bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_60%)] blur-xl rounded-full"
                  />
                  <s.icon className="relative h-5 w-5 text-white/75 group-hover:text-white" />
                </a>
              ))}
            </div>

            {/* stats */}
            <div className="grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Projects", value: 7 },
                { label: "Stacks", value: 6 },
                { label: "Exp", value: 2 },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-md transition-colors hover:bg-white/8 sm:p-4"
                >
                  <div className="text-xl font-semibold text-white sm:text-2xl">
                    <AnimatedCounter end={s.value} />+
                  </div>
                  <div className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55 sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ===== RIGHT: foto tanpa card background ===== */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.97 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative flex items-center justify-center lg:justify-end pb-4 sm:pb-8 lg:pb-0"
          >
            <motion.div
              ref={tilt.ref}
              style={
                reduceMotion
                  ? undefined
                  : { rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }
              }
              className="
                relative
                w-[320px] sm:w-[380px] md:w-[400px] lg:w-[min(420px,42vw)]
                aspect-[3/4]
                overflow-hidden rounded-3xl
              "
            >
              {/* Foto langsung tanpa card background */}
              <Image
                src="/images/img-2273.jpeg"
                alt="Alexander Ollyvio"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                priority
              />

              {/* Gradient halus di bawah untuk teks label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              {/* Label lokasi */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center rounded-full border border-white/14 bg-black/30 px-3 py-1.5 text-[10px] font-semibold tracking-[0.20em] uppercase text-white/70 backdrop-blur-md">
                  Merbabu Peak • 2025
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}