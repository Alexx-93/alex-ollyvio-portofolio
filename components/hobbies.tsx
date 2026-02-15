"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const images = [
  { src: "/images/img-7023.jpeg", alt: "Mt. Lawu Summit" },
  { src: "/images/img-20190617.jpeg", alt: "Mt. Prau Peak" },
  { src: "/images/img-4742.jpeg", alt: "Mt. Merbabu Summit" },
  { src: "/images/img-4638.jpeg", alt: "Merbabu, View of Merapi" },
  { src: "/images/img-6371.jpeg", alt: "Mt. Andong" },
  { src: "/images/img-6346.jpeg", alt: "Mt. Andong, Mountain Path" },
  { src: "/images/img-7057.jpeg", alt: "Savanna, Mt. Lawu" },
];

export default function Hobbies() {
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = useMemo(
    () => (activeIndex === null ? null : images[activeIndex]),
    [activeIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + images.length) % images.length
        );
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIndex]);

  const open = (i: number) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <section id="hobbies" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      {/* ✅ Background disesuaikan: lebih “netral” + sama vibe section lain (cyan/violet di pinggir, NO glow di tengah) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
        <motion.div
          className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.05, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-[-180px] right-[-180px] h-[640px] w-[640px] rounded-full bg-violet-400/8 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -18, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 11, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]"
              animate={reduceMotion ? undefined : { scale: [1, 1.5, 1] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.1, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
              Beyond Code
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:mt-6 sm:text-4xl md:text-6xl">
            The{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-foreground/70 sm:mt-4 sm:text-base md:text-lg">
            Moments from the peaks. Raw landscapes. Quiet discipline. Perspective
            beyond the screen.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 sm:gap-5 sm:space-y-5 lg:columns-3 lg:gap-6 lg:space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl
                         shadow-[0_15px_50px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-white/18 hover:bg-white/8 hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                         sm:rounded-3xl sm:shadow-[0_25px_90px_rgba(0,0,0,0.35)]"
            >
              <div className="relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80" />

                {/* shimmer sweep */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-35%", "340%"] }}
                    transition={{
                      duration: 1.35,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1.4,
                    }}
                  />
                )}

                {/* Hover caption */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-5 sm:left-5 sm:right-5">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white sm:text-sm">
                    {img.alt}
                  </p>
                </div>

                <button
                  onClick={() => open(i)}
                  className="absolute inset-0"
                  aria-label="Open Image"
                />
              </div>

              {/* ❌ HAPUS “cahaya biru di tengah”
                  Ini sumbernya: radial cyan glow overlay.
                  Jadi kita hilangkan sepenuhnya, atau ganti highlight tipis di border.
              */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={close}
            />

            <motion.div
              key={active.src}
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x > 120) prev();
                if (info.offset.x < -120) next();
              }}
              initial={reduceMotion ? undefined : { scale: 0.96, opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl
                         shadow-[0_50px_160px_rgba(0,0,0,0.75)]"
              role="dialog"
              aria-modal="true"
            >
              {/* top bar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-5 py-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60">
                    Hiking Gallery
                  </div>
                  <div className="truncate text-sm font-semibold text-white/85">
                    {active.alt}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-white/55">
                    Tip: Swipe/drag • ← → keys • Esc
                  </div>
                </div>

                <button
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition hover:bg-white/20"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* stage */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  priority
                />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
                  <button
                    onClick={prev}
                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 hover:bg-white/20"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 hover:bg-white/20"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
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
