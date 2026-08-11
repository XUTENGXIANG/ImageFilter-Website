// ═══════════════════════════════════════════════════════════════════════
// ImageFilterDemo — wrapper that renders the real software UI inside the demo
// No modifications to the copied UI files; data flows through the mock layer.
// ═══════════════════════════════════════════════════════════════════════

import App from "./ui/App";

export default function ImageFilterDemo({ className }: { className?: string }) {
  return (
    <div className={className} style={{ height: 560, overflow: "hidden", borderRadius: 12 }}>
      <App />
    </div>
  );
}
