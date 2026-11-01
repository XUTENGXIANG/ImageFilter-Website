import { useId, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "../lib/cn";
import { glassCard } from "../lib/surfaces";

interface DisclosureProps {
  title: string;
  children: ReactNode;
  index?: string;
  label?: string;
  variant?: "faq" | "card";
  defaultOpen?: boolean;
  className?: string;
}

export default function Disclosure({
  title,
  children,
  index,
  label,
  variant = "faq",
  defaultOpen = false,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const buttonId = `${panelId}-button`;
  const isCard = variant === "card";

  return (
    <div
      className={cn(
        isCard ? cn("overflow-hidden rounded-card", glassCard) : "border-b border-line",
        className,
      )}
    >
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "flex w-full cursor-pointer text-left transition-colors duration-200 active:bg-white/[0.03]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70",
          isCard
            ? "items-center gap-3 px-5 py-4 hover:bg-white/[0.015]"
            : "items-baseline gap-4 py-5 hover:bg-white/[0.02]",
        )}
      >
        {isCard ? (
          <span className="font-landing-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
            {label}
          </span>
        ) : (
          <span className="font-landing-mono text-[10.5px] tabular-nums text-ink-faint">
            {index}
          </span>
        )}
        <span
          className={cn(
            "flex-1 font-medium text-ink text-balance",
            isCard ? "text-body" : "text-[15px]",
          )}
        >
          {title}
        </span>
        <Plus
          className={cn(
            "size-4 shrink-0 text-ink-faint transition-transform duration-200 ease-brand",
            isCard ? "" : "translate-y-0.5",
            open && "rotate-45",
          )}
          aria-hidden="true"
        />
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                height: { duration: 0.26, ease: [0.19, 1, 0.22, 1] },
                opacity: { duration: 0.18, ease: [0.2, 0.6, 0.2, 1] },
              }
        }
        className="overflow-hidden"
        inert={!open}
        aria-hidden={!open}
      >
        <div
          className={cn(
            isCard
              ? "border-t border-line px-5 pb-5 pt-4"
              : "max-w-prose pb-5 pl-[30px] text-body leading-[1.7] text-ink-muted text-pretty",
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
