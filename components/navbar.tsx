"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 500, damping: 38 } as const;

type NavbarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // spring-driven progress bar
  const rawProgress = useSpring(0, { stiffness: 80, damping: 20, mass: 0.4 });
  const scaleX = useTransform(rawProgress, [0, 1], [0, 1]);

  const navItems = useMemo(() => [
    { label: "About", id: "about" },
    { label: "Journey", id: "experience" },
    { label: "Certificates", id: "certificates" },
    { label: "Hobbies", id: "hobbies" },
    { label: "Tech Stack", id: "tech-stack" },
    { label: "Contact", id: "contact" },
  ], []);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? sy / docH : 0;
      setScrolled(sy > 12);
      setProgress(p);
      rawProgress.set(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawProgress]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(v => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const goTo = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Main Nav ── */}
      <motion.nav
        initial={reduceMotion ? undefined : { y: -28, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[120]"
      >
        {/* ── Scroll progress bar (spring-smoothed) ── */}
        <motion.div
          className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400"
          style={reduceMotion ? { scaleX: progress } : { scaleX }}
        />

        {/* ── Nav body ── */}
        <motion.div
          animate={reduceMotion ? undefined : {
            backgroundColor: scrolled ? "rgba(7,10,18,0.85)" : "rgba(7,10,18,0.25)",
            borderColor: scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative border-b backdrop-blur-xl"
        >
          {/* bottom haze */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-b from-cyan-400/8 to-transparent blur-xl"
            animate={reduceMotion ? undefined : { opacity: scrolled ? 1 : 0.5 }}
            transition={{ duration: 0.4 }}
          />

          {/* animated shimmer sweep */}
          {!reduceMotion && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
              <motion.div
                aria-hidden
                className="absolute top-0 -left-[40%] h-full w-[30%] bg-gradient-to-r from-transparent via-white/6 to-transparent skew-x-[-20deg]"
                animate={{ x: ["0%", "500%"] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              />
            </div>
          )}

          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">

            {/* ── Brand ── */}
            <motion.button
              onClick={() => goTo("top")}
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              aria-label="Go to top"
              className="group relative text-left"
            >
              {/* pulsing dot */}
              <motion.span
                className="pointer-events-none absolute -left-4 top-[6px] hidden h-2 w-2 rounded-full bg-cyan-300 sm:block"
                animate={reduceMotion ? undefined : {
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 1, 0.6],
                  boxShadow: [
                    "0 0 8px rgba(34,211,238,0.4)",
                    "0 0 18px rgba(34,211,238,0.85)",
                    "0 0 8px rgba(34,211,238,0.4)",
                  ],
                }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* second outer ring pulse */}
              <motion.span
                className="pointer-events-none absolute -left-4 top-[6px] hidden h-2 w-2 rounded-full border border-cyan-300/40 sm:block"
                animate={reduceMotion ? undefined : { scale: [1, 2.8], opacity: [0.5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />

              <motion.div
                className="text-[13px] font-semibold tracking-tight sm:text-sm"
                initial={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              >
                <span className="text-white/85 transition-colors group-hover:text-white">Alexander</span>{" "}
                <motion.span
                  className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent"
                  animate={reduceMotion ? undefined : {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Ollyvio
                </motion.span>
              </motion.div>

              <motion.div
                className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/40 group-hover:text-white/60 transition-colors sm:text-[10px]"
                initial={reduceMotion ? undefined : { opacity: 0 }}
                animate={reduceMotion ? undefined : { opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Portfolio
              </motion.div>
            </motion.button>

            {/* ── Desktop pill nav ── */}
            <div className="hidden md:flex items-center">
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.96 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
                className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* ambient inner glow */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0"
                    animate={{ opacity: hoveredId ? 0.5 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08), transparent 70%)" }}
                  />
                )}

                {navItems.map((item, idx) => {
                  const active = activeSection === item.id;
                  const hovered = hoveredId === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      onHoverStart={() => setHoveredId(item.id)}
                      initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * idx + 0.25, duration: 0.32, ease: EASE }}
                      whileHover={reduceMotion ? undefined : { y: -1.5 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.96, y: 0 }}
                      className={[
                        "relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 lg:px-4",
                        active ? "text-white" : "text-white/52 hover:text-white/90",
                      ].join(" ")}
                    >
                      {/* hover bg */}
                      <AnimatePresence>
                        {hovered && !active && (
                          <motion.span
                            layoutId="desk-hover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="absolute inset-0 rounded-full bg-white/[0.06]"
                          />
                        )}
                      </AnimatePresence>

                      {/* active pill */}
                      {active && (
                        <motion.span
                          layoutId="desk-pill"
                          className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_16px_rgba(34,211,238,0.06)]"
                          transition={SPRING}
                        />
                      )}

                      <span className="relative">{item.label}</span>

                      {/* active glow dot */}
                      {active && (
                        <motion.span
                          layoutId="desk-dot"
                          className="absolute -bottom-[9px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300"
                          animate={reduceMotion ? undefined : {
                            boxShadow: [
                              "0 0 6px rgba(34,211,238,0.6)",
                              "0 0 14px rgba(34,211,238,1)",
                              "0 0 6px rgba(34,211,238,0.6)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", ...SPRING }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* ── Mobile Hamburger ── */}
            <motion.button
              onClick={() => setIsOpen(v => !v)}
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
              whileTap={reduceMotion ? undefined : { scale: 0.93 }}
              initial={reduceMotion ? undefined : { opacity: 0, rotate: -10 }}
              animate={reduceMotion ? undefined : { opacity: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={reduceMotion ? undefined : { rotate: -20, opacity: 0, scale: 0.8 }}
                  animate={reduceMotion ? undefined : { rotate: 0, opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { rotate: 20, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="inline-flex"
                >
                  {isOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[119] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* backdrop with blur */}
            <motion.button
              className="absolute inset-0 bg-[#070a12]/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />

            {/* panel */}
            <motion.div
              initial={reduceMotion ? undefined : { x: "100%", opacity: 0 }}
              animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-[300px] flex flex-col border-l border-white/10 bg-[#060812]/92 backdrop-blur-2xl"
            >
              {/* edge accents */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-300/35 via-white/8 to-violet-300/25" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* ambient glow */}
              <motion.div
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
                animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-violet-400/10 blur-3xl"
                animate={reduceMotion ? undefined : { opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-white/8">
                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: EASE }}
                >
                  <p className="text-sm font-semibold text-white">Navigation</p>
                  <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-white/35 mt-0.5">Sections</p>
                </motion.div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={reduceMotion ? undefined : { rotate: 90, scale: 1.08 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                  transition={{ duration: 0.22 }}
                  initial={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* nav items */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
                {navItems.map((item, idx) => {
                  const active = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
                      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, x: 16 }}
                      transition={{ delay: 0.05 * idx + 0.08, duration: 0.3, ease: EASE }}
                      whileHover={reduceMotion ? undefined : { x: 3, scale: 1.01 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      className={[
                        "group relative w-full overflow-hidden flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[13px] font-semibold transition-all duration-200",
                        active
                          ? "bg-white/10 border border-white/15 text-white"
                          : "bg-white/[0.03] border border-white/7 text-white/58 hover:text-white hover:bg-white/7 hover:border-white/12",
                      ].join(" ")}
                    >
                      {/* sweep shimmer on hover */}
                      {!reduceMotion && (
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 0.85, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
                        />
                      )}

                      <span className="relative">{item.label}</span>

                      {active ? (
                        <motion.span
                          layoutId="mob-dot"
                          className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-300"
                          animate={reduceMotion ? undefined : {
                            boxShadow: [
                              "0 0 6px rgba(34,211,238,0.5)",
                              "0 0 14px rgba(34,211,238,1)",
                              "0 0 6px rgba(34,211,238,0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ) : (
                        <motion.span
                          className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* footer */}
              <motion.div
                className="px-5 py-5 border-t border-white/8"
                initial={reduceMotion ? undefined : { opacity: 0 }}
                animate={reduceMotion ? undefined : { opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <p className="text-[9px] font-bold tracking-[0.24em] uppercase text-white/25">
                  Alexander Ollyvio • Portfolio
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="h-0 w-0" />
    </>
  );
}