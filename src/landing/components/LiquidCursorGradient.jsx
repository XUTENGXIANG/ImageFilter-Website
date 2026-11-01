import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "../lib/cn";

/**
 * Liquid cursor gradient background.
 *
 * Adapted from the rewampui `liquid-cursor-gradient` effect: large blurred orbs,
 * one of them spring-tracking the pointer. Rendered as a fixed, pointer-events-none
 * layer so it never changes layout or intercepts clicks. The palette is the site's
 * graphite + emerald instead of the showcase's lavender.
 */
export default function LiquidCursorGradient({ className }) {
  const reduceMotion = useReducedMotion();
  const layerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.8 });

  useEffect(() => {
    const center = () => {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    };
    center();

    if (reduceMotion) return undefined;

    const onMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{ filter: "blur(70px) saturate(120%)", transform: "translateZ(0)" }}
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 60, 0, -50, 0],
                  y: [0, -40, 50, -20, 0],
                  scale: [1, 1.15, 0.92, 1.08, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -left-[10%] -top-[10%] h-[60%] w-[62%] rounded-full opacity-50 mix-blend-screen"
          style={{ backgroundColor: "#0b3b2e" }}
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -50, 25, 35, 0],
                  y: [0, 35, -40, 25, 0],
                  scale: [1, 0.85, 1.25, 0.95, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[12%] -right-[8%] h-[62%] w-[54%] rounded-full opacity-55 mix-blend-screen"
          style={{ backgroundColor: "#27272a" }}
        />
        <motion.div
          className="absolute h-[460px] w-[460px] rounded-full opacity-10 mix-blend-screen"
          style={{
            backgroundColor: "#10b981",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </div>

      {/* Keep the hero and card text readable over the glow. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,.55)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
