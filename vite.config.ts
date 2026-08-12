import { resolve } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const tauriMockPath = resolve(import.meta.dirname, "src/demo/mock/tauri-mock.ts");
const uiBase = resolve(import.meta.dirname, "src/demo/ui");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
      // Match @/ imports from copied UI code (e.g. @/components/ui/dialog)
      { find: /^@\/(.*)/, replacement: uiBase.replace(/\\/g, "/") + "/$1" },
    ],
  },
});
