import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, CloudDownload } from "lucide-react";

const DISC = 44;
const STROKE = 4;
const RING_R = DISC / 2 + 5;
const RING_BOX = (RING_R + STROKE / 2) * 2;
const CIRC = 2 * Math.PI * RING_R;
const DURATION = 2200;

function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 255;
  const ag = (ah >> 8) & 255;
  const ab = ah & 255;
  const br = (bh >> 16) & 255;
  const bg = (bh >> 8) & 255;
  const bb = bh & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const blue = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${blue})`;
}

export default function NeumorphicDownloadButton({
  href,
  label,
  downloadingLabel,
  doneLabel,
  external = false,
  className = "",
}) {
  const [phase, setPhase] = useState("idle");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const resetRef = useRef(null);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resetRef.current) window.clearTimeout(resetRef.current);
    },
    [],
  );

  const startDownload = () => {
    if (phase !== "idle") return;
    setPhase("downloading");
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        resetRef.current = window.setTimeout(() => {
          setPhase("idle");
          setProgress(0);
        }, 1800);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const colorT = Math.min(1, progress * 1.3);
  const iconColor = phase === "idle" ? "#8f8f8f" : lerpColor("#8f8f8f", "#10b981", colorT);
  const offset = CIRC * (1 - progress);
  const statusLabel =
    phase === "idle" ? label : phase === "downloading" ? downloadingLabel : doneLabel;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onClick={startDownload}
      aria-busy={phase === "downloading" || undefined}
      className={`relative flex w-full select-none items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 transition-[filter] duration-200 hover:brightness-110 ${className}`}
      style={{
        background: "#161616",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "8px 8px 20px rgba(0,0,0,0.65), -6px -6px 18px rgba(255,255,255,0.04), inset 0 1px 1px rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: RING_BOX, height: RING_BOX }}
        aria-hidden="true"
      >
        {phase === "downloading" && (
          <svg width={RING_BOX} height={RING_BOX} className="absolute inset-0 -rotate-90">
            <circle
              cx={RING_BOX / 2}
              cy={RING_BOX / 2}
              r={RING_R}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
            />
            <circle
              cx={RING_BOX / 2}
              cy={RING_BOX / 2}
              r={RING_R}
              stroke="#10b981"
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              strokeLinejoin="round"
            />
          </svg>
        )}
        <div
          className="relative flex items-center justify-center rounded-full transition-colors"
          style={{
            width: DISC,
            height: DISC,
            background: "#0f0f0f",
            boxShadow:
              "inset 2px 2px 5px rgba(0,0,0,0.65), inset -2px -2px 5px rgba(255,255,255,0.05)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {phase !== "done" ? (
              <motion.span
                key="cloud"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <CloudDownload size={18} strokeWidth={1.8} style={{ color: iconColor }} />
              </motion.span>
            ) : (
              <motion.span
                key="done"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: [0.6, 1.2, 1] }}
                transition={{ duration: 0.35 }}
              >
                <Check size={18} strokeWidth={2.2} style={{ color: "#10b981" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <span className="neumorphic-download-label flex-1 min-w-0 truncate text-left font-landing text-[13px] font-semibold text-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.2 }}
            className="inline-block max-w-full align-middle"
          >
            {statusLabel}
          </motion.span>
        </AnimatePresence>
      </span>
    </a>
  );
}
