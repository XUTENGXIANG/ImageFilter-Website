/**
 * 官网演示里显示的「软件版本」—— 也就是这份 `src/demo/ui/` 同步自哪个版本的主仓库。
 *
 * 单一来源：vite 的 `__APP_VERSION__` define（设置行首屏显示的兜底）与 mock 的
 * `getVersion()`（演示里 `getVersion` 的返回值）都取自这里，所以只有这一行要改。
 * 每次按 README 的流程同步主仓库 `src\` 之后，把这里改成主仓库 `package.json` 的 version。
 *
 * 为什么不能拿本仓库的 package.json：它是 0.0.0（网站自己的版本），拿它当软件版本会显示成 0.0.0。
 */
export const APP_VERSION = "1.1.2";
