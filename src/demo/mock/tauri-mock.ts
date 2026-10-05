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

/** Phase 6 / 6.2: demo 会话内的命名方案副本(初始值 = 真机 init_db 播种的内容) */
const demoRules = fakeData.getRules();

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
  // Phase 6 / 6.3: 返回值是 **ImportSummary**(契约变更, 原来是数字)。
  // 假进度刻意走一遍真机存在的状态(含 renamed/verifying/sidecar), 让 demo 能演练
  // import-bar 的四行明细与状态配色; 数字与进度条数自洽(imported 含 renamed)。
  import_photos: async (a) => {
    const onProgress = a.onProgress;
    const steps = [
      { fileName: "IMG_0001.CR2", status: "checking", message: "检查中...", percent: 0 },
      { fileName: "IMG_0001.CR2", status: "copying", message: "复制中 → 0001_IMG_0001.cr2", percent: 10 },
      { fileName: "IMG_0001.CR2", status: "verifying", message: "校验中...", percent: 0 },
      { fileName: "IMG_0001.CR2", status: "sidecar", message: "边车 → 0001_IMG_0001.xmp", percent: 0 },
      { fileName: "IMG_0001.CR2", status: "done", message: "完成", percent: 100 },
      { fileName: "IMG_0002.CR2", status: "copying", message: "复制中 → 0002_IMG_0002.cr2", percent: 20 },
      { fileName: "IMG_0002.CR2", status: "renamed", message: "重名, 改名 → 0002_IMG_0002_1.cr2", percent: 0 },
      { fileName: "IMG_0002.CR2", status: "verifying", message: "校验中...", percent: 0 },
      { fileName: "IMG_0002.CR2", status: "done", message: "完成", percent: 100 },
      { fileName: "IMG_0003.ARW", status: "skipped", message: "已存在且相同", percent: 0 },
    ];
    for (const step of steps) {
      if (isChannel(onProgress)) {
        await delay(180, null);
        (onProgress as Channel<ImportProgress>).post(step);
      }
    }
    // imported 含 renamed(子集关系); skipped 与 failed 各自独立
    return delay(200, { imported: 2, skipped: 1, renamed: 1, failed: 0 });
  },

  // Phase 6 / 6.1: 导入历史(列表 + 总数)。**必须有** —— mock 对未知命令直接 throw,
  // 而这两个命令由导入栏的历史对话框触发(官网演示里点一下"导入历史"就会走到)。
  // limit 在真机是**必传**参数(u32), 这里照做(不再有默认 100 的兜底)。
  get_import_history: async (a) =>
    delay(
      80,
      fakeData.getImportHistory().slice(0, Math.max(1, Number(a.limit) || 100)),
    ),

  count_import_history: async () => fakeData.getImportHistory().length,

  // Phase 6 / 6.2: 命名方案。用**模块级可变副本**(= 模拟 upsert 之后的库), 这样 demo 里
  // "另存为"能真的在下拉里出现一个方案; 拿 fakeData.getRules() 直接改会把"初始内容"污染掉。
  // 与修好后的真机语义一致: 同名 = 原地更新(**不**碰 isDefault)。
  get_rules: async () => demoRules,

  save_rule: async (a) => {
    const name = String(a.name ?? "").trim();
    if (!name) throw new Error("[mock] 方案名不能为空");
    const folderTemplate = String(a.folderTemplate ?? "");
    const fileTemplate = String(a.fileTemplate ?? "");
    const hit = demoRules.find((r) => r.name === name);
    if (hit) {
      hit.folderTemplate = folderTemplate;
      hit.fileTemplate = fileTemplate;
      return hit.id;
    }
    const id = demoRules.reduce((m, r) => Math.max(m, r.id), 0) + 1;
    demoRules.push({ id, name, folderTemplate, fileTemplate, isDefault: 0 });
    return id;
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

  // ---- XMP sidecar (Phase 5) ----
  // 这三个**必须有**: mock 对未知命令直接 throw(见下方 invoke), 而 loadFolder 里
  // 的 read_decisions 一抛, 照片列表就出不来(官网演示白屏)。
  // 三者都返回"没有值 / 可写 / no-op", 让 demo 保持零副作用又不报错:
  //  · read_decisions 绝不能返回本地没有的值(否则会把 demo 的星级/色标覆盖成假数据);
  //  · probe 必须 writable: true(返回 false 会触发"自动降级 off + 红色错误提示");
  //  · write 只回形状正确的 Summary(demo 不落盘)。
  read_decisions: async (a) =>
    ((a.filePaths as string[]) ?? []).map((p) => ({
      path: p,
      rating: null,
      label: null,
      sidecar: null,
    })),

  probe_xmp_target: async (a) => ({
    dir: (a.dirPath as string) ?? "",
    writable: true,
    code: null,
    detail: null,
    network: false,
  }),

  write_decisions: async (a) =>
    delay(60, {
      written: ((a.items as unknown[]) ?? []).length,
      skipped: 0,
      failed: 0,
      failures: [],
      degraded: false,
    }),

  // ---- misc ----
  set_glass_bg: async () => undefined,

  allow_asset_dir: async () => undefined,

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
