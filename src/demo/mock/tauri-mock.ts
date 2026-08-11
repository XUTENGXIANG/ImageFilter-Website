// ---------------------------------------------------------------------------
// Tauri mock layer
// Replaces @tauri-apps/api / @tauri-apps/plugin-dialog so the UI runs on
// deterministic fake data without a Rust backend.
// ---------------------------------------------------------------------------

import * as fakeData from "./fake-data";
import type { ImportProgress } from "./fake-data";
import * as placeholder from "./placeholder";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((r) => setTimeout(() => r(value), ms));
}

/** Normalize backslash paths to forward-slash (FAKE:/ convention) */
function norm(s: string): string {
  if (!s) return "";
  return s.replace(/\\/g, "/").replace(/\/+$/, "");
}

/** DJB2 hash — same as fake-data / placeholder */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

/** Check if value is a Channel instance (duck-type) */
function isChannel(v: unknown): v is Channel<unknown> {
  return (
    typeof v === "object" &&
    v !== null &&
    "onmessage" in v &&
    "post" in v &&
    typeof (v as Channel<unknown>).post === "function"
  );
}

// ---------------------------------------------------------------------------
// Channel (mirrors @tauri-apps/api Channel)
// ---------------------------------------------------------------------------

export class Channel<T = unknown> {
  onmessage: ((msg: T) => void) | null = null;

  /** Call onmessage with the given payload. Used by mock handlers. */
  post(msg: T): void {
    this.onmessage?.(msg);
  }
}

// ---------------------------------------------------------------------------
// Command dispatch table
// ---------------------------------------------------------------------------

type Handler = (args: Record<string, unknown>) => Promise<unknown>;

const handlers: Record<string, Handler> = {
  // ---- drives & browsing ----
  detect_drives: async () => fakeData.getDrives(),

  browse_directory: async (a) =>
    fakeData.getFolderTree(norm(a.dirPath as string)),

  count_folders: async (a) =>
    fakeData.getCounts((a.folderPaths as string[]).map(norm)),

  scan_directory: async (a) =>
    delay(300, fakeData.getPhotos(norm(a.dirPath as string))),

  // ---- thumbnails / images ----
  batch_thumbnails: async (a) => {
    const paths = a.filePaths as string[];
    const onProgress = a.onProgress;
    for (let i = 0; i < paths.length; i++) {
      const thumbPath = `FAKE:/thumb/${hashStr(paths[i]).toString(16)}.jpg`;
      // Simulate streaming progress
      if (isChannel(onProgress)) {
        await delay(30 + Math.random() * 50, null);
        (onProgress as Channel<[string, string]>).post([
          paths[i],
          thumbPath,
        ]);
      }
    }
    return paths.map((p) => `FAKE:/thumb/${hashStr(p).toString(16)}.jpg`);
  },

  get_thumbnail_path: async (a) =>
    `FAKE:/thumb/${hashStr(a.filePath as string).toString(16)}.jpg`,

  get_preview_image: async (a) =>
    `FAKE:/preview/${hashStr(a.filePath as string).toString(16)}.jpg`,

  get_full_image: async (a) =>
    delay(
      600,
      `FAKE:/full/${hashStr(a.filePath as string).toString(16)}.jpg`,
    ),

  // ---- EXIF ----
  get_exif: async (a) => fakeData.getExif(a.filePath as string),

  // ---- import ----
  import_photos: async (a) => {
    const onProgress = a.onProgress;
    const steps = [
      { fileName: "IMG_0001.CR2", status: "copying", message: "正在复制...", percent: 25 },
      { fileName: "IMG_0002.CR2", status: "copying", message: "正在复制...", percent: 50 },
      { fileName: "IMG_0003.ARW", status: "renaming", message: "正在重命名...", percent: 75 },
      { fileName: "IMG_0004.JPG", status: "done", message: "完成", percent: 100 },
    ];
    for (const step of steps) {
      if (isChannel(onProgress)) {
        await delay(250, null);
        (onProgress as Channel<ImportProgress>).post(step);
      }
    }
    return delay(1200 - steps.length * 250, steps.length);
  },

  // ---- analysis ----
  analyze_photos: async (a) => {
    const paths = a.filePaths as string[];
    const results = fakeData.getAnalysis(paths);
    const onProgress = a.onProgress;
    for (const r of results) {
      if (isChannel(onProgress)) {
        await delay(20 + Math.random() * 40, null);
        (onProgress as Channel<fakeData.AnalysisResult>).post(r);
      }
    }
    return results;
  },

  find_duplicates: async (a) => {
    const paths = a.filePaths as string[];
    return fakeData.getAnalysis(paths);
  },

  stop_analysis: async () => undefined,

  // ---- misc ----
  set_glass_bg: async () => undefined,

  eject_drive: async () => undefined,

  open_folder: async () => undefined,
};

// ---------------------------------------------------------------------------
// Public API (mirrors @tauri-apps/api/core)
// ---------------------------------------------------------------------------

export async function invoke<T = unknown>(
  cmd: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  const handler = handlers[cmd];
  if (!handler) {
    throw new Error(`[mock] unknown command: ${cmd}`);
  }
  return handler(args) as Promise<T>;
}

export function convertFileSrc(filePath: string): string {
  if (filePath.startsWith("FAKE:")) {
    return placeholder.forPath(filePath);
  }
  return filePath;
}

// ---------------------------------------------------------------------------
// @tauri-apps/api/window
// ---------------------------------------------------------------------------

export function getCurrentWindow() {
  return {
    minimize: async () => {},
    toggleMaximize: async () => {},
    close: async () => {},
    isMaximized: async () => false,
    onResized: () => {},
  };
}

// ---------------------------------------------------------------------------
// @tauri-apps/plugin-dialog
// ---------------------------------------------------------------------------

export const open = async (): Promise<null> => null;
