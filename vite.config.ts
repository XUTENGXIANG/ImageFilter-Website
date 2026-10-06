import { resolve } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { APP_VERSION } from "./src/demo/app-version.ts";

const tauriMockPath = resolve(import.meta.dirname, "src/demo/mock/tauri-mock.ts");
const uiBase = resolve(import.meta.dirname, "src/demo/ui");

// https://vite.dev/config/
export default defineConfig({
  // 自定义域名 tensyn.online 根路径部署
  base: "/",
  // 同步进来的 settings-dialog.tsx 读 __APP_VERSION__(版本号首屏兜底, 随后被 mock 的
  // getVersion() 覆盖)。少这一条: 构建不报错, 但打开设置面板会 ReferenceError。
  define: { __APP_VERSION__: JSON.stringify(APP_VERSION) },
  plugins: [react(), tailwindcss()],
  server: {
    // 忽略"原子写入"产生的临时文件/目录: 某些编辑器/工具保存文件时会先写
    // .xxx.<pid>.<uuid>.tmpdir/xxx.tmp 再改名, Vite 的 watcher 一旦去 watch 这种
    // 正被占用的临时文件会抛未捕获的 EBUSY, 直接终止 dev 进程(实测: 存一次 README 就崩)。
    // 主仓库 vite.config.ts 里是同一份配置。
    watch: { ignored: ["**/.*.tmpdir/**", "**/*.tmp"] },
  },
  build: {
    // 单页含 THREE(流体)/React/软件 demo UI, 包体 >500KB 属预期, 调高阈值避免警告
    chunkSizeWarningLimit: 1200,
  },
  resolve: {
    alias: [
      // Match all @tauri-apps/api subpath imports (core, window, etc.)
      // and redirect them to the single mock file.
      { find: /^@tauri-apps\/api(\/.*)?$/, replacement: tauriMockPath },
      { find: "@tauri-apps/plugin-dialog", replacement: tauriMockPath },
      // 1.1.2 起 settings-dialog.tsx 会用 plugin-opener 打开下载页 —— 不 alias 的话
      // 本仓库没有这个依赖, 构建直接解不了 import。映射到 mock 后由 mock 开新标签页。
      { find: "@tauri-apps/plugin-opener", replacement: tauriMockPath },
      // Match @/ imports from copied UI code (e.g. @/components/ui/dialog)
      { find: /^@\/(.*)/, replacement: uiBase.replace(/\\/g, "/") + "/$1" },
    ],
  },
});
