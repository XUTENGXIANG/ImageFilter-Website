/// <reference types="vite/client" />

/**
 * 构建期由 `vite.config.ts` 的 define 注入（值 = `src/demo/app-version.ts` 的 APP_VERSION）。
 *
 * 主仓库的 `settings-dialog.tsx` 直接读这个全局（版本号首屏取它，随后被 `getVersion()` 覆盖），
 * 所以网站这份构建也必须注入它：少了声明，`tsc -b` 会以 `Cannot find name '__APP_VERSION__'`
 * 失败；少了 define，打开设置面板会在运行时 ReferenceError。
 */
declare const __APP_VERSION__: string;
