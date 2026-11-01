# ImageFilter 官网

[ImageFilter](https://github.com/XUTENGXIANG/ImageFilter) 桌面应用的落地页与在线演示。线上地址：[https://xutengxiang.github.io/ImageFilter-Website/](https://xutengxiang.github.io/ImageFilter-Website/)（别名 [tensyn.online/imagefilter](https://tensyn.online/imagefilter/)）。

## 改版完成（2026-11）

官网已按 [pryzm.design](https://pryzm.design/) 的视觉方向改版：纯黑单色 + emerald 数据色、Poppins / Inter / Geist Mono 自托管、首屏 6 张照片 + 主窗口的可拖拽拼贴；新增 FAQ，演示已同步到 **1.3.0**。

- 状态、决策、坑与验收记录：[docs/官网改版-交接.md](docs/官网改版-交接.md)
- 设计规格与实施计划：[docs/superpowers/specs/2026-11-01-website-redesign.md](docs/superpowers/specs/2026-11-01-website-redesign.md) · [docs/superpowers/plans/2026-11-01-website-redesign.md](docs/superpowers/plans/2026-11-01-website-redesign.md)
- 首屏原型（自包含 HTML，保留作参考）：[docs/prototype/hero.html](docs/prototype/hero.html)

> 注意：首屏 6 张照片仍是**图库占位图**，上线前必须替换为用户自有作品（清单见 `src/assets/photos/README.md`）。

## 结构

```
src/
  landing/       落地页组件(Hero/DemoWindow/Compare/Features/Workflow/Download/Footer/Nav)
  demo/          软件迷你演示(真实 UI + mock 数据层)
    ui/          ← 从主仓库 src/ 同步的副本(见下方"demo/ui 同步")
    mock/        Tauri 命令 mock(fake-data/tauri-mock/placeholder)
  index.css      落地页样式
workers/         Cloudflare Worker 路由(手动部署, 见文件头部注释)
.github/workflows/deploy.yml   GitHub Pages 自动部署
```

## 开发

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build
npm run lint       # oxlint
npx vitest run     # mock 数据层确定性测试
```

## Favicon

- 矢量源：`public/favicon.svg`（品牌标记）。页头 Logo 仍是 `src/assets/logo.png`，两者独立，改 favicon 不会动页头。
- 回退：`public/favicon.png`（512×512）与 `public/favicon.ico`（16/32 多尺寸）。
- `index.html` 的 PNG / ICO 链接带 `?v=2`；换图时把版本号递增，避免浏览器继续用旧图标缓存。

## demo/ui 同步（重要）

`src/demo/ui/` 是主仓库 `src/` 的**逐文件副本**（网页演示"零修改"运行软件真实 UI）。主仓库每次改动 `src/` 后都必须同步，否则演示会跑旧代码：

```powershell
# 主仓库 → 官网副本(排除入口/样式/类型声明)
$src = "<主仓库路径>\src"; $dst = "src\demo\ui";
Get-ChildItem $src -Recurse -File | Where-Object { $_.Name -notin @("main.tsx","index.css","vite-env.d.ts") } | ForEach-Object {
  $rel = $_.FullName.Substring($src.Length).TrimStart('\');
  $target = Join-Path $dst $rel;
  New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null;
  Copy-Item $_.FullName $target -Force;
}
Remove-Item "$dst\hooks\use-mobile.ts" -ErrorAction SilentlyContinue
```

同步后必查这几处 —— 少一处就在**网站这边**炸（`tsc -b` 报错或打开设置面板时 ReferenceError），而且报错信息不会告诉你"这是同步落下的"：

| # | 要查什么 | 落在哪 |
|---|---|---|
| 1 | **命令表增删**：主仓库 `generate_handler!` 里新增/删除的命令，mock 要同步（未知命令直接 throw，fail-fast） | `src/demo/mock/tauri-mock.ts` |
| 2 | **新增的 `@tauri-apps/*` 导入**：三处一起加 —— bundle alias、tsc 的 `declare module`、mock 里的对应导出 | `vite.config.ts` + `src/demo/mock/tauri-types.d.ts` + `tauri-mock.ts` |
| 3 | **构建期全局**（如 `__APP_VERSION__`）：声明 + `define` 都要有（主仓库 `vite-env.d.ts` 不在同步名单里） | `src/vite-env.d.ts` + `vite.config.ts` |
| 4 | **`App` 的必传参数**：1.1.1 起是 `osCapabilities`（真机由主仓库 `main.tsx` 探测后传入，而 `main.tsx` 不参与同步） | `src/demo/ImageFilterDemo.tsx` |
| 5 | **版本号**：改成主仓库 `package.json` 的 version（不能拿本仓库的 `0.0.0` 顶替） | `src/demo/app-version.ts` |
| 6 | **CSS 语义色 token（README 原先漏写）**：1.3.0 的 `text-brand` / `bg-brand-strong` / `text-danger` 等类需要 `--brand*` / `--danger*` / `--warning` / `--info` 变量与 `@theme inline` 映射；漏了不报错，但按钮/状态会静默失色 | `src/demo/index.css` |

> 1.1.2 这次同步踩到的就是 1/2/3/4/5 全部五项：Phase 7 那 5 个命令漂移、`plugin-opener` 与 `api/app` 没 alias/声明、`__APP_VERSION__` 没有 define、`App` 多要一个 `osCapabilities`、版本号停在 1.0.0。
>
> 1.3.0 同步新增：Phase 8 的 16 个命令（图库服务 / mDNS 配对）、`@tauri-apps/api/event` 的 `listen` mock 与类型声明、第 6 项语义色 token。

### 官网 demo 外壳适配（不在主仓库同步范围）

以下规则只存在于 `src/demo/index.css`，是为了让软件 UI 在落地页的框里正常显示，**不要**同步回主仓库：

- **树行样式**：`.tree-row` 的 28px 行高、`.tree-kids` 的 overflow/height 过渡、`.tree-caret` 旋转、`.press-row` 按下反馈。漏掉时文件夹树展开会互相压住。
- **浅色主题底色**：`:root[data-theme="light"] .ifdemo-scope { background:#fbfbfb }`；App 根容器是透明的，不补这一层，浅色主题中间会露出落地页黑底。
- **弹层约束**：`.ifdemo-scope .fixed { position:absolute !important }`，把图片查看器、对话框、toast 限制在 demo 框内，而不是铺满整个落地页。
- **隐藏设置入口**：`.ifdemo-scope button:has(.i-icon-setting) { display:none }`。官网演示不开放 1.3.0 的设置面板；主仓库真机不受影响。

## 部署

- GitHub Pages：push `master` 后 Actions 自动构建部署
- Cloudflare Worker（tensyn.online 前缀转发）：手动粘贴 `workers/` 下对应脚本，步骤见文件头部注释

> ⚠️ `vite.config.ts` 里 `base: "/"`（为 tensyn.online 根路径部署）。因此 **github.io 那个地址其实取不到资源**：页面 HTML 里是 `/assets/...` 绝对路径，在 `xutengxiang.github.io/ImageFilter-Website/` 下会解析成 `xutengxiang.github.io/assets/...` → 404。线上真正能用的是 `https://tensyn.online/imagefilter/`。要让两个地址都能用，把 `base` 改成 `"./"`（相对路径）即可。

## 下载信息维护

下载区的**版本号与三条直链都不再写死**：打开页面时问一次 GitHub 的 `/releases/latest`，徽章显示 `tag_name`、三张卡片的文件名与直链都从该 release 的附件里挑（`-setup.exe` / `.msi` / `.dmg`）。取不到就显示"版本获取失败"，按钮退到 Releases 页 —— 所以**发新版不用再回来改这里**。

只有 `src/landing/Download.tsx` 的 `CN_DOWNLOADS`（蓝奏云国内直链）仍是手动的：换了安装包得自己重传、并把 `name` 里的版本号与 `password` 一起改掉（页面不会跟着变）。


## 动效组件说明

`src/demo/ui/components/` 下的 BorderGlow/ClickSpark/LiquidEther/ParticleText/SpecularButton 等为 React Bits 风格动效（JS/JSX 变体 + `.d.ts` 声明）。2026-11 改版后落地页已不再引用它们，文件保留以备复用。`src/main.tsx` 仍关闭 StrictMode（既有决定）；恢复前需单独验证 demo 的双挂载行为。

## 许可

MIT 许可证，见 [LICENSE](LICENSE)（与主仓库同一份文本、同一版权所有者）。页脚的「MIT 许可」指向主仓库的 `LICENSE`。


