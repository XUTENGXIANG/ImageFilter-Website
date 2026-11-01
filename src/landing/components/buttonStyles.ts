import { cn } from "../lib/cn";

export type ButtonVariant = "solid" | "ghost" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

const sizes: Record<ButtonSize, string> = {
  sm: "h-[34px] px-[14px] text-[12.5px]",
  md: "h-9 px-4 text-[13px]",
  lg: "h-10 px-[18px] text-[13.5px]",
};

const variants: Record<ButtonVariant, string> = {
  solid: "border-transparent bg-ink text-[#0a0a0a] hover:bg-white",
  ghost:
    "border-line bg-white/[0.03] text-white/[0.86] hover:border-line-strong hover:bg-white/[0.08]",
  quiet: "border-transparent text-ink-muted hover:text-ink",
};

export function buttonStyles({
  variant = "ghost",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-landing font-medium",
    "transition-[background-color,border-color,color,transform] duration-200 ease-brand active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-40",
    sizes[size],
    variants[variant],
    className,
  );
}
