import { resolve } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const tauriMockPath = resolve(import.meta.dirname, "src/demo/mock/tauri-mock.ts");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Match all @tauri-apps/api subpath imports (core, window, etc.)
      // and redirect them to the single mock file.
      { find: /^@tauri-apps\/api(\/.*)?$/, replacement: tauriMockPath },
      { find: "@tauri-apps/plugin-dialog", replacement: tauriMockPath },
    ],
  },
});
