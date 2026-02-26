"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type CardState = "hidden" | "open" | "matched";
type Card = { id: string; key: string; emoji: string; state: CardState };
type Difficulty = "easy" | "medium" | "hard";

const ALL_PAIRS = [
  { key: "coffee", emoji: "☕" },
  { key: "laptop", emoji: "💻" },
  { key: "camera", emoji: "📷" },
  { key: "key", emoji: "🔑" },
  { key: "bike", emoji: "🚲" },
  { key: "book", emoji: "📘" },
  { key: "umbrella", emoji: "☂️" },
  { key: "flashlight", emoji: "🔦" },
  { key: "rocket", emoji: "🚀" },
  { key: "globe", emoji: "🌍" },
  { key: "fire", emoji: "🔥" },
  { key: "diamond", emoji: "💎" },
  { key: "crown", emoji: "👑" },
  { key: "lightning", emoji: "⚡" },
  { key: "shield", emoji: "🛡️" },
  { key: "sword", emoji: "⚔️" },
  { key: "potion", emoji: "🧪" },
  { key: "ghost", emoji: "👻" },
  { key: "skull", emoji: "💀" },
  { key: "target", emoji: "🎯" },
  { key: "trophy", emoji: "🏆" },
  { key: "bomb", emoji: "💣" },
  { key: "alien", emoji: "👾" },
  { key: "robot", emoji: "🤖" },
];

const DIFFICULTY: Record<Difficulty, { label: string; pairs: number; flipTimeout: number; cols: string }> = {
  easy: { label: "Easy", pairs: 6, flipTimeout: 900, cols: "grid-cols-4" },
  medium: { label: "Medium", pairs: 8, flipTimeout: 700, cols: "grid-cols-4 sm:grid-cols-4" },
  hard: { label: "Hard", pairs: 12, flipTimeout: 500, cols: "grid-cols-4 sm:grid-cols-6" },
};

function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck(pairs: number): Card[] {
  const chosen = shuffle(ALL_PAIRS).slice(0, pairs);
  return shuffle(chosen.flatMap(p => [
    { id: uid(), key: p.key, emoji: p.emoji, state: "hidden" as CardState },
    { id: uid(), key: p.key, emoji: p.emoji, state: "hidden" as CardState },
  ]));
}

function formatTime(sec: number) {
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}

export default function EndGame() {
  const reduceMotion = useReducedMotion();
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [cards, setCards] = useState<Card[]>(() => makeDeck(DIFFICULTY.easy.pairs));
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<Partial<Record<Difficulty, number>>>({});
  const [running, setRunning] = useState(false);
  const [timeSec, setTimeSec] = useState(0);
  const [locked, setLocked] = useState(false);
  const [shakeIds, setShakeIds] = useState<string[]>([]);
  const [matchIds, setMatchIds] = useState<string[]>([]);
  const timeRef = useRef(0);

  const cfg = DIFFICULTY[difficulty];
  const matchedCount = useMemo(() => cards.filter(c => c.state === "matched").length, [cards]);
  const won = cards.length > 0 && matchedCount === cards.length;
  const progress = cards.length > 0 ? matchedCount / cards.length : 0;

  const reset = (diff: Difficulty = difficulty) => {
    setDifficulty(diff);
    setCards(makeDeck(DIFFICULTY[diff].pairs));
    setMoves(0);
    setRunning(false);
    setLocked(false);
    setShakeIds([]);
    setMatchIds([]);
    setTimeSec(0);
    timeRef.current = 0;
  };

  // Timer
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      timeRef.current += dt;
      setTimeSec(timeRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  // Win
  useEffect(() => {
    if (!won) return;
    setRunning(false);
    const cur = Math.floor(timeRef.current);
    setBest(b => ({ ...b, [difficulty]: b[difficulty] == null ? cur : Math.min(b[difficulty]!, cur) }));
  }, [won, difficulty]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !running && !won) setRunning(true);
      if (e.key.toLowerCase() === "r") reset();
      if (e.key.toLowerCase() === "p") setRunning(v => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, won, difficulty]);

  const flip = (id: string) => {
    if (locked || won) return;
    const target = cards.find(c => c.id === id);
    if (!target || target.state !== "hidden") return;
    if (!running) setRunning(true);

    const openCards = cards.filter(c => c.state === "open");
    if (openCards.length >= 2) return;

    const next = cards.map(c => c.id === id ? { ...c, state: "open" as CardState } : c);
    setCards(next);

    const nowOpen = next.filter(c => c.state === "open");
    if (nowOpen.length !== 2) return;

    setMoves(m => m + 1);
    const [a, b] = nowOpen;

    if (a.key === b.key) {
      // Match!
      setMatchIds([a.id, b.id]);
      setTimeout(() => {
        setCards(prev => prev.map(c => c.key === a.key ? { ...c, state: "matched" as CardState } : c));
        setMatchIds([]);
      }, reduceMotion ? 0 : 180);
    } else {
      // No match
      setLocked(true);
      setShakeIds([a.id, b.id]);
      setTimeout(() => setShakeIds([]), 420);
      setTimeout(() => {
        setCards(prev => prev.map(c => c.state === "open" ? { ...c, state: "hidden" as CardState } : c));
        setLocked(false);
      }, reduceMotion ? 0 : cfg.flipTimeout);
    }
  };

  return (
    <section className="relative overflow-hidden py-14 sm:py-16">
      {/* Ambient BG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-violet-400/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60">Mini Game</span>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Memory{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                  Match
                </span>
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
                Balik dua kartu, cari pasangannya. Cocokkan semua untuk menang!
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(DIFFICULTY) as Difficulty[]).map(d => (
                <motion.button
                  key={d}
                  onClick={() => reset(d)}
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  className={[
                    "rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                    difficulty === d
                      ? "bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                      : "border border-white/12 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {DIFFICULTY[d].label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => reset()}
                whileHover={reduceMotion ? undefined : { y: -1, rotate: 180 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                transition={{ rotate: { duration: 0.4 } }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                title="Shuffle (R)"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── HUD ── */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="mb-4 flex flex-wrap items-stretch gap-2 sm:gap-3"
        >
          <HudStat label="Moves" value={moves} highlight={moves > 0 && moves % 10 === 0} reduceMotion={!!reduceMotion} />
          <HudStat label="Time" value={formatTime(timeSec)} reduceMotion={!!reduceMotion} />
          <HudStat label="Best" value={best[difficulty] != null ? formatTime(best[difficulty]!) : "—"} reduceMotion={!!reduceMotion} />
          <HudStat label="Matched" value={`${matchedCount / 2} / ${cfg.pairs}`} reduceMotion={!!reduceMotion} />

          {/* progress bar */}
          <div className="ml-auto hidden md:flex flex-col justify-center gap-1 min-w-[140px]">
            <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-white/35">
              <span>Progress</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                animate={{ scaleX: progress }}
                style={{ transformOrigin: "left" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          {/* keyboard hints */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-white/35 self-center">
            {[["Space", "start"], ["P", "pause"], ["R", "reset"]].map(([k, v]) => (
              <React.Fragment key={k}>
                <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-white/50">{k}</kbd>
                <span>{v}</span>
                <span className="last:hidden text-white/20">•</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ── Board ── */}
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-sm"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          {/* board inner top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

          <div className="p-3 sm:p-4 md:p-5">
            <div className={`grid ${cfg.cols} gap-1.5 sm:gap-2`}>
              <AnimatePresence mode="popLayout">
                {cards.map((c, i) => (
                  <MemoryCard
                    key={c.id}
                    card={c}
                    index={i}
                    disabled={!running || locked || won}
                    onFlip={() => flip(c.id)}
                    isShaking={shakeIds.includes(c.id)}
                    isJustMatched={matchIds.includes(c.id)}
                    reduceMotion={!!reduceMotion}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Start Overlay ── */}
          <AnimatePresence>
            {!running && !won && (
              <GameOverlay key="start">
                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="rounded-3xl border border-white/14 bg-[#070a12]/85 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-8 w-full max-w-sm mx-auto"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    <span className="text-lg">🎮</span>
                    <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/60">Ready to play?</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Memory Match</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">
                    <span className="font-semibold text-white">{cfg.pairs * 2} kartu</span> • {cfg.pairs} pasang •{" "}
                    <span className="font-semibold text-white">{DIFFICULTY[difficulty].label}</span>
                  </p>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <motion.button
                      onClick={() => setRunning(true)}
                      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(34,211,238,0.25)] transition-shadow"
                    >
                      Start ▶
                    </motion.button>
                    <motion.button
                      onClick={() => reset()}
                      whileHover={reduceMotion ? undefined : { y: -1 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      🔀 Shuffle
                    </motion.button>
                  </div>
                </motion.div>
              </GameOverlay>
            )}
          </AnimatePresence>

          {/* ── Win Overlay ── */}
          <AnimatePresence>
            {won && (
              <GameOverlay key="win">
                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0, scale: 0.88, y: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-3xl border border-white/14 bg-[#070a12]/88 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-8 w-full max-w-sm mx-auto"
                >
                  {/* confetti-ish emoji rain */}
                  <motion.div
                    className="text-4xl mb-2"
                    animate={reduceMotion ? undefined : { rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">You Won!</h3>
                  <div className="mt-2 flex justify-center gap-4 text-sm text-white/60">
                    <span>⏱ <span className="font-semibold text-white">{formatTime(timeRef.current)}</span></span>
                    <span>🎯 <span className="font-semibold text-white">{moves} moves</span></span>
                    {best[difficulty] != null && (
                      <span>🏆 <span className="font-semibold text-cyan-300">{formatTime(best[difficulty]!)}</span></span>
                    )}
                  </div>
                  {/* star rating */}
                  <div className="mt-3 flex justify-center gap-1 text-xl">
                    {Array.from({ length: 3 }).map((_, i) => {
                      const lit = moves <= cfg.pairs + i * 4;
                      return (
                        <motion.span
                          key={i}
                          initial={reduceMotion ? undefined : { scale: 0, rotate: -30 }}
                          animate={reduceMotion ? undefined : { scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 300, damping: 18 }}
                        >
                          {lit ? "⭐" : "☆"}
                        </motion.span>
                      );
                    })}
                  </div>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <motion.button
                      onClick={() => reset(difficulty)}
                      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_12px_32px_rgba(34,211,238,0.2)] transition-shadow"
                    >
                      Play Again
                    </motion.button>
                    {difficulty !== "hard" && (
                      <motion.button
                        onClick={() => reset(difficulty === "easy" ? "medium" : "hard")}
                        whileHover={reduceMotion ? undefined : { y: -1 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                        className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        Next Level ↑
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </GameOverlay>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-3 text-[11px] text-white/30">
          {cfg.pairs * 2} kartu total • {cfg.pairs} pasang • Difficulty: {DIFFICULTY[difficulty].label}
        </p>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function HudStat({ label, value, highlight = false, reduceMotion }: {
  label: string; value: React.ReactNode; highlight?: boolean; reduceMotion: boolean;
}) {
  return (
    <motion.div
      animate={highlight && !reduceMotion ? { scale: [1, 1.12, 1] } : undefined}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
    >
      <div className="text-[9px] font-bold tracking-[0.24em] uppercase text-white/35">{label}</div>
      <div className="mt-0.5 text-lg font-semibold text-white leading-none">{value}</div>
    </motion.div>
  );
}

function GameOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-sm">{children}</div>
    </div>
  );
}

function MemoryCard({ card, index, disabled, onFlip, isShaking, isJustMatched, reduceMotion }: {
  card: Card;
  index: number;
  disabled: boolean;
  onFlip: () => void;
  isShaking: boolean;
  isJustMatched: boolean;
  reduceMotion: boolean;
}) {
  const faceUp = card.state === "open" || card.state === "matched";
  const isMatched = card.state === "matched";

  return (
    <motion.button
      onClick={onFlip}
      disabled={disabled || isMatched}
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
      animate={reduceMotion ? undefined : {
        opacity: 1,
        scale: 1,
        x: isShaking ? [-4, 4, -4, 4, -2, 2, 0] : 0,
      }}
      transition={{
        opacity: { delay: index * 0.015, duration: 0.3, ease: EASE },
        scale: { delay: index * 0.015, duration: 0.35, ease: EASE },
        x: { duration: 0.38, ease: "easeInOut" },
      }}
      whileHover={reduceMotion || disabled || isMatched ? undefined : { y: -3, scale: 1.04 }}
      whileTap={reduceMotion || disabled || isMatched ? undefined : { scale: 0.96 }}
      className={[
        "group relative aspect-square w-full rounded-xl sm:rounded-2xl outline-none",
        "transition-shadow duration-200",
        isMatched
          ? "ring-1 ring-cyan-300/40 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
          : "border border-white/10 hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
        disabled && !isMatched ? "cursor-default" : "cursor-pointer",
      ].join(" ")}
      aria-label={`card ${card.key}`}
    >
      {/* match pulse ring */}
      {isJustMatched && !reduceMotion && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border border-cyan-300/60"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

      {/* 3D flip wrapper */}
      <div className="absolute inset-0 [perspective:800px]">
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: faceUp ? 180 : 0 }}
          transition={reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 24 }
          }
        >
          {/* FRONT (hidden face) */}
          <div className="absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.05] [backface-visibility:hidden] overflow-hidden border border-white/8">
            {/* shimmer on hover */}
            {!reduceMotion && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div className="h-7 w-7 rounded-lg bg-white/8 sm:h-8 sm:w-8" />
              <div className="h-1 w-8 rounded-full bg-white/6" />
            </div>
          </div>

          {/* BACK (emoji face) */}
          <div
            className={[
              "absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden",
              isMatched
                ? "bg-gradient-to-br from-cyan-400/10 to-violet-400/10 border border-cyan-300/25"
                : "bg-black/30 border border-white/10",
            ].join(" ")}
          >
            {isMatched && !reduceMotion && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.10), transparent 70%)" }}
              />
            )}
            <motion.span
              className="text-xl sm:text-2xl md:text-3xl select-none"
              animate={isJustMatched && !reduceMotion ? { scale: [1, 1.4, 1], rotate: [0, 8, -8, 0] } : undefined}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              suppressHydrationWarning
            >
              {card.emoji}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
}