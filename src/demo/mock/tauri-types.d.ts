// Type declarations for @tauri-apps/* modules (aliased to mock layer)
// This file satisfies TypeScript's module resolution so `tsc -b` passes
// without Vite's bundler aliases.

declare module "@tauri-apps/api/core" {
  export function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
  export function convertFileSrc(filePath: string): string;
  export class Channel<T = unknown> {
    onmessage: ((msg: T) => void) | null;
    post(msg: T): void;
  }
}

declare module "@tauri-apps/api/window" {
  export function getCurrentWindow(): {
    minimize: () => Promise<void>;
    toggleMaximize: () => Promise<void>;
    close: () => Promise<void>;
    isMaximized: () => Promise<boolean>;
    onResized: () => void;
  };
}

// 1.1.2 起主仓库的 settings-dialog.tsx 会调这两个:
//   · getVersion()  —— 版本号(演示里回 src/demo/app-version.ts 的值)
//   · openUrl()     —— 「有新版本 x.y.z」那一下(演示里开新标签页)
declare module "@tauri-apps/api/app" {
  export function getVersion(): Promise<string>;
}

declare module "@tauri-apps/plugin-opener" {
  export function openUrl(url: string | URL, openWith?: string): Promise<void>;
}

declare module "@tauri-apps/plugin-dialog" {
  export const open: (options?: { directory?: boolean; title?: string }) => Promise<string | null>;
}
