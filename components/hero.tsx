"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import DecryptedText from "./DecryptedText";

const EASE = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function AnimatedCounter({ end, duration = 900 }: { end: number; duration?: number }) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) { setValue(end); return; }
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

function useVhVar() {
  useEffect(() => {
    const set = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
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
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      rx.set(clamp(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -maxDeg, -maxDeg, maxDeg));
      ry.set(clamp(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * maxDeg, -maxDeg, maxDeg));
    };
    const onLeave = () => { rx.set(0); ry.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [maxDeg, rx, ry]);
  return { ref, rotateX: rx, rotateY: ry };
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className: string; onClick?: () => void }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const mx = useSpring(0, { stiffness: 320, damping: 22 });
  const my = useSpring(0, { stiffness: 320, damping: 22 });
  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.12, -10, 10));
      my.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.12, -10, 10));
    };
    const onLeave = () => { mx.set(0); my.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [mx, my, reduceMotion]);
  return (
    <motion.button ref={ref} onClick={onClick} style={reduceMotion ? undefined : { x: mx, y: my }} className={className}>
      {children}
    </motion.button>
  );
}

export default function Hero({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const reduceMotion = useReducedMotion();
  const spotlight = useMouseSpotlight();
  const tilt = useTilt(8);
  useVhVar();

  const overlayStyle = useMemo(() => ({
    background: `
      radial-gradient(900px circle at ${spotlight.x}% ${spotlight.y}%, rgba(34,211,238,0.14), rgba(10,12,20,0.0) 60%),
      radial-gradient(780px circle at ${spotlight.x}% ${spotlight.y}%, rgba(167,139,250,0.10), rgba(10,12,20,0.0) 64%)
    `,
  }), [spotlight.x, spotlight.y]);

  const goTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative overflow-hidden [--nav:80px] pt-[var(--nav)]"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#070a12] via-[#0b1220] to-[#060812]" />
      <div className="pointer-events-none absolute inset-0 -z-10" style={overlayStyle} />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 -z-10 h-[520px] w-[520px] rounded-full bg-violet-400/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-10 sm:py-12 lg:py-0 lg:min-h-[calc(calc(var(--vh,1vh)*100)-var(--nav))] lg:grid-cols-[1fr_auto] lg:gap-16">

          {/* ── LEFT ── */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="space-y-5 sm:space-y-7"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">College Students</span>
            </div>

            {/* Name */}
            <h1 className="font-semibold tracking-tight text-white leading-[1] text-[clamp(36px,8vw,76px)]">
              <DecryptedText
                text="Alexander"
                speed={60}
                maxIterations={14}
                sequential
                revealDirection="start"
                animateOn="view"
                className="text-white font-semibold"
                encryptedClassName="text-white/25 font-semibold"
                parentClassName="font-semibold tracking-tight leading-[1] text-[clamp(36px,8vw,76px)]"
              />
              {" "}
              <DecryptedText
                text="Ollyvio"
                speed={55}
                maxIterations={14}
                sequential
                revealDirection="start"
                animateOn="view"
                className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent font-semibold"
                encryptedClassName="text-cyan-300/25 font-semibold"
                parentClassName="font-semibold tracking-tight leading-[1] text-[clamp(36px,8vw,76px)]"
              />
            </h1>

            {/* Bio */}
            <p className="max-w-[52ch] text-[13px] leading-relaxed text-white/65 sm:text-base">
              Computer science student at Universitas Atma Jaya Yogyakarta focused on web development
              and cybersecurity, specializing in frontend and UI/UX. Committed to building modern,
              secure, and user-centered digital systems.
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
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black shadow-[0_16px_60px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_80px_rgba(34,211,238,0.18)] sm:w-auto"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => goTo("contact")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/16 bg-white/6 px-6 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Contact
              </MagneticButton>

              <a
                href="/cv.pdf"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/16 px-6 text-sm font-semibold text-white/80 transition-colors hover:bg-white/6 hover:text-white sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>

            {/* Socials */}
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
                  className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  <span className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_60%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <s.icon className="relative h-5 w-5 text-white/75 group-hover:text-white" />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="grid max-w-sm grid-cols-3 gap-2 sm:gap-3">
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
                  <div className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/50 sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Photo ── */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.97 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative flex items-center justify-center lg:justify-end pb-4 sm:pb-8 lg:pb-0"
          >
            <motion.div
              ref={tilt.ref}
              style={reduceMotion ? undefined : { rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[300px] sm:w-[360px] md:w-[400px] lg:w-[min(460px,44vw)] aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/img-2273.jpeg"
                alt="Alexander Ollyvio"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 460px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
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