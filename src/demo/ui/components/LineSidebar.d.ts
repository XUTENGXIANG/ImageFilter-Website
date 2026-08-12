// 类型声明 — LineSidebar 使用 JS-CSS 变体(LineSidebar.jsx)
// 来源: @react-bits/LineSidebar-JS-CSS
declare const LineSidebar: (props: {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: "linear" | "smooth" | "sharp";
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}) => React.ReactElement;
export default LineSidebar;
