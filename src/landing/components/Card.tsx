import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { glassCard } from "../lib/surfaces";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-card", glassCard, className)} {...props} />;
}
