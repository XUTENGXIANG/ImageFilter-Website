// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
// ═══════════════════════════════════════════════════════════════════════
// ImageFilterDemo — wrapper that renders the real software UI inside the demo
// No modifications to the copied UI files; data flows through the mock layer.
// ═══════════════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import App from "./ui/App";
import { loadOsCapabilities, type OsCapabilities } from "./ui/os-capability";

// 网页 demo 默认深色主题(软件默认浅色; 深色与网站背景更协调)
// 用户可在 demo 内手动切换, 刷新后回到深色
try {
  localStorage.setItem("imagefilter-theme", "dark");
} catch {
  // storage 不可用时忽略
}

export default function ImageFilterDemo({ className }: { className?: string }) {
  // 与真机入口 main.tsx 走同一套: **先探测系统能力、再渲染 App**。
  // 为什么不能直接 <App /> : 能力决定毛玻璃默认值与是否置灰, App 把它当必传参数。
  // 演示里由 mock 的 get_os_capabilities 回答(按本机 Win11 报); 真机探不到有 500ms 超时兜底,
  // 所以最多空一帧 —— 容器先渲染, 免得落地页这里抖一下。
  const [osCapabilities, setOsCapabilities] = useState<OsCapabilities | null>(null);

  useEffect(() => {
    let alive = true;
    loadOsCapabilities().then((caps) => {
      if (alive) setOsCapabilities(caps);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      className={`ifdemo-scope ${className ?? ""}`}
      style={{ height: 560, overflow: "hidden", borderRadius: 12 }}
    >
      {osCapabilities ? <App osCapabilities={osCapabilities} /> : null}
    </div>
  );
}
