"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE: any = [0.16, 1, 0.3, 1];

type Pair = { key: string; emoji: string };
type CardState = "hidden" | "open" | "matched";

type Card = {
  id: string;
  key: string;
  emoji: string;
  state: CardState;
};

const PAIRS: Pair[] = [
  { key: "coffee", emoji: "☕️" },
  { key: "laptop", emoji: "💻" },
  { key: "camera", emoji: "📷" },
  { key: "key", emoji: "🔑" },
  { key: "bike", emoji: "🚲" },
  { key: "book", emoji: "📘" },
  { key: "umbrella", emoji: "☂️" },
  { key: "flashlight", emoji: "🔦" },
];

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck(pairCount: number): Card[] {
  const chosen = shuffle(PAIRS).slice(0, pairCount);
  const deck: Card[] = [];

  for (const p of chosen) {
    deck.push({ id: uid(), key: p.key, emoji: p.emoji, state: "hidden" });
    deck.push({ id: uid(), key: p.key, emoji: p.emoji, state: "hidden" });
  }

  return shuffle(deck);
}

function formatSeconds(n: number) {
  return `${Math.max(0, Math.floor(n))}s`;
}

export default function MemoryMatchPage() {
  const reduceMotion = useReducedMotion();

  const [pairCount, setPairCount] = useState(8);
  const [cards, setCards] = useState<Card[]>(() => makeDeck(8));

  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);

  const [running, setRunning] = useState(false);
  const [timeSec, setTimeSec] = useState(0);
  const timeRef = useRef(0);

  const [locked, setLocked] = useState(false);
  const [shake, setShake] = useState(false);

  const matchedCount = useMemo(
    () => cards.filter((c) => c.state === "matched").length,
    [cards]
  );

  const won = cards.length > 0 && matchedCount === cards.length;

  const gridCols = useMemo(() => {
    if (pairCount <= 6) return "grid-cols-3 sm:grid-cols-4";
    if (pairCount <= 8) return "grid-cols-4 sm:grid-cols-6";
    return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8";
  }, [pairCount]);

  const reset = (newPairs: number = pairCount) => {
    setPairCount(newPairs);
    setCards(makeDeck(newPairs));
    setMoves(0);

    setRunning(false);
    setLocked(false);
    setShake(false);

    setTimeSec(0);
    timeRef.current = 0;
  };

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  // Timer
  useEffect(() => {
    if (!running) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const t = timeRef.current + dt;
      timeRef.current = t;

      if (!reduceMotion) setTimeSec(t);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, reduceMotion]);

  // Win handling
  useEffect(() => {
    if (!won) return;
    pause();

    const current = Math.floor(timeRef.current);
    setBest((b) => (b == null ? current : Math.min(b, current)));
  }, [won]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key.toLowerCase() === "enter") {
        if (!running && !won) start();
        return;
      }
      if (e.key.toLowerCase() === "r") reset(pairCount);
      if (e.key.toLowerCase() === "p") pause();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, won, pairCount]);

  const flip = (id: string) => {
    if (locked || won) return;

    const target = cards.find((c) => c.id === id);
    if (!target) return;
    if (target.state === "open" || target.state === "matched") return;

    if (!running) start();

    const openCards = cards.filter((c) => c.state === "open");
    if (openCards.length >= 2) return;

    const next = cards.map((c) => (c.id === id ? { ...c, state: "open" } : c));
    setCards(next);

    const nowOpen = next.filter((c) => c.state === "open");
    if (nowOpen.length !== 2) return;

    setMoves((m) => m + 1);

    const [a, b] = nowOpen;

    if (a.key === b.key) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.key === a.key ? { ...c, state: "matched" } : c))
        );
      }, reduceMotion ? 0 : 140);
      return;
    }

    // Not matched
    setLocked(true);
    setShake(true);
    setTimeout(() => setShake(false), 220);

    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) => (c.state === "open" ? { ...c, state: "hidden" } : c))
      );
      setLocked(false);
    }, reduceMotion ? 0 : 650);
  };

  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/70">
              Mini Game
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                Memory{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                  Match
                </span>
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                Klik untuk membalik kartu. Cocokkan dua gambar yang sama sampai
                semua pasangan terbuka.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-2">
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/60">
                  Pairs
                </span>
                <select
                  value={pairCount}
                  onChange={(e) => reset(Number(e.target.value))}
                  className="rounded-full border border-white/12 bg-transparent px-3 py-2 text-sm font-semibold text-foreground outline-none"
                >
                  <option value={6}>6 (12 cards)</option>
                  <option value={8}>8 (16 cards)</option>
                  <option value={10}>10 (20 cards)</option>
                </select>
              </div>

              {!running && !won ? (
                <button
                  onClick={start}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:-translate-y-[1px] transition-all duration-300"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={pause}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/10 transition-colors"
                >
                  Pause
                </button>
              )}

              <button
                onClick={() => reset(pairCount)}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* HUD */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <HudStat label="Moves" value={moves} />
          <HudStat label="Time" value={formatSeconds(timeSec)} />
          <HudStat label="Best" value={best == null ? "—" : formatSeconds(best)} />

          <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-semibold text-foreground/60">
            <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-1">Click</kbd>
            <span>flip</span>
            <span className="mx-1">•</span>
            <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-1">Space</kbd>
            <span>start</span>
            <span className="mx-1">•</span>
            <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-1">R</kbd>
            <span>reset</span>
          </div>
        </div>

        {/* Board */}
        <motion.div
          className={[
            "relative w-full overflow-hidden rounded-3xl border border-white/12 bg-white/5",
            "shadow-[0_30px_120px_rgba(0,0,0,0.20)]",
          ].join(" ")}
          animate={shake && !reduceMotion ? { x: [-2, 2, -2, 2, 0] } : undefined}
          transition={{ duration: 0.22 }}
        >
          <div className="relative p-4 sm:p-6 md:p-10">
            <div className={`grid ${gridCols} gap-3 sm:gap-4`}>
              {cards.map((c) => (
                <MemoryCard
                  key={c.id}
                  card={c}
                  disabled={!running || locked || won}
                  onFlip={() => flip(c.id)}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>

          {/* Start Reminder Modal */}
          {!running && !won && (
            <Overlay>
              <OverlayCard>
                <div className="flex items-center justify-center">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                    Ready
                  </div>
                </div>

                <div className="mt-4 text-2xl font-semibold text-white/90">
                  Mulai main?
                </div>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Buka dua kartu untuk mencari pasangan. Salah pasangan akan
                  tertutup lagi. Kamu menang jika semua kartu sudah{" "}
                  <span className="font-semibold text-white/85">matched</span>.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={start}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:-translate-y-[1px] transition-all duration-300"
                  >
                    Start
                  </button>

                  <button
                    onClick={() => reset(pairCount)}
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Shuffle
                  </button>
                </div>

                <div className="mt-4 text-xs font-semibold tracking-[0.22em] uppercase text-white/50">
                  Press Space / Enter to Start • R to Reset
                </div>
              </OverlayCard>
            </Overlay>
          )}

          {/* Win Modal */}
          {won && (
            <Overlay>
              <OverlayCard>
                <div className="text-sm font-semibold text-white/85">Menang 🎉</div>
                <div className="mt-2 text-base text-white/70">
                  Waktu:{" "}
                  <span className="font-semibold text-white">
                    {formatSeconds(timeRef.current)}
                  </span>{" "}
                  • Moves:{" "}
                  <span className="font-semibold text-white">{moves}</span>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => reset(pairCount)}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:-translate-y-[1px] transition-all duration-300"
                  >
                    Play Again
                  </button>

                  <button
                    onClick={() => reset(10)}
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Hard Mode
                  </button>
                </div>

                <div className="mt-4 text-xs font-semibold tracking-[0.22em] uppercase text-white/50">
                  Press R to Reset
                </div>
              </OverlayCard>
            </Overlay>
          )}
        </motion.div>

        <div className="mt-4 text-xs text-foreground/60">
          Tip: Ubah isi <code className="text-foreground/75">PAIRS</code> untuk
          mengganti gambar.
        </div>
      </div>
    </section>
  );
}

function HudStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-2">
      <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/60">
        {label}
      </div>
      <div className="text-xl font-semibold text-foreground">{value}</div>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-lg">{children}</div>
    </div>
  );
}

function OverlayCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-black/60 p-6 text-center shadow-2xl backdrop-blur-md sm:p-7">
      {children}
    </div>
  );
}

function MemoryCard({
  card,
  disabled,
  onFlip,
  reduceMotion,
}: {
  card: Card;
  disabled: boolean;
  onFlip: () => void;
  reduceMotion: boolean;
}) {
  const faceUp = card.state === "open" || card.state === "matched";

  return (
    <button
      onClick={onFlip}
      disabled={disabled || card.state === "matched"}
      className={[
        "group relative aspect-square w-full rounded-2xl border border-white/12 bg-black/20",
        "shadow-[0_18px_70px_rgba(0,0,0,0.20)] transition-transform duration-200",
        "hover:-translate-y-[1px] disabled:opacity-70 disabled:hover:translate-y-0",
        card.state === "matched" ? "ring-1 ring-cyan-300/30" : "",
      ].join(" ")}
      aria-label="memory card"
    >
      <div className="absolute inset-0 [perspective:1000px]">
        <div
          className={[
            "relative h-full w-full rounded-2xl transition-transform duration-500",
            "[transform-style:preserve-3d]",
            faceUp ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
            reduceMotion ? "duration-0" : "",
          ].join(" ")}
        >
          {/* Front */}
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 [backface-visibility:hidden]">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl border border-white/12 bg-white/5" />
              <div className="mt-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-foreground/60">
                Flip
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/10 bg-black/25 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="text-4xl sm:text-5xl">{card.emoji}</div>
          </div>
        </div>
      </div>
    </button>
  );
}
