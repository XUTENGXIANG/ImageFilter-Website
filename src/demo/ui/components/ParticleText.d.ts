// 类型声明 — ParticleText 使用 JS-CSS 变体(ParticleText.jsx)
// 来源: @react-bits/ParticleText-JS-CSS
declare const ParticleText: (props: {
  text?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover" | "click";
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => React.ReactElement;
export default ParticleText;
