// 类型声明 — LiquidEther 使用 JS-CSS 变体(LiquidEther.jsx)
// 来源: @react-bits/LiquidEther-JS-CSS
declare const LiquidEther: (props: {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}) => React.ReactElement;
export default LiquidEther;
