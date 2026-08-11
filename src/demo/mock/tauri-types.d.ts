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

declare module "@tauri-apps/plugin-dialog" {
  export const open: (options?: { directory?: boolean; title?: string }) => Promise<string | null>;
}
