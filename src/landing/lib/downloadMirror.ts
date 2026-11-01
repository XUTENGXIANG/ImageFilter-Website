import { useState } from "react";

/**
 * 国内加速前缀（第三方）。
 *
 * ghfast.top 只做 GitHub 资源转发；它和任何公共加速服务一样可能失效、限速或
 * 改写内容，所以下载页默认仍走 GitHub，切换后必须显示第三方提示。
 * 换服务时只改这一行；用自建 Worker 时改成 https://tensyn.online/gh/ 即可。
 */
export const MIRROR_PREFIX = "https://ghfast.top/";

export function mirrorUrl(url: string, mirror: boolean) {
  if (!mirror || !url.startsWith("http")) return url;
  return `${MIRROR_PREFIX}${url}`;
}

const STORAGE_KEY = "download-mirror";

export function useDownloadMirror() {
  const [mirror, setMirrorState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "fast";
    } catch {
      return false;
    }
  });

  const setMirror = (next: boolean) => {
    setMirrorState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "fast" : "github");
    } catch {
      // 隐私模式下只用当前会话的选择。
    }
  };

  return [mirror, setMirror] as const;
}
