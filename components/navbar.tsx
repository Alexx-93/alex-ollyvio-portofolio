"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type NavbarProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const reduceMotion = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Journey", id: "experience" },
      { label: "Certificates", id: "certificates" },
      { label: "Hobbies", id: "hobbies" },
      { label: "Tech Stack", id: "tech-stack" },
      { label: "Contact", id: "contact" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);

      const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const goTo = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav
        initial={reduceMotion ? undefined : { y: -12, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[120]"
      >
        <div className="relative">
          {/* top glow line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent"
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.55, 0.25] }}
            transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                  backgroundColor: isScrolled ? "rgba(7,10,18,0.70)" : "rgba(7,10,18,0.40)",
                  borderColor: isScrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.08)",
                }
            }
            transition={{ duration: 0.35, ease: EASE }}
            className={[
              "relative border-b backdrop-blur-md",
              isScrolled ? "backdrop-blur-xl" : "backdrop-blur-md",
            ].join(" ")}
            style={reduceMotion ? undefined : { willChange: "background-color, border-color" }}
          >
            {/* soft haze under navbar */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-b from-cyan-400/10 via-violet-400/6 to-transparent blur-2xl"
              animate={reduceMotion ? undefined : { opacity: isScrolled ? 0.85 : 0.6 }}
              transition={{ duration: 0.35, ease: EASE }}
            />

            {/* subtle moving shine */}
            {!reduceMotion && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                  aria-hidden
                  className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                  animate={{ x: ["-40%", "340%"] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}

            {/* micro noise (modern feel) */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />

            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
              {/* Brand */}
              <motion.button
                onClick={() => goTo("top")}
                className="group relative text-left"
                whileHover={reduceMotion ? undefined : { y: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                aria-label="Go to top"
              >
                {/* dot pulse */}
                <motion.span
                  className="pointer-events-none absolute -left-3 top-2 hidden h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_14px_rgba(34,211,238,0.55)] sm:block"
                  animate={reduceMotion ? undefined : { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                  transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="text-xs font-semibold tracking-tight sm:text-sm">
                  <span className="text-white/90 group-hover:text-white transition-colors">Alexander</span>{" "}
                  <span className="relative bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                    Ollyvio
                    {/* animated underline shimmer */}
                    {!reduceMotion && (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/55 to-violet-300/0"
                        animate={{ opacity: [0.0, 1, 0.0], x: ["-20%", "20%", "-20%"] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </span>
                </div>

                <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-white/55 transition-colors group-hover:text-white/70 sm:text-[11px]">
                  PORTFOLIO
                </div>
              </motion.button>

              {/* Desktop */}
              <div className="hidden md:flex items-center gap-3">
                {/* pill container */}
                <motion.div
                  className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5 backdrop-blur-md"
                  initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.45, ease: EASE }}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />

                  {/* slow rim glow */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute -inset-[1px] rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.15),rgba(167,139,250,0.12),rgba(34,211,238,0.15))] opacity-35 blur-xl"
                      animate={{ opacity: [0.22, 0.45, 0.22] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {navItems.map((item, idx) => {
                    const active = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => goTo(item.id)}
                        initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * idx, duration: 0.35, ease: EASE }}
                        whileHover={reduceMotion ? undefined : { y: -1 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className={[
                          "group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                          active ? "text-white" : "text-white/70 hover:text-white",
                        ].join(" ")}
                      >
                        {/* active pill */}
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="pointer-events-none absolute inset-0 rounded-full bg-white/8 ring-1 ring-inset ring-white/10"
                            transition={{ type: "spring", stiffness: 520, damping: 40 }}
                          />
                        )}

                        {/* hover glow */}
                        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/[0.06]" />

                        <span className="relative">{item.label}</span>

                        {/* tiny underline glow + micro dot */}
                        <span
                          className={[
                            "pointer-events-none absolute left-1/2 -bottom-[6px] h-[2px] w-10 -translate-x-1/2 rounded-full",
                            "bg-gradient-to-r from-cyan-300/0 via-cyan-300/60 to-violet-300/0",
                            active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                          ].join(" ")}
                        />
                        {active && (
                          <motion.span
                            layoutId="nav-dot"
                            className="pointer-events-none absolute -bottom-[10px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                            transition={{ type: "spring", stiffness: 520, damping: 40 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* hint */}
                <motion.div
                  className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-white/55"
                  initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.45, ease: EASE }}
                >
                </motion.div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-2 md:hidden">
                <motion.button
                  onClick={() => setIsOpen((v) => !v)}
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]
                           text-white/80 backdrop-blur-md transition-colors hover:text-white hover:bg-white/10"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  <motion.span
                    key={isOpen ? "close" : "menu"}
                    initial={reduceMotion ? undefined : { rotate: -12, opacity: 0, scale: 0.9 }}
                    animate={reduceMotion ? undefined : { rotate: 0, opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { rotate: 12, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="inline-flex"
                  >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[119] md:hidden"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            {/* backdrop */}
            <motion.button
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
            />

            {/* panel */}
            <motion.div
              initial={reduceMotion ? undefined : { x: 28, opacity: 0 }}
              animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: 28, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#070a12]/80 backdrop-blur-xl"
            >
              {/* gradient edge */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-300/25 via-white/10 to-violet-300/25" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* header */}
              <div className="flex items-center justify-between px-6 pt-6">
                <div>
                  <div className="text-sm font-semibold text-white">Menu</div>
                  <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/55">
                    Sections
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={reduceMotion ? undefined : { rotate: 8 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5
                             text-white/80 transition-colors hover:text-white hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="px-6 pb-10 pt-6">
                <div className="space-y-2">
                  {navItems.map((item, idx) => {
                    const active = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => goTo(item.id)}
                        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.06 * idx, duration: 0.3, ease: EASE }}
                        whileHover={reduceMotion ? undefined : { x: 2 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className={[
                          "group relative w-full overflow-hidden rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300",
                          active
                            ? "border border-white/14 bg-white/10 text-white"
                            : "border border-white/10 bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/8",
                        ].join(" ")}
                      >
                        {!reduceMotion && (
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                            animate={{ x: ["-20%", "240%"] }}
                            transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
                          />
                        )}

                        <div className="relative flex items-center justify-between">
                          <span>{item.label}</span>
                          {active && (
                            <motion.span
                              layoutId="mobile-dot"
                              className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                              transition={{ type: "spring", stiffness: 520, damping: 40 }}
                            />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <motion.div
                  className="mt-5 text-[11px] font-semibold text-white/50"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35, ease: EASE }}
                >
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="h-0 w-0" />
    </>
  );
}
