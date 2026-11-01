import type { CSSProperties, ReactElement } from "react";

export interface SplitFlapTextProps {
  words?: string[];
  text?: string;
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: "alpha" | "alphanumeric" | "numeric" | string;
  flipsPerChar?: number;
  align?: "left" | "center" | "right";
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  intro?: boolean;
  order?: "left" | "right" | "center" | "random";
  tileStyle?: "board" | "minimal";
  glare?: number;
  depth?: number;
  className?: string;
  style?: CSSProperties;
}

export default function SplitFlapText(props: SplitFlapTextProps): ReactElement;
