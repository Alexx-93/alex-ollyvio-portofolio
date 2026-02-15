"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Award, X, ZoomIn, Calendar } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Certificate = {
  title: string;
  event: string;
  date: string;
  image: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** tiny magnetic hover for buttons */
function useMagnet(disabled?: boolean) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion || disabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      setT({ x: clamp(dx * 0.12, -10, 10), y: clamp(dy * 0.12, -10, 10) });
    };
    const onLeave = () => setT({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [disabled, reduceMotion]);

  return { ref, style: reduceMotion ? undefined : { x: t.x, y: t.y } };
}

/** light tilt for cards */
function useCardTilt(disabled?: boolean, max = 7) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || disabled) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rotY = (px - 0.5) * (max * 2);
    const rotX = -(py - 0.5) * (max * 2);

    el.style.transform = `perspective(1000px) rotateX(${clamp(
      rotX,
      -max,
      max
    )}deg) rotateY(${clamp(rotY, -max, max)}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return { ref, onMove, onLeave };
}

export default function Certificates() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<Certificate | null>(null);

  // zoom/pan state (lightbox)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const certificates: Certificate[] = useMemo(
    () => [
      {
        title: "Treasurer 1",
        event: "Revival Praise and Worship (KKR) Yogyakarta 2024",
        date: "September 27, 2024",
        image: "/images/image.png",
      },
      {
        title: "Member - Pubdokmed Division",
        event: "PMK Melisia Christi Management",
        date: "Jan — Dec 2023",
        image:
          "/images/alexander-20ollyvio-20kristo-20sentono-20-28pengurus-29.jpg",
      },
      {
        title: "Coordinator - Pubdok",
        event: "Christmas Social Service PMK Melisia Christi",
        date: "December 9, 2023",
        image: "/images/alexander-20ollyvio-20kristo-20sentono-page-0001.jpg",
      },
      {
        title: "Participant",
        event: "Design Thinking and Creativity Informatics Exhibition",
        date: "2022 / 2023",
        image: "/images/alexander-20ollyvio.png",
      },
      {
        title: "Participant",
        event: "Information Literacy Training - UAJY Library",
        date: "November 8, 2022",
        image:
          "/images/alexander-20ollyvio-20kristo-20sentono-sertifikat-20pelatihan-20literasi-20informasi.jpg",
      },
      {
        title: "Participant",
        event: "Social Service PMK Melisia Christi",
        date: "October 22, 2022",
        image: "/images/alexander-20ollyvio-20kristo-20sentonopmk.jpg",
      },
      {
        title: "Participant",
        event: "National Webinar: THE REPUTE - Future Public Relations",
        date: "September 17, 2022",
        image: "/images/alexander-20ollyvio-20kristo-20sentono-1.jpg",
      },
    ],
    []
  );

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "0" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // lock body scroll on open
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  // reset zoom/pan when open
  useEffect(() => {
    if (!active) return;
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [active]);

  const open = (c: Certificate) => setActive(c);
  const close = () => setActive(null);

  // wheel zoom (lightbox)
  const onWheel = (e: React.WheelEvent) => {
    if (!active) return;
    e.preventDefault();
    const next = clamp(zoom + (e.deltaY > 0 ? -0.1 : 0.1), 1, 2.6);
    setZoom(next);
    if (next === 1) setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1.01) return;
    isPanning.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const onPointerUp = () => {
    isPanning.current = false;
  };

  return (
    <section id="certificates" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-[520px] w-[520px] rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.07),transparent_60%)]" />
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
              Certificates
            </span>
          </div>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Certificates &{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            A curated collection of certifications and organizational achievements.
          </p>
        </motion.div>

        {/* ✅ FIX: samakan ukuran kotak tiap sertifikat
            - grid: auto-rows-fr => semua item dapat tinggi baris yang sama
            - card wrapper: h-full flex flex-col => isi card mengisi penuh
            - content: flex-1 + min height pada judul => bagian bawah rata
            - thumbnail: aspect konsisten
        */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {certificates.map((cert, idx) => {
            const tilt = useCardTilt(reduceMotion, 7);
            const zoomBtn = useMagnet();

            return (
              <motion.article
                key={`${cert.event}-${idx}`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.05, ease: EASE }}
                className="group relative h-full"
              >
                <div
                  ref={tilt.ref}
                  onMouseMove={reduceMotion ? undefined : tilt.onMove}
                  onMouseLeave={reduceMotion ? undefined : tilt.onLeave}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl
                             shadow-[0_15px_50px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:border-white/18 hover:bg-white/8
                             sm:rounded-3xl sm:shadow-[0_25px_90px_rgba(0,0,0,0.35)]"
                  style={{
                    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  }}
                >
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle,rgba(34,211,238,0.18),transparent_55%)]" />
                  <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle,rgba(167,139,250,0.14),transparent_55%)]" />

                  {/* image (thumbnail seragam) */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.event}
                      fill
                      className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    {/* overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-85" />

                    {/* shimmer sweep */}
                    {!reduceMotion && (
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ["-35%", "340%"] }}
                        transition={{
                          duration: 1.35,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 1.4,
                        }}
                      />
                    )}

                    {/* zoom button */}
                    <motion.button
                      ref={zoomBtn.ref}
                      style={zoomBtn.style}
                      onClick={() => open(cert)}
                      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                      className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full
                                 border border-white/18 bg-white/10 backdrop-blur-md
                                 text-white/85 hover:text-white hover:bg-white/15
                                 transition-colors"
                      aria-label="Open certificate"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* content (flex-1 biar konsisten) */}
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="inline-flex min-h-[28px] items-center gap-2 rounded-full border border-white/12 bg-white/0 px-2 py-1 text-[10px] font-semibold text-foreground/70 sm:min-h-[32px] sm:px-3 sm:text-[11px]">
                        <Award className="h-3 w-3 shrink-0 text-cyan-300/90 sm:h-4 sm:w-4" />
                        <span className="line-clamp-1">{cert.title}</span>
                      </div>

                      <div className="inline-flex min-h-[28px] items-center gap-2 text-[10px] font-semibold text-foreground/60 sm:min-h-[32px] sm:text-[11px]">
                        <Calendar className="h-3 w-3 shrink-0 text-violet-300/90 sm:h-4 sm:w-4" />
                        <span className="max-w-[10rem] truncate">{cert.date}</span>
                      </div>
                    </div>

                    {/* min height supaya semua card "rata" walau teks beda panjang */}
                    <h3 className="mt-3 min-h-[44px] line-clamp-2 text-sm font-semibold text-foreground sm:mt-4 sm:min-h-[48px] sm:text-base md:text-lg">
                      {cert.event}
                    </h3>

                    {/* push bottom divider to bottom */}
                    <div className="mt-auto pt-3 sm:pt-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-70" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            {/* backdrop */}
            <button
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={close}
              aria-label="Close"
            />

            <motion.div
              drag={reduceMotion ? false : "y"}
              dragConstraints={{ top: 0, bottom: 140 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110) close();
              }}
              initial={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl
                         shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
              role="dialog"
              aria-modal="true"
            >
              {/* top bar */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-5 py-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase text-white/60">
                    {active.title}
                  </div>
                  <div className="truncate text-sm font-semibold text-white/85">{active.event}</div>
                  <div className="mt-1 text-[11px] font-semibold text-white/55">
                    Tip: Scroll to zoom • Drag to pan • Drag down to close • Ctrl/⌘+0 reset
                  </div>
                </div>

                {(() => {
                  const closeBtn = useMagnet();
                  return (
                    <motion.button
                      ref={closeBtn.ref}
                      style={closeBtn.style}
                      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                      onClick={close}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/10
                                 text-white/85 hover:text-white hover:bg-white/15 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  );
                })()}
              </div>

              {/* image stage */}
              <div className="relative aspect-[1.414/1] w-full overflow-hidden" onWheel={onWheel}>
                <div
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  style={{ touchAction: "none" }}
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={reduceMotion ? undefined : { scale: zoom, x: pan.x, y: pan.y }}
                    style={
                      reduceMotion
                        ? { transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }
                        : undefined
                    }
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  >
                    <Image src={active.image} alt={active.event} fill className="object-contain" priority />
                  </motion.div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
