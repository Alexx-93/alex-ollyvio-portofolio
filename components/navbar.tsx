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
        initial={reduceMotion ? undefined : { y: -10, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[120]"
      >
        {/* wrapper */}
        <div className="relative">
          {/* top glow line (selaras hero cyan/violet) */}
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

          <div
            className={[
              "relative border-b transition-all duration-300",
              // lebih selaras: glass gelap + sedikit tint cyan/violet
              isScrolled
                ? "border-white/10 bg-[#070a12]/70 backdrop-blur-xl"
                : "border-white/8 bg-[#070a12]/40 backdrop-blur-md",
            ].join(" ")}
          >
            {/* soft haze under navbar */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-b from-cyan-400/10 via-violet-400/6 to-transparent blur-2xl" />

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

            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
              {/* Brand */}
              <motion.button
                onClick={() => goTo("top")}
                className="group relative text-left"
                whileHover={reduceMotion ? undefined : { y: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                aria-label="Go to top"
              >
                {/* tiny dot accent */}
                <span className="pointer-events-none absolute -left-3 top-2 hidden h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_14px_rgba(34,211,238,0.55)] sm:block" />

                <div className="text-xs font-semibold tracking-tight text-white transition group-hover:text-white sm:text-sm">
                  <span className="bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent">
                    Alexander
                  </span>{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                    Ollyvio
                  </span>
                </div>
                <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-white/50 transition group-hover:text-white/70 sm:text-[11px]">
                  Portfolio
                </div>
              </motion.button>

              {/* Desktop */}
              <div className="hidden md:flex items-center gap-3">
                {/* pill container biar rapi */}
                <div className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5 backdrop-blur-md">
                  {/* gradient rim */}
                  <span className="pointer-events-none absolute inset-0 rounded-full [mask:linear-gradient(#000,transparent)] opacity-60" />
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />

                  {navItems.map((item, idx) => {
                    const active = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => goTo(item.id)}
                        initial={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * idx, duration: 0.3, ease: EASE }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className={[
                          "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
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
                        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100" />

                        <span className="relative">{item.label}</span>

                        {/* tiny underline glow */}
                        <span
                          className={[
                            "pointer-events-none absolute left-1/2 -bottom-[6px] h-[2px] w-10 -translate-x-1/2 rounded-full",
                            "bg-gradient-to-r from-cyan-300/0 via-cyan-300/60 to-violet-300/0",
                            active ? "opacity-100" : "opacity-0",
                          ].join(" ")}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* optional hint (rapi & kecil) */}
                <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-white/55">
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">Ctrl</span>
                  <span>+</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">K</span>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-2 md:hidden">
                <motion.button
                  onClick={() => setIsOpen((v) => !v)}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]
                           text-white/80 backdrop-blur-md transition-colors hover:text-white hover:bg-white/10"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.button>
              </div>
            </div>
          </div>
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
              transition={{ duration: 0.28, ease: EASE }}
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#070a12]/80 backdrop-blur-xl"
            >
              {/* gradient edge */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-300/25 via-white/10 to-violet-300/25" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="flex items-center justify-between px-6 pt-6">
                <div>
                  <div className="text-sm font-semibold text-white">Menu</div>
                  <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/55">
                    Sections
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={reduceMotion ? undefined : { rotate: 6 }}
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
                        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                        transition={{ delay: 0.05 * idx, duration: 0.28, ease: EASE }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className={[
                          "group relative w-full overflow-hidden rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300",
                          active
                            ? "border border-white/14 bg-white/10 text-white"
                            : "border border-white/10 bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/8",
                        ].join(" ")}
                      >
                        {!reduceMotion && (
                          <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[260%]" />
                        )}

                        <div className="relative flex items-center justify-between">
                          <span>{item.label}</span>
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)]" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-5 text-[11px] font-semibold text-white/50">
                  Tip: Press{" "}
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">Ctrl</span> +{" "}
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">K</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="h-0 w-0" />
    </>
  );
}
