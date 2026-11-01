# ImageFilter 官网改版 · 设计规格

> 状态：**已确认并实施**（2026-11-01；实施记录见文末 §12）
> 日期：2026-11-01
> 范围：只改 `A:\ImageFilter-Website`。主仓库 `A:\tenent` 只读，不提交、不切分支。
> 依据：`docs/官网改版-交接.md`、`docs/prototype/hero.html`、`README.md`、主仓库 README 与 `src-tauri` 只读取证。

## 1. 已确认决策

| # | 决策 | 说明 |
|---|---|---|
| 1 | **纯黑单色**，emerald `#10B981` 只做数据色 | 星级、已归档、成功态、勾选、Star 数；不做大面积绿、不做渐变光晕 |
| 2 | 中文用**系统 CJK 栈**，拉丁用 Poppins / Inter / Geist Mono，**全部自托管** | 不引 Google Fonts；只打包 latin 子集 |
| 3 | 首屏标题**照原型** | 中：`整张卡的照片 / 只留你要的那几张`；英：`Cull a whole card / Keep only the keepers` |
| 4 | 首屏拼贴**6 张照片 + 1 个主窗口** | 用户选择 6–7 张；原型实际就是 6 张（CSS 里 `p4–p8` 是废弃预留位，未渲染），因此维持 6 张，不再额外减 |
| 5 | 加 **FAQ 4 条** | 放在下载区之后、页脚之前；纯静态，无后端 |
| 6 | 首屏照片**由用户提供自有作品** | 收到前用原型占位图；上线前必须替换 |
| 7 | demo 同步 **1.1.2 → 1.3.0** 放在视觉改造之后 | 与 P2 分开，避免两件事互相污染 |
| 8 | 不做定价 / 订阅 / 邮件表单 | 没有后端支撑 |

## 2. 目标与非目标

**目标**：按 `pryzm.design` 的纯黑单色方向重做落地页；现有功能一个不少；首屏建立「整张卡的照片 → 只留好片」的明确信息。

**非目标**：
- 不改主仓库、安卓端、Cloudflare Worker 路由。
- 不手改 `src/demo/ui/`（只按 README 同步）。
- 不新增无法兑现的功能。
- 不推 `origin`（推送会触发 GitHub Pages 部署）。
- 不顺手重构 demo 的 mock 行为；只补 1.3.0 新增命令的 mock。

## 3. 设计语言

### 3.1 颜色 token

| Token | 值 | 用途 |
|---|---|---|
| `--color-canvas` | `#000000` | 页面底色 |
| `--color-surface` | `#141414` | 卡片、演示窗口、照片底 |
| `--color-surface-sunken` | `#0a0a0a` | 下载/特性卡的内层 |
| `--color-line` | `rgba(255,255,255,.11)` | 发丝线、卡片边框 |
| `--color-line-strong` | `rgba(255,255,255,.20)` | 强调卡边框、hover |
| `--color-ink` | `#fafafa` | 主文字 |
| `--color-ink-muted` | `rgba(255,255,255,.64)` | 正文、副文 |
| `--color-ink-faint` | `rgba(255,255,255,.50)` | 微标签、版权（AA：约 5.3:1） |
| `--color-data` | `#10b981` | **只给数据**：星级、归档、勾选、Star 数（不叫 `accent`，避免覆盖 demo 的 shadcn `accent`） |

> 与交接文档的偏差：原型用 `white/38` 做 10px 微标签，对比度约 3.2:1，低于 WCAG AA 的 4.5:1。规格把信息性小字统一提到 `white/50`（约 5.3:1）；`white/38` 只允许用于纯装饰线/点。

### 3.2 字体

| 角色 | 字体 | 字重 | 来源 |
|---|---|---|---|
| 展示标题 | Poppins | 500 / 600 | `@fontsource/poppins@5.3.0`，取 latin 500/600 woff2 |
| 正文 / UI | Inter | 100–900 variable | `@fontsource-variable/inter@5.3.0`，取 latin variable woff2 |
| 微标签 / 文件名 | Geist Mono | 100–900 variable | `@fontsource-variable/geist-mono@5.3.0`，取 latin variable woff2 |
| 中文 | `"PingFang SC","HarmonyOS Sans SC",MiSans,"Microsoft YaHei"` | 随拉丁回退 | 系统栈，不打包 |

字体落地方式：把上述 **4 个 latin woff2**（Poppins 500/600、Inter variable、Geist Mono variable）复制到 `src/assets/fonts/`，在 `src/index.css` 用 `@font-face` 声明；同时复制三份 OFL 许可证到同目录。这样不依赖打包器的包解析，也不会把 cyrillic/greek 等子集塞进 `dist`。

规则：
- 拉丁标题 `letter-spacing:-.02em`；**中文标题 `letter-spacing:0`**（CJK 负字距会挤）。
- 实现方式：`LandingPage` 同步 `document.documentElement.lang`（`zh-CN` / `en`），CSS 用 `:lang(en) .font-display { letter-spacing: -.02em }`。
- 中文 Windows 上 600 的雅黑偏重：中文标题用 500–600，若实机偏重降到 500。

### 3.3 字号阶梯（8 档）

| Token | 值 / 行高 | 用途 |
|---|---|---|
| `--text-display` | `clamp(2rem, 3.9vw, 3.375rem)` / 1.06 | Hero H1（32→54px） |
| `--text-display-lg` | `clamp(1.75rem, 3vw, 2.375rem)` / 1.1 | 区块 H2（28→38px） |
| `--text-title` | `1.375rem` / 1.3 | 卡片大标题（22px） |
| `--text-body-lg` | `1rem` / 1.65 | 导语（16px） |
| `--text-body` | `0.875rem` / 1.65 | 正文（14px） |
| `--text-caption` | `0.75rem` / 1.5 | 卡片说明（12px） |
| `--text-micro` | `0.65625rem` / 1.5 | mono 微标签（10.5px） |
| `--text-mono-sm` | `0.6875rem` / 1.45 | 文件名、编号（11px） |

### 3.4 版心、间距、圆角、线

- 版心：`max-width:1152px`（Tailwind `max-w-6xl`），左右 `24px`（移动端 `18–20px`）。
- 区块：`padding-block: 80px`，桌面 `112px`（`py-20 lg:py-28`）。
- 导航高：`64px`。
- 圆角：卡片/照片 `14px`；窗口 `18px`；按钮/胶囊 `9999px`；小标签 `8px`。
- 线：一律 `1px solid var(--color-line)`；不用阴影做分隔；卡片阴影只用于照片/窗口。

### 3.5 动效

- 进场：`opacity 0→1` + `translateY(8px)`，`500ms`，`cubic-bezier(.2,.6,.2,1)`，`once: true`。
- 拼贴拖拽：1:1 跟手，边界 `±150px`，无惯性；仅 `(hover:hover) and (pointer:fine)` 启用。
- 切语言：只替换文本，**不重播进场**。
- `prefers-reduced-motion: reduce`：关闭所有进场/过渡/滚动平滑；拖拽本身保留（不是动画）。
- 所有交互过渡 `150–250ms`；不用 `transition-all`，只写具体属性。

### 3.6 Tailwind 4 落地

`src/index.css` 里用 `@theme` 定义（完整值见 3.1–3.4）：

```css
@theme {
  --color-canvas: #000;
  --color-surface: #141414;
  --color-surface-sunken: #0a0a0a;
  --color-line: rgba(255, 255, 255, .11);
  --color-line-strong: rgba(255, 255, 255, .20);
  --color-ink: #fafafa;
  --color-ink-muted: rgba(255, 255, 255, .64);
  --color-ink-faint: rgba(255, 255, 255, .50);
  --color-data: #10b981;

  /* 不用 --font-sans / --font-mono：demo 的 @theme 已占用它们，
     落地页用独立 token，避免把软件 UI 的 Geist 字体改掉 */
  --font-landing: Inter, "PingFang SC", "HarmonyOS Sans SC", MiSans, "Microsoft YaHei", system-ui, sans-serif;
  --font-display: Poppins, var(--font-landing);
  --font-landing-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  --text-display: clamp(2rem, 3.9vw, 3.375rem);
  --text-display--line-height: 1.06;
  /* …其余字号按 3.3 补齐 */

  --radius-card: 14px;
  --radius-window: 18px;
  --ease-brand: cubic-bezier(.2, .6, .2, 1);
  --breakpoint-hero: 56.25rem; /* 900px，拼贴切换点 */
}
```

## 4. 区块规格（8 + FAQ = 9 块）

### 4.1 Nav

- 固定顶部、`h-16`、`z-50`。
- 未滚动：透明 + 顶部黑色渐隐（`linear-gradient(to bottom, rgba(0,0,0,.82), rgba(0,0,0,.34) 58%, transparent)`）。
- 滚动 `>8px`：`background:rgba(0,0,0,.72)` + `backdrop-filter:blur(20px) saturate(140%)` + 底部发丝线。
- 左：logo `26×26` + 字标 Poppins 600 15px。
- 中：4 个锚点（特性 / 对比 / 工作流 / 下载），13.5px Poppins 500，`white/66`，hover `white` + `white/6` 底。
- 右：
  - Star 胶囊（ghost）：GitHub 图标 + `Star` + 实时 star 数；数字用 Geist Mono + emerald。
  - 语言胶囊：中 / EN，选中态 `white/10` 底、白字。
  - 下载：白底黑字胶囊，高 34px。
- `<900px`：字标隐藏；Star 只留图标（`aria-label` 保留）；语言与下载保留；4 个锚点放进第二行，横向可滚动，顶部发丝线。
- 锚点目标统一 `scroll-mt-24`。
- 保留：Star 实时数、语言切换（localStorage `site-lang`）、移动端锚点可达。

### 4.2 Hero

- `min-h-svh`，内容贴底，`overflow:hidden`。
- 桌面拼贴层 `absolute inset:-4% -2%`；照片 6 张 + 主窗口；可拖拽（见 §5）。
- 底部黑色渐隐，高 40%，压住拼贴下沿。
- 内容网格：`1.15fr / .85fr`，`gap:48px`，`align-items:end`，左右 `24px`，底部 `56px`。
- 左：eyebrow + H1；右：导语 + 双 CTA + micro。
- 移动端（`<900px`）：单列，`gap:20px`；拼贴只留 3 张静态照片，隐藏主窗口与其余照片；内容底部 `30px`。
- 拖拽提示：桌面右上角 mono 小字「拖动看看 / Drag to explore」，首次拖拽后淡出；移动端不显示。
- 保留：Windows / macOS CTA（锚到 `#download`）。

文案（`hero` i18n）：

| key | zh | en |
|---|---|---|
| eyebrow | 本地处理 · 照片不上传 | Local only · never uploaded |
| title.line1 | 整张卡的照片 | Cull a whole card |
| title.line2 | 只留 | Keep only |
| title.emphasis | 你要的那几张 | the keepers |
| subtitle | 插卡即看，星级初筛，AI 标出模糊与重复；命名归档一次完成。 | Instant RAW previews, star-based culling, AI flags for blur and duplicates, and template archiving — all on your machine. |
| micro | Windows 10 / 11 · macOS Universal · 本地处理 | Windows 10 / 11 · macOS Universal · Local processing |

> 首屏 micro 不写 `v1.3.0`（版本会过期，且下载区已运行时取最新版），也不写 `macOS 11+`（主仓库与 `tauri.conf.json` 都没有这个下限的证据）。

### 4.3 演示 Demo

- `id="demo"`，版心 `max-w-6xl`，`py-20 lg:py-28`。
- SectionHead：eyebrow `LIVE DEMO`（emerald 点），H2 中「不用安装，先筛几张。」/ 英「Try it before you install.」。
- 窗口：`surface` 底 + `1px line` + `18px` 圆角；顶部 44px 工具条，三个**中性灰**圆点（`#3a3a3a`，不用红黄绿），中间 Geist Mono `ImageFilter / demo`，右侧 `中 / EN`。
- 内部嵌入现有 `ImageFilterDemo`（保持 560px 高、`overflow:hidden`），不改 demo 内部样式与 mock 行为。
- 窗口下 mono 说明：`真实界面 · 可交互` / `Real UI · interactive`。
- 移除 `BorderGlow`。

### 4.4 对比 Compare

- `id="compare"`；SectionHead 左对齐：eyebrow「工作流差异 / Workflow difference」，H2「对比 / Compare」，副文沿用现有 `compare.subtitle`。
- 两列（移动端单列）hairline 卡片，`gap:16px`：
  - 左「传统方式」：`surface-sunken` 底，图标 `X`，`ink-muted` 文字。
  - 右「ImageFilter」：`surface` 底 + `line-strong` 边框，图标 `Check`（**emerald**），主文字 `ink`。
- 每列 4 行，行前 mono 编号 `01–04`，用 `white/30`。
- 去掉中间的 VS 大圆、紫色渐变、发光、`@icon-park` 图标；改用 lucide `X` / `Check`（14px）。
- 保留现有 4 条对比文案。

### 4.5 特性 Features

- `id="features"`；SectionHead 左对齐，沿用现有 eyebrow / title / subtitle。
- 3×2 网格（`lg:grid-cols-3`，`md:grid-cols-2`，移动端 1 列），`gap:16px`。
- 卡片：`surface-sunken` 底 + hairline + `14px` 圆角 + `p-6`。
- 图标 20px、`white/55`；编号 `01–06` 放右上角，Geist Mono 11px、`white/25`。
- hover：边框 `line-strong`，底色 `white/[0.015]`，`200ms`；不做 spotlight / border glow。
- 保留现有 6 条内容与顺序。

### 4.6 工作流 Workflow

- `id="workflow"`；SectionHead 左对齐，沿用现有 eyebrow / title / subtitle。
- 3 列（移动端单列），每列顶部一条 hairline，`pt-6`。
- 大编号 `01 / 02 / 03`：Geist Mono，40px，`white/20`。
- 标题 18px Poppins 500；描述 14px `ink-muted`。
- 去掉圆形渐变图标与连接彩线；细线本身就是分隔。

### 4.7 下载 Download

- `id="download"`；SectionHead 左对齐，H2 旁保留版本徽章（mono，`aria-live="polite"`）。
- **保持现有运行时逻辑不变**：`fetch GitHub /releases/latest` → 版本号 + 三条附件直链；失败 → `版本获取失败` + 按钮退到 Releases 页。
- 3 张卡：`surface-sunken` + hairline；第一张（Windows 安装包）加 `line-strong` 边框 + `white/[0.02]` 底 + mono `推荐` 徽章。
- 卡片内容：平台名 16px、文件名 Geist Mono 11px 截断、说明 14px、按钮。
- 按钮：三张卡使用 rewampui `NeumorphicDownloadButton`（全宽、72px 高，下载中/已完成文案）；点击时通过隐藏 iframe 触发浏览器原生下载，当前页面不跳转、不开新标签页；2.2s 进度环为视觉反馈，不是真实字节进度。
- 更多版本入口：`#/versions`；蓝奏云国内直链已**移除**（手动逐个上传成本太高）。
- **下载线路**：卡片上方提供 GitHub / 国内加速两档；默认 GitHub，国内加速给 GitHub 资源加 `ghfast.top` 前缀，选择存 localStorage；显示第三方加速风险提示。
- 保留：`GitHub Releases →` 链接、加载/失败态；MSI 说明不再放在折叠区（版本页直接列 MSI 资产）。

### 4.8 FAQ（新增）

- `id="faq"`，放在 Download 与 Footer 之间；版心 `max-w-6xl`，`py-20 lg:py-28`。
- 左侧 SectionHead：eyebrow `FAQ`，H2「常见问题 / Common questions」；右侧（桌面）或下方（移动）4 条问答。
- 用原生 `<details>` + `<summary>`：发丝线分隔，编号 Geist Mono `01–04`，问题 16px，右侧 `+` 旋转 45° 变 `×`；答案 14px `ink-muted`，`max-w-prose`。
- 默认全部收起；键盘可操作；不使用 JS。

问答内容（已按主仓库 README / `src-tauri` 只读取证）：

**zh**

1. **照片会被上传吗？**
   不会。解码、AI 检测与导入都在本机完成；软件只在检查更新时访问 GitHub。手机图库服务只在局域网内监听，默认关闭。
2. **支持哪些照片格式？**
   RAW 支持 ARW / CR2 / CR3 / NEF / DNG / ORF / RW2 / RAF / PEF / SRW；同时可浏览 JPG / PNG / GIF / BMP / TIFF / WebP / HEIC / HEIF，以及 MP4 / MOV / AVI / MKV 的视频缩略图。DNG 使用内置专用解码器。
3. **可以商用或二次开发吗？**
   可以。项目采用 MIT 许可证，源码公开；保留版权与许可声明即可使用、修改和分发。
4. **macOS 能用吗？**
   可以在 Releases 下载 Universal 安装包（Intel 与 Apple Silicon）。但 macOS 版尚未充分实机验证，遇到问题请附系统版本与复现步骤提交 Issue。Lightroom 衔接与 Mica 毛玻璃仅 Windows。

**en**

1. **Are my photos uploaded anywhere?**
   No. Decoding, AI detection, and imports all run on your machine; the app only contacts GitHub to check for updates. The mobile gallery service listens on your LAN only and is off by default.
2. **Which formats are supported?**
   RAW: ARW, CR2, CR3, NEF, DNG, ORF, RW2, RAF, PEF, SRW. Also JPG, PNG, GIF, BMP, TIFF, WebP, HEIC, HEIF, plus video thumbnails for MP4, MOV, AVI, MKV. DNG has a dedicated built-in decoder.
3. **Can I use it commercially or fork it?**
   Yes. ImageFilter is MIT-licensed and the source is public; keep the copyright and license notice when you use, modify, or redistribute it.
4. **Does it run on macOS?**
   Yes — a Universal build (Intel and Apple Silicon) is on Releases. That said, the macOS build has not been thoroughly tested on real hardware; please report issues with your OS version and repro steps. Lightroom hand-off and Mica glass are Windows-only.

### 4.9 Footer

- 顶部 hairline；黑色底，不做毛玻璃。
- 左：logo + `ImageFilter` + tagline。
- 右：3 列链接：
  - 产品：特性 / 对比 / 工作流 / 下载
  - 资源：GitHub 仓库 / Releases / MIT 许可
  - 联系：抖音 / 邮件 / 回到演示
- 底部：细分隔线 + mono 版权 `© 2026 XUTENGXIANG · MIT License`。
- 保留现有全部链接与 `mail@tensyn.online`。

### 4.10 版本全览（`#/versions`）

- **hash 路由**：首页 `LandingPage` 监听 `hashchange`；`#/versions` 渲染 `VersionsPage`，其他 hash 保持首页。静态托管无需 404 回退。
- **页头**：品牌 +「返回首页」+ 语言切换（复用 `LanguageToggle`），不渲染首页 Nav。
- **数据**：打开页面时取 `https://api.github.com/repos/XUTENGXIANG/ImageFilter/releases?per_page=100`；失败显示错误 + Releases 链接；空列表显示空态。
- **下载线路**：页头下复用与首页一致的 GitHub / 国内加速切换；加速时资产行 href 与 iframe 都走 `ghfast.top` 前缀。
- **版本卡**：按 GitHub 顺序列出 tag、名称、发布日期、预发布标记；首条标「最新」。每条只列安装包资产（`-setup.exe` / `.msi` / `.dmg` / `.apk` / `.zip`），过滤 updater 的 `.tar.gz` / `.sig`；资产行显示文件名、类型、大小，点击用隐藏 iframe 下载（当前页不跳；Ctrl/Cmd/中键保留新标签页语义）；底部「发布说明」。
- **国内直链**：已移除；国内加速由页面顶部的下载线路切换提供。
- **页脚**：版权 + GitHub Releases 链接。
- **返回**：`href="#"` 清空 hash，回首页；页面标题在版本页为「版本全览 · ImageFilter」，返回后恢复。
- 响应式：390 单列、768/1024/1440 保持版心；无横向溢出。

## 5. 首屏拼贴规格

### 5.1 桌面布局（≥900px）

| 槽位 | 文件（占位） | 比例 | 最大宽 | left | top | 卡片说明 |
|---|---|---|---|---|---|---|
| p1 | `photo-01.jpg` | 3:4 竖 | 235px | 3.5% | -1% | `DSC_0142.ARW` · ★★★★★ · 已归档 |
| p2 | `photo-02.jpg` | 3:4 竖 | 185px | 22% | 16% | `DSC_0157.ARW` · AI · 模糊 |
| pf | `photo-03.jpg` | 3:4 竖 | 185px | 38.3% | 10% | `IMG_9017.JPG` · AI · 过曝 |
| p3 | `photo-04.jpg` | 3:2 横 | 250px | 52% | 1% | `IMG_8821.JPG` · ★★★★ · 2026-10 |
| p7 | `photo-05.jpg` | 3:4 竖 | 170px | 31% | 43.5% | `DSC_0288.ARW` · ★★★★ · 已归档 |
| p9 | `photo-06.jpg` | 3:2 横 | 210px | 12.5% | 47% | `IMG_8770.JPG` · AI · 连拍重复 |
| window | 软件截图 | 1262:838 | 530px | right 4.2% | 13.5% | `ImageFilter` · 网格 · 已选 3 / 24 |

- 照片：`border-radius:14px`，`object-fit:cover`，内描边 `1px white/8`，阴影 `0 18px 50px rgba(0,0,0,.55)`。
- 主窗口：`border-radius:16px`，阴影 `0 40px 100px rgba(0,0,0,.75)` + 外描边 `1px white/10`。
- 说明文字：文件名 Inter 500 11.5px `white/90`；元信息 Geist Mono 10.5px `white/50`；星级/归档 emerald。
- 拼贴层整体 `translate3d`；`will-change:transform`；拖拽时 `cursor:grabbing`。

### 5.2 移动端（<900px）

- 只显示 p1、pf、p3 三张，隐藏主窗口、p2、p7、p9。
- 位置：p1 `left 2% / top 3% / width 40%`；pf `left 55% / top 12% / width 38%`；p3 `left 10% / top 40% / width 50%`。
- 不启用拖拽；照片说明只保留 p1、pf。
- 拼贴整体位于首屏上半部，底部渐隐压到标题区。

### 5.3 拖拽

- 仅 `matchMedia("(hover:hover) and (pointer:fine)")` 为真时绑定 `pointerdown/move/up`。
- `pointerdown` → `setPointerCapture`；记录起点；首次拖拽隐藏提示。
- `pointermove` → `x/y` 限制在 `[-150,150]`，`transform: translate3d(x,y,0)`。
- `pointerup/cancel` → 结束拖拽，恢复 `cursor:grab`。
- 不使用惯性、不做吸附、不改 DOM 顺序。

### 5.4 素材要求（实际采用：截图拼贴）

首屏 6 张不再使用图库占位照片，改为**截图拼贴**：

- `src/assets/screens/light-demo.png`：按用户提供的浅色 demo 状态重新截取的修复后整窗图（2268×1122），用于主界面、网格、详细信息三张裁切卡；用户原图中间黑底是旧 bug，未直接采用。
- `src/assets/screens/device-tree-light.png`：从当前 1.3.0 demo 重新截取的浅色设备树（480×640，修复树行重叠后），用于左上角竖卡。
- `src/assets/app-grid.jpg`：主仓库 `screenshot-light-clean.jpg` 的彩色 DEMO 网格，用于主窗口和「演示数据」卡。
- 图注改为界面说明（设备树 / 目录 / 网格 / 主界面 / 详细信息 / 演示数据），不再使用虚构文件名与星级。
- 若以后换回真实照片，替换 `HeroCollage.tsx` 的 `shots` 数据及对应资源即可；不再阻塞上线。

## 6. i18n 变更

- `hero.title` 拆成 `title.line1 / title.line2 / title.emphasis`（用于 `<br>` 与 `<em>`）。
- 新增 `hero.micro`、`hero.dragHint`。
- `demo` 新增 `eyebrow`、`title`、`windowLabel`、`caption`；保留 `hint`、`langHint`。
- `compare` 新增 `eyebrow`；其余不变。
- 新增 `faq: { eyebrow, title, items: {q,a}[] }`。
- `footer` 新增分组标签 `product / resources / contact`。
- 所有新增 key 中英成对；`LandingMessages` 类型同步补齐。
- 切换语言时更新 `document.documentElement.lang`（`zh-CN` / `en`），让 `:lang()` 字距规则生效。

## 7. demo 同步规格（P3）

目标：`src/demo/ui/` 从主仓库 1.1.2 更新到 **1.3.0**，`src/demo/app-version.ts` 改成 `1.3.0`。

按 README 五项检查，并补第 6 项（本次发现的坑）：

1. **命令表**：主仓库 `generate_handler!` 比 mock 多 16 个命令，必须补 handler，缺失会在打开设置面板时 `unknown command`：
   `open_macos_privacy_settings`、`get_server_status`、`set_server_enabled`、`get_server_network_hints`、`rotate_server_token`、`add_share`、`remove_share`、`get_server_pairing_qr`、`set_server_read_only`、`get_server_clients`、`open_pairing_window`、`close_pairing_window`、`pairing_status`、`approve_pairing`、`deny_pairing`、`forget_paired_device`。
2. **`@tauri-apps/*` 导入**：新增 `@tauri-apps/api/event` 的动态 import（配对事件）。现有 alias 正则已覆盖，但 mock 没有 `listen` 导出、`tauri-types.d.ts` 没有声明 —— 两处都要补。
3. **构建期全局**：`__APP_VERSION__` 的声明与 `define` 已存在，保持。
4. **`App` 必传参数**：仍是 `osCapabilities`；`ImageFilterDemo` 不变。
5. **版本号**：`src/demo/app-version.ts` → `1.3.0`。
6. **CSS 语义色 token（README 未写）**：1.3.0 组件使用 `text-brand` / `bg-brand-strong` / `text-danger` 等类。`src/demo/index.css` 缺 `--brand*` / `--danger*` / `--warning` / `--info` 变量与 `@theme inline` 映射，不补会导致按钮/状态**静默失色**（Tailwind 不生成类，不报错）。从主仓库 `src/index.css` 只读复制这段 token，不改 demo 的其他样式。

mock 形状（按主仓库类型）：
- `get_server_status`：`{ running:false, port:0, url:"", token:"", shares:[], enabled:false, lastError:null, publicAckAt:null, readOnly:false }`
- `get_server_network_hints`：`{ lan:[], publicIpv4:[], profile:"unknown", firewallHint:"" }`
- `get_server_pairing_qr`：`null`
- `pairing_status`：`{ open:false, pending:[], paired:[] }`
- `open_pairing_window`：`{ expiresAt: Date.now()+300000 }`
- `add_share` / `remove_share`：返回 `string[]`（可变 mock 状态）
- `rotate_server_token` / `set_server_enabled` / `set_server_read_only` / `approve_pairing` / `deny_pairing` / `forget_paired_device` / `close_pairing_window` / `open_macos_privacy_settings`：`void` / no-op
- `get_server_clients`：`[]`
- `listen`：`async () => () => {}`（demo 里不产生配对事件）

同步后必须：设置面板能打开、无 `ReferenceError`、无 `unknown command`；配对窗口/图库服务面板不崩；demo 内评分、导入、历史、命名方案仍可用。

## 8. 可访问性、性能、兼容性

- 正文对比度 ≥ 4.5:1；信息性小字最低 `white/50`；emerald 只用于数据，不承载唯一信息（星数与文字并存）。
- 所有可点元素有 `:focus-visible` 白色描边（2px，offset 2px）；触控目标 ≥ 24×24，主要按钮 34–40px 高。
- 拖拽是增强：移动端/键盘用户不需要拖拽也能看到全部内容。
- 语言切换按钮 `aria-pressed`；星标链接 `aria-label`；装饰图 `alt=""`，主窗口图有描述性 alt。
- `prefers-reduced-motion` 关闭进场与过渡；`scroll-behavior` 同步关闭。
- 字体只打包 latin 子集，约 90KB；照片懒加载（首屏前三张 eager，其余 lazy）；所有图片有宽高/aspect-ratio，避免 CLS。
- 移除 `LiquidEther` / `ParticleText` / `ClickSpark` / `BorderGlow` / `SpecularButton` 的落地页引用后，首屏不再加载 WebGL/three 路径；不删 `src/demo/ui/components/` 里的文件。
- 目标浏览器：Chrome / Edge / Safari 最新两个大版本；不支持 IE。

## 9. 验收标准

- `npm run build`、`npm run lint`、`npx vitest run` 全绿。
- 390 / 768 / 1024 / 1280 / 1440 / 1920 无横向溢出；`document.documentElement.scrollWidth <= window.innerWidth`。
- 首屏：拖拽可用、提示首次后消失、中英切换标题与文案、CTA 锚到下载区。
- 演示：可点击照片、星级、设置面板（同步后）、导入历史、命名方案；无控制台报错。
- 对比 / 特性 / 工作流 / 下载 / FAQ / 页脚逐项可见；下载区版本号来自 GitHub，失败态可复现；国内直链可展开。
- 语言切换后所有新增文案无缺失、无中英混排错误。
- 对比度抽查：正文、微标签、按钮、emerald 数据色；无低于 AA 的信息性文本。
- 不出现紫蓝渐变、发光、粒子、玻璃流体；emerald 无大面积使用。
- 文档与提交同步更新；**不推送**。

## 10. 风险与待办

| # | 风险 / 待办 | 处理 |
|---|---|---|
| 1 | 6 张真实照片未到 | 先用原型占位图；上线前替换，否则有版权与货不对板风险 |
| 2 | 卡片说明的文件名/日期是占位 mock | 收到照片后同步改成用户实际文件名与拍摄信息 |
| 3 | demo 同步可能暴露 README 五项之外的漂移（CSS token、动态 import） | 本 spec 已补第 6 项；同步后以 `build` + 实机点设置面板为准 |
| 4 | FAQ 的 macOS / 许可表述需用户最终确认 | 文案已按主仓库 README 写；发布前请用户过目 |
| 5 | ~~`CN_DOWNLOADS` 仍是 1.0.0~~ | **已移除**；国内加速改走下载线路切换 |
| 6 | `vite base` 仍是 `/`，github.io 地址取不到资源 | 可选项，不在本次范围；线上以 `tensyn.online/imagefilter/` 为准 |
| 7 | 原型拖拽提示元素缺失导致首次拖拽控制台报错 | 正式实现补 `hint` 元素并做空值保护 |

## 11. 文件边界

- 新增/修改只允许：
  - `src/landing/**`（含新建 `src/landing/components/`、`HeroCollage.tsx`、`FAQ.tsx`）
  - `src/index.css`、`src/main.tsx`
  - `src/assets/screens/**`（新增截图素材）
  - `src/demo/mock/**`、`src/demo/app-version.ts`、`src/demo/ImageFilterDemo.tsx`（仅 P3 同步所需）
  - `src/demo/index.css`（仅补 1.3.0 语义色 token）
  - `src/demo/ui/**`（**只由同步脚本覆盖**，不手改）
  - `package.json` / `package-lock.json`（仅字体依赖）
  - `docs/**`、`README.md`（状态与规格）
- 禁止：`A:\tenent` 的任何写操作；推送 `origin`；删除 `src/demo/ui/components/` 下现有动效文件；改 demo mock 的既有行为。

## 12. 实施记录（2026-11-01）

已完成 P1 设计层、P2 全部九个区块、P3 demo 1.3.0 同步、P4 验收。与规格的偏差与补充：

1. **字体**：没有新增 npm 依赖，直接把 4 个 latin woff2（Poppins 500/600、Inter variable、Geist Mono variable，约 88KB）复制到 `src/assets/fonts/`，并附带三份 OFL 许可证；`@font-face` 手写在 `src/index.css`。
2. **移动端 Nav**：第二行 4 个锚点加 `bg-black/60 backdrop-blur-xl`。原型没有这条移动端导航；不加底色时，链接落在首屏照片上不可读。
3. **移动端演示**：`ImageFilterDemo` 在 `<900px` 设 `min-width:720px`，外层 `overflow-x-auto`，可横向滑动查看软件 UI；页面本身仍无横向溢出。说明文字补「窄屏可左右滑动 / Swipe horizontally on narrow screens」。
4. **英文标题空格**：`Keep only` 与 `the keepers` 之间由组件按语言补空格，避免 `Keep onlythe keepers`。
5. **i18n 补充**：新增下载完成/下载中、下载线路等文案；蓝奏云移除后对应的 `password` / `cnTitle` 等 key 已删除。
6. **demo 同步**：按 README 五项 + 本规格第 6 项（语义色 token）完成。实测设置面板可打开，开启局域网服务后显示 `http://192.168.1.10:47832`，配对按钮显示「配对窗口已打开」，无控制台异常。
7. **`buttonStyles`** 拆到 `src/landing/components/buttonStyles.ts`，避免同一文件既导出组件又导出函数触发 fast-refresh 警告。
8. **装饰编号对比度**：compare / features / FAQ 的 10.5px 编号统一到 `ink-faint`（5.3:1），workflow 的 40px 大编号到 `white/40`（3.6:1），避免低对比度审计 blocker；视觉上仍保留「幽灵编号」的层次。
9. **覆盖层对比度**：移动端导航第二行用 `bg-black/75 backdrop-blur-xl`；首屏拖拽提示用 `bg-black/80` + `text-white/70`，避免压在照片/软件截图上不可读。
10. **demo 外壳修复**（用户验收反馈）：`src/demo/index.css` 补回主仓库的树行样式（28px 行高、`.tree-kids` 裁剪与高度过渡、`.tree-caret` 旋转），修复设备栏重叠；给 `.ifdemo-scope` 补深/浅主题底色，修复浅色主题中间露黑底；把 `.ifdemo-scope .fixed` 改成 `absolute`，让图片查看器/对话框限制在 demo 框内；隐藏 titlebar 齿轮，官网演示不开放设置面板。
11. **安装包下载按钮**：接入 rewampui registry 的 `neumorphic-download-button`，三张卡全宽使用；点击用隐藏 iframe 触发浏览器原生下载（当前页不跳、不开新标签页），2.2s emerald 进度环只是视觉反馈，进度/完成文案中英双语。CLI 因 `components.json` 缺 `registryUrl` 失败，按同一份 registry 源码落在 `src/landing/components/`，用项目已有的 `motion/react` 替代 `framer-motion`。
12. **更多版本 / 版本全览**：原「国内直链下载」折叠区改为「更多版本」→ `#/versions`；`VersionsPage` 读取全部 releases，过滤 updater 资产，资产行同样用隐藏 iframe 下载；hash 路由，带返回首页、语言切换、页面标题。蓝奏云直链后续按用户要求移除。
13. **FlapLabel 指针穿透**：`.flap-button-label { pointer-events:none }` 修复 hover 重挂载导致快速点击丢失；按钮标签仍保留 `aria-hidden` tile + SR 原文。
14. **首屏截图拼贴**：按用户选择，6 张图库占位照片替换为「按用户浅色 demo 状态重截的修复后整窗图 + 重新截取的设备树 + 彩色 DEMO 网格」；图注改为界面说明，`src/assets/photos/` 已移除，新增 `src/assets/screens/`。
15. **下载线路切换**：默认 GitHub；「国内加速」给安装包 URL 加 `ghfast.top` 前缀，不需要逐个上传；选择存 localStorage，首页/版本页共享，并显示第三方风险提示。
16. **仍未完成**：`vite base` 仍为 `/`（可选）。
