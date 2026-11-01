import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
}

export default function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "left",
  actions,
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-landing-mono text-micro uppercase tracking-[0.12em] text-ink-faint">
        <span className="size-1.5 rounded-full bg-data" aria-hidden="true" />
        {eyebrow}
      </p>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <h2 className="font-display text-display-lg font-semibold text-ink text-balance">
          {title}
        </h2>
        {actions}
      </div>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-body-lg text-ink-muted text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
