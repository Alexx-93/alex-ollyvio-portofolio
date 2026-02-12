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
    const onScroll = () => setIsScrolled(window.scrollY > 12);
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
        transition={{ duration: 0.65, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-[120]"
      >
        <div
          className={[
            "relative border-b transition-all duration-300",
            isScrolled
              ? "border-white/12 bg-background/70 backdrop-blur-xl"
              : "border-white/8 bg-background/35 backdrop-blur-md",
          ].join(" ")}
        >
          {/* glow haze */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-b from-cyan-400/10 via-violet-400/6 to-transparent blur-2xl" />

          {/* hairlines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent" />

          {/* subtle moving shine */}
          {!reduceMotion && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                aria-hidden
                className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/7 to-transparent"
                animate={{ x: ["-40%", "340%"] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}

          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:h-20 sm:px-6">
            {/* Brand */}
            <motion.button 
              onClick={() => goTo("top")} 
              className="group text-left"
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              aria-label="Go to top"
            >
              <div className="text-xs font-semibold tracking-tight text-foreground transition duration-300 group-hover:text-primary sm:text-sm">
                Alexander Ollyvio
              </div>
              <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-foreground/60 transition duration-300 group-hover:text-foreground/80 sm:text-[11px]">
                Portfolio
              </div>
            </motion.button>

            {/* Desktop */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-6">
                {navItems.map((item, idx) => {
                  const active = activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      initial={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * idx, duration: 0.35, ease: EASE }}
                      whileHover={reduceMotion ? undefined : { y: -1 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className={[
                        "group relative text-sm font-semibold transition-colors duration-300",
                        active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                      ].join(" ")}
                    >
                      {/* hover glow bg */}
                      <span className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/5" />

                      <span className="relative">{item.label}</span>

                      {/* active underline */}
                      <span
                        className={[
                          "pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full rounded-full",
                          "bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-violet-300/0",
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                        ].join(" ")}
                      />

                      {/* tiny glow dot (active) */}
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="pointer-events-none absolute -bottom-[10px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                onClick={() => setIsOpen((v) => !v)}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5
                           text-foreground/80 transition-colors backdrop-blur-md hover:text-foreground hover:bg-white/10"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
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
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/12 bg-background/75 backdrop-blur-xl"
            >
              {/* gradient edge */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-300/20 via-white/10 to-violet-300/20" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="flex items-center justify-between px-6 pt-6">
                <div>
                  <div className="text-sm font-semibold text-foreground">Menu</div>
                  <div className="mt-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/60">
                    Sections
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={reduceMotion ? undefined : { rotate: 6 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5
                             text-foreground/80 transition-colors hover:text-foreground hover:bg-white/10"
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
                            ? "border border-white/14 bg-white/10 text-foreground"
                            : "border border-white/10 bg-white/5 text-foreground/75 hover:text-foreground hover:bg-white/8",
                        ].join(" ")}
                      >
                        {/* hover shimmer */}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="h-0 w-0" />
    </>
  );
}
