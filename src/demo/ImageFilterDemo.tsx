// ═══════════════════════════════════════════════════════════════════════
// ImageFilterDemo — wrapper that renders the real software UI inside the demo
// No modifications to the copied UI files; data flows through the mock layer.
// ═══════════════════════════════════════════════════════════════════════

import App from "./ui/App";

// 网页 demo 默认深色主题(软件默认浅色; 深色与网站背景更协调)
// 用户可在 demo 内手动切换, 刷新后回到深色
try {
  localStorage.setItem("imagefilter-theme", "dark");
} catch {
  // storage 不可用时忽略
}

export default function ImageFilterDemo({ className }: { className?: string }) {
  return (
    <div
      className={`ifdemo-scope ${className ?? ""}`}
      style={{ height: 560, overflow: "hidden", borderRadius: 12 }}
    >
      <App />
    </div>
  );
}
