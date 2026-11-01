# ImageFilter 官网改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把官网落地页从紫蓝流体风格改成纯黑单色 + emerald 数据色的设计，保留全部现有功能，并把 demo 从 1.1.2 同步到 1.3.0。

**Architecture:** 先建立设计层（token、自托管字体、基础组件），再逐区块替换 `src/landing/` 的表现层；下载逻辑、i18n 结构、demo 容器等既有行为保持不变。最后按 README 的五项检查（外加 CSS 语义色 token）同步 `src/demo/ui/`，统一验收。

**Tech Stack:** React 19、TypeScript 6、Vite 8、Tailwind CSS 4、motion/react、lucide-react、Vitest。

## Global Constraints

- 只改 `A:\ImageFilter-Website`；**禁止**写 `A:\tenent`（只读复制）。
- **禁止** `git push`；提交只留本地。
- `src/demo/ui/` 只允许由同步脚本覆盖，**禁止手改**。
- 新组件放 `src/landing/`；不要新增到 `src/demo/ui/`。
- 不新增定价、订阅、邮件表单等无后端功能。
- 不删除 `src/demo/ui/components/` 下现有动效文件；只停止在落地页引用。
- 颜色：纯黑底；emerald `#10b981` 只做数据色，不做大面积绿。
- 字体：中文系统栈；拉丁只打包 latin 子集；不引 Google Fonts。
- 动效：`opacity + translateY(8px)`，500ms，`cubic-bezier(.2,.6,.2,1)`，只播一次；`prefers-reduced-motion` 全关。
- 每改完一个区块跑一次 `npm run build`，报错先修再继续。
- 不顺手重构无关代码；不动 demo 的 mock 既有行为。
- 完成标准：`npm run build`、`npm run lint`、`npx vitest run` 全绿；390/768/1024/1280/1440/1920 无横向溢出；功能逐项点过。

---

## Task 1: 设计层 — 字体、token、基础样式

**Files:**
- Create: `src/assets/fonts/poppins-500.woff2`
- Create: `src/assets/fonts/poppins-600.woff2`
- Create: `src/assets/fonts/inter-latin-variable.woff2`
- Create: `src/assets/fonts/geist-mono-latin-variable.woff2`
- Create: `src/assets/fonts/LICENSE-poppins.txt`
- Create: `src/assets/fonts/LICENSE-inter.txt`
- Create: `src/assets/fonts/LICENSE-geist-mono.txt`
- Create: `src/landing/lib/cn.ts`
- Modify: `src/index.css`（不新增依赖，字体直接复制 woff2）

**Interfaces:**
- Produces: Tailwind 颜色 token `canvas / surface / surface-sunken / line / line-strong / ink / ink-muted / ink-faint / data`
- Produces: 字体工具类 `font-landing / font-display / font-landing-mono`
- Produces: 字号工具类 `text-display / text-display-lg / text-title / text-body-lg / text-body / text-caption / text-micro / text-mono-sm`
- Produces: `cn(...inputs: ClassValue[]): string`

- [ ] **Step 1: 复制 4 个 latin 字体与许可证**

```bash
cd A:/ImageFilter-Website
mkdir -p src/assets/fonts
cp .scratch/proto/x/fontsource-poppins-5.3.0/package/files/poppins-latin-500-normal.woff2 src/assets/fonts/poppins-500.woff2
cp .scratch/proto/x/fontsource-poppins-5.3.0/package/files/poppins-latin-600-normal.woff2 src/assets/fonts/poppins-600.woff2
cp .scratch/proto/x/fontsource-variable-inter-5.3.0/package/files/inter-latin-wght-normal.woff2 src/assets/fonts/inter-latin-variable.woff2
cp .scratch/proto/x/fontsource-variable-geist-mono-5.3.0/package/files/geist-mono-latin-wght-normal.woff2 src/assets/fonts/geist-mono-latin-variable.woff2
cp .scratch/proto/x/fontsource-poppins-5.3.0/package/LICENSE src/assets/fonts/LICENSE-poppins.txt
cp .scratch/proto/x/fontsource-variable-inter-5.3.0/package/LICENSE src/assets/fonts/LICENSE-inter.txt
cp .scratch/proto/x/fontsource-variable-geist-mono-5.3.0/package/LICENSE src/assets/fonts/LICENSE-geist-mono.txt
```

Expected: `du -h src/assets/fonts/*.woff2` 总计约 88KB。

- [ ] **Step 2: 写 `cn` 工具**

```ts
// src/landing/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: 重写 `src/index.css`**

```css
/* Copyright (c) 2026 XUTENGXIANG
 * SPDX-License-Identifier: MIT */
@import "tailwindcss";
@import "tw-animate-css";

/* 只保留 latin 子集，自托管，避免 Google Fonts 与多余子集 */
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("./assets/fonts/poppins-500.woff2") format("woff2");
}
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("./assets/fonts/poppins-600.woff2") format("woff2");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("./assets/fonts/inter-latin-variable.woff2") format("woff2-variations");
}
@font-face {
  font-family: "Geist Mono";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("./assets/fonts/geist-mono-latin-variable.woff2") format("woff2-variations");
}

@theme {
  --color-canvas: #000000;
  --color-surface: #141414;
  --color-surface-sunken: #0a0a0a;
  --color-line: rgba(255, 255, 255, .11);
  --color-line-strong: rgba(255, 255, 255, .20);
  --color-ink: #fafafa;
  --color-ink-muted: rgba(255, 255, 255, .64);
  --color-ink-faint: rgba(255, 255, 255, .50);
  --color-data: #10b981;

  /* 不覆盖 --font-sans / --font-mono：demo 的 @theme 已占用 */
  --font-landing: Inter, "PingFang SC", "HarmonyOS Sans SC", MiSans, "Microsoft YaHei", system-ui, sans-serif;
  --font-display: Poppins, var(--font-landing);
  --font-landing-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  --text-display: clamp(2rem, 3.9vw, 3.375rem);
  --text-display--line-height: 1.06;
  --text-display-lg: clamp(1.75rem, 3vw, 2.375rem);
  --text-display-lg--line-height: 1.1;
  --text-title: 1.375rem;
  --text-title--line-height: 1.3;
  --text-body-lg: 1rem;
  --text-body-lg--line-height: 1.65;
  --text-body: 0.875rem;
  --text-body--line-height: 1.65;
  --text-caption: 0.75rem;
  --text-caption--line-height: 1.5;
  --text-micro: 0.65625rem;
  --text-micro--line-height: 1.5;
  --text-mono-sm: 0.6875rem;
  --text-mono-sm--line-height: 1.45;

  --radius-card: 14px;
  --radius-window: 18px;
  --ease-brand: cubic-bezier(.2, .6, .2, 1);
  --breakpoint-hero: 56.25rem;
}

:root {
  color-scheme: dark;
  font-family: var(--font-landing);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #000;
  color: #fafafa;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background: rgba(16, 185, 129, .28);
  color: #ffffff;
}

:focus-visible {
  outline: 2px solid rgba(255, 255, 255, .72);
  outline-offset: 2px;
}

/* 英文标题用负字距；中文标题保持 0，避免 CJK 挤在一起 */
.font-display {
  letter-spacing: 0;
}
:lang(en) .font-display {
  letter-spacing: -0.02em;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: 跑构建确认 token 与字体解析**

Run: `npm run build`
Expected: PASS；`dist/assets` 下出现 4 个 woff2；无 `Cannot find module` 或 CSS 解析错误。

- [ ] **Step 5: 提交**

```bash
git add src/index.css src/landing/lib/cn.ts src/assets/fonts
git commit -m "feat(landing): add monochrome design tokens and self-hosted latin fonts"
```

---

## Task 2: 基础组件 — Button / SectionHead / Card / Reveal

**Files:**
- Create: `src/landing/components/Button.tsx`
- Create: `src/landing/components/SectionHead.tsx`
- Create: `src/landing/components/Card.tsx`
- Create: `src/landing/components/Reveal.tsx`

**Interfaces:**
- Produces: `buttonStyles(opts: { variant?: "solid" | "ghost" | "quiet"; size?: "sm" | "md" | "lg"; className?: string }): string`
- Produces: `<Button variant size className ...buttonProps>` 与 `<ButtonLink href external variant size ...anchorProps>`
- Produces: `<SectionHead eyebrow title subtitle? align? actions? className? />`
- Produces: `<Card className? ...divProps>`
- Produces: `<Reveal delay? className?>`

- [ ] **Step 1: 写 Button**

```tsx
// src/landing/components/Button.tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "solid" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-[34px] px-[14px] text-[12.5px]",
  md: "h-9 px-4 text-[13px]",
  lg: "h-10 px-[18px] text-[13.5px]",
};

const variants: Record<Variant, string> = {
  solid: "border-transparent bg-ink text-[#0a0a0a] hover:bg-white",
  ghost: "border-line bg-white/[0.03] text-white/[0.86] hover:border-line-strong hover:bg-white/[0.08]",
  quiet: "border-transparent text-ink-muted hover:text-ink",
};

export function buttonStyles({
  variant = "ghost",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-landing font-medium",
    "transition-[background-color,border-color,color,transform] duration-200 ease-brand active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-40",
    sizes[size],
    variants[variant],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
}

export function ButtonLink({
  variant,
  size,
  className,
  external,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={buttonStyles({ variant, size, className })}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 2: 写 SectionHead**

```tsx
// src/landing/components/SectionHead.tsx
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
}

export default function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "left",
  actions,
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-landing-mono text-micro uppercase tracking-[0.12em] text-ink-faint">
        <span className="size-1.5 rounded-full bg-data" aria-hidden="true" />
        {eyebrow}
      </p>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <h2 className="font-display text-display-lg font-semibold text-ink text-balance">
          {title}
        </h2>
        {actions}
      </div>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-body-lg text-ink-muted text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: 写 Card 与 Reveal**

```tsx
// src/landing/components/Card.tsx
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-card border border-line bg-surface-sunken", className)}
      {...props}
    />
  );
}
```

```tsx
// src/landing/components/Reveal.tsx
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.6, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: 构建**

Run: `npm run build`
Expected: PASS（组件尚未被引用，但类型与 CSS 类必须能编译）。

- [ ] **Step 5: 提交**

```bash
git add src/landing/components
git commit -m "feat(landing): add button, section head, card and reveal primitives"
```

---

## Task 3: LandingPage / Nav / Star 按钮

**Files:**
- Modify: `src/landing/LandingPage.tsx`（补 `useEffect` import）
- Modify: `src/landing/Nav.tsx`
- Modify: `src/landing/GitHubStarButton.tsx`
- Modify: `src/main.tsx`（只更新注释）

**Interfaces:**
- Consumes: `ButtonLink`, `buttonStyles`
- Produces: 无导出的新接口；Nav props 保持 `{ lang, onLangChange }`

- [ ] **Step 1: 清掉落地页的流体背景**

`LandingPage.tsx` 删除：
- `ClickSpark`、`LiquidEther` import 与 `FLUID_COLORS`
- 固定背景的 `LiquidEther` + 三色光晕 `div`
- 外层 `ClickSpark` 包裹

根节点改为：

```tsx
<div className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
  <Nav lang={lang} onLangChange={changeLang} />
  <main className="relative z-10">
    <Hero lang={lang} />
    <DemoWindow lang={lang} />
    <Compare lang={lang} />
    <Features lang={lang} />
    <Workflow lang={lang} />
    <Download lang={lang} />
  </main>
  <Footer lang={lang} />
</div>
```

同时加语言属性同步（`useEffect` 要加进 React import）：

```tsx
useEffect(() => {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
}, [lang]);
```

> `<FAQ />` 在 Task 10 创建并插入；本任务不要提前引用，保证每步都能构建。

- [ ] **Step 2: 重写 Nav**

补 import：`useEffect`/`useState`、`cn`、`ButtonLink`、`logo`、`GitHubStarButton`、`Lang`、`translations`。

```tsx
// 关键结构，完整文件按此展开
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

<header
  className={cn(
    "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-brand",
    scrolled
      ? "border-b border-line bg-black/[0.72] backdrop-blur-xl backdrop-saturate-150"
      : "border-b border-transparent bg-transparent",
  )}
>
  {!scrolled && (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.82),rgba(0,0,0,.34)_58%,transparent)]"
    />
  )}
  <div className="relative mx-auto flex h-16 max-w-6xl items-center gap-2 px-6 max-hero:px-[18px]">
    <a href="#top" className="flex shrink-0 items-center gap-[9px]">
      <img src={logo} alt="" className="size-[26px]" />
      <span className="font-display text-[15px] font-semibold text-ink max-hero:hidden">
        ImageFilter
      </span>
    </a>

    <nav className="ml-3.5 hidden items-center gap-0.5 hero:flex" aria-label="Primary">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-md px-2.5 py-2 font-display text-[13.5px] font-medium text-white/[0.66] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </nav>

    <div className="ml-auto flex items-center gap-1.5">
      <GitHubStarButton lang={lang} />
      <div
        className="flex items-center gap-0.5 rounded-full border border-line bg-white/[0.03] p-0.5"
        role="group"
        aria-label="Language"
      >
        {(["zh", "en"] as Lang[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onLangChange(item)}
            aria-pressed={lang === item}
            className={cn(
              "rounded-full px-2.5 py-1.5 text-[11.5px] font-medium transition-colors duration-200",
              lang === item ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80",
            )}
          >
            {item === "zh" ? "中" : "EN"}
          </button>
        ))}
      </div>
      <ButtonLink href="#download" variant="solid" size="sm" className="max-hero:hidden">
        {t.nav.download}
      </ButtonLink>
      <ButtonLink href="#download" variant="solid" size="sm" className="hidden max-hero:inline-flex">
        {t.nav.download}
      </ButtonLink>
    </div>
  </div>

  <nav
    className="no-scrollbar flex items-center gap-1 overflow-x-auto border-t border-line/60 px-[18px] py-2 hero:hidden"
    aria-label="Primary mobile"
  >
    {links.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="shrink-0 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
      >
        {link.label}
      </a>
    ))}
  </nav>
</header>
```

> 两个下载按钮可以合并：`className="max-hero:hidden"` + 移动端另一个。若嫌重复，保留一个并让它在两处都显示；不要省略移动端下载入口。

- [ ] **Step 3: 重写 Star 按钮外观**

保留现有 fetch 逻辑与 `stars` 状态，只改 className：

```tsx
<a
  href={REPOSITORY_URL}
  target="_blank"
  rel="noreferrer"
  aria-label={t.nav.starOnGithub}
  className="group inline-flex h-[34px] items-center justify-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 font-landing text-[12.5px] font-medium text-white/[0.86] transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
>
  <svg className="size-[13px] fill-current" viewBox="0 0 438.549 438.549" aria-hidden="true">…</svg>
  <span className="max-hero:hidden">{t.nav.starOnGithub}</span>
  {stars !== null && (
    <span className="flex items-center gap-1 max-hero:hidden">
      <svg className="size-3 fill-data" viewBox="0 0 24 24" aria-hidden="true">…</svg>
      <span className="font-landing-mono tabular-nums text-data">{stars}</span>
    </span>
  )}
</a>
```

- [ ] **Step 4: 更新 `src/main.tsx` 注释**

```tsx
// 不用 StrictMode: 这是移除 LiquidEther 之前为 WebGL 双挂载留下的既有决定。
// 恢复 StrictMode 需要单独验证 demo 的双挂载行为，不在本次改版范围。
createRoot(document.getElementById('root')!).render(
  <LandingPage />,
)
```

- [ ] **Step 5: 构建 + 本地检查**

Run: `npm run build`
Expected: PASS。

Run: `npm run dev`
Expected: 页面纯黑；导航在滚动后出现毛玻璃与发丝线；中/EN 切换正常；Star 数可见（GitHub API 可访问时）。

- [ ] **Step 6: 提交**

```bash
git add src/landing/LandingPage.tsx src/landing/Nav.tsx src/landing/GitHubStarButton.tsx src/main.tsx
git commit -m "feat(landing): replace fluid background and rebuild navigation"
```

---

## Task 4: Hero + 可拖拽拼贴

**Files:**
- Create: `src/landing/HeroCollage.tsx`
- Create: `src/assets/photos/photo-01.jpg` … `photo-06.jpg`
- Create: `src/assets/photos/README.md`
- Create: `src/assets/app-grid.jpg`（从主仓库只读复制）
- Modify: `src/landing/Hero.tsx`
- Modify: `src/landing/i18n.ts`

**Interfaces:**
- Consumes: `ButtonLink`, `cn`, i18n `hero`
- Produces: `<HeroCollage />`；`hero.title.{line1,line2,emphasis}`、`hero.micro`、`hero.dragHint`、`hero.windowAlt`

- [ ] **Step 1: 复制占位照片与软件截图**

```bash
cd A:/ImageFilter-Website
mkdir -p src/assets/photos
cp .scratch/proto/assets/p1015.jpg src/assets/photos/photo-01.jpg
cp .scratch/proto/assets/p1074.jpg src/assets/photos/photo-02.jpg
cp .scratch/proto/assets/p1025.jpg src/assets/photos/photo-03.jpg
cp .scratch/proto/assets/p1039.jpg src/assets/photos/photo-04.jpg
cp .scratch/proto/assets/p1043.jpg src/assets/photos/photo-05.jpg
cp .scratch/proto/assets/p1050.jpg src/assets/photos/photo-06.jpg
cp A:/tenent/assets/screenshot-light-clean.jpg src/assets/app-grid.jpg
```

写 `src/assets/photos/README.md`：

```md
# 首屏照片占位

这 6 张是原型用的图库占位图（Picsum / Unsplash 授权），**上线前必须替换为用户自有作品**。

需要：4 张竖构图 3:4 + 2 张横构图 3:2，长边 ≥1200px，sRGB，JPEG/WebP，单张构建后 ≤200KB。

替换时保持文件名不变：
- photo-01.jpg（竖，p1）
- photo-02.jpg（竖，p2）
- photo-03.jpg（竖，pf）
- photo-04.jpg（横，p3）
- photo-05.jpg（竖，p7）
- photo-06.jpg（横，p9）

卡片说明里的文件名/拍摄信息在 `src/landing/HeroCollage.tsx` 的 `PHOTOS` 数组里，替换照片后同步改成实际信息。
```

- [ ] **Step 2: 写 HeroCollage**

```tsx
// src/landing/HeroCollage.tsx
import { useEffect, useRef, useState } from "react";
import { cn } from "./lib/cn";
import { translations } from "./i18n";
import type { Lang } from "./i18n";
import p1 from "../assets/photos/photo-01.jpg";
import p2 from "../assets/photos/photo-02.jpg";
import pf from "../assets/photos/photo-03.jpg";
import p3 from "../assets/photos/photo-04.jpg";
import p7 from "../assets/photos/photo-05.jpg";
import p9 from "../assets/photos/photo-06.jpg";
import appGrid from "../assets/app-grid.jpg";

type PhotoMeta = {
  rating?: number;
  status?: "archived" | "blur" | "overexposed" | "duplicate";
  date?: string;
};

type Photo = {
  id: string;
  src: string;
  cls: string;
  aspect: string;
  name: string;
  meta: PhotoMeta;
  eager?: boolean;
  mobileHidden?: boolean;
  mobileCls?: string;
};

const PHOTOS: Photo[] = [
  { id: "p1", src: p1, cls: "left-[3.5%] top-[-1%] w-[15.4%] max-w-[235px]", mobileCls: "max-hero:left-[2%] max-hero:top-[3%] max-hero:w-[40%] max-hero:max-w-none", aspect: "aspect-[3/4]", name: "DSC_0142.ARW", meta: { rating: 5, status: "archived" }, eager: true },
  { id: "p2", src: p2, cls: "left-[22%] top-[16%] w-[12%] max-w-[185px]", mobileHidden: true, aspect: "aspect-[3/4]", name: "DSC_0157.ARW", meta: { status: "blur" } },
  { id: "pf", src: pf, cls: "left-[38.3%] top-[10%] w-[12%] max-w-[185px]", mobileCls: "max-hero:left-[55%] max-hero:top-[12%] max-hero:w-[38%] max-hero:max-w-none", aspect: "aspect-[3/4]", name: "IMG_9017.JPG", meta: { status: "overexposed" }, eager: true },
  { id: "p3", src: p3, cls: "left-[52%] top-[1%] w-[16.7%] max-w-[250px]", mobileCls: "max-hero:left-[10%] max-hero:top-[40%] max-hero:w-[50%] max-hero:max-w-none", aspect: "aspect-[3/2]", name: "IMG_8821.JPG", meta: { rating: 4, date: "2026-10" }, eager: true },
  { id: "p7", src: p7, cls: "left-[31%] top-[43.5%] w-[11.5%] max-w-[170px]", mobileHidden: true, aspect: "aspect-[3/4]", name: "DSC_0288.ARW", meta: { rating: 4, status: "archived" } },
  { id: "p9", src: p9, cls: "left-[12.5%] top-[47%] w-[14%] max-w-[210px]", mobileHidden: true, aspect: "aspect-[3/2]", name: "IMG_8770.JPG", meta: { status: "duplicate" } },
];
```

渲染部分（用稳定的 `id` 控制移动端显隐，不再比较文件名）：

```tsx
import type { PointerEvent as ReactPointerEvent } from "react";

interface HeroCollageProps {
  lang: Lang;
  onFirstDrag: () => void;
}

export default function HeroCollage({ lang, onFirstDrag }: HeroCollageProps) {
  const t = translations[lang];
  const boardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [canDrag, setCanDrag] = useState(false);
  const start = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanDrag(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!canDrag) return;
    setDragging(true);
    if (!usedHint) {
      setUsedHint(true);
      onFirstDrag();
    }
    start.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const x = Math.max(-150, Math.min(150, start.current.ox + e.clientX - start.current.x));
    const y = Math.max(-150, Math.min(150, start.current.oy + e.clientY - start.current.y));
    setPos({ x, y });
  };

  const endDrag = () => setDragging(false);

  return (
    <div
      ref={boardRef}
      className={cn(
        "absolute -inset-x-[2%] -inset-y-[4%] max-hero:inset-0",
        canDrag && (dragging ? "cursor-grabbing" : "cursor-grab"),
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`, willChange: "transform" }}
    >
      {PHOTOS.map((photo) => (
        <figure
          key={photo.id}
          className={cn(
            "absolute m-0",
            photo.cls,
            photo.mobileCls,
            photo.mobileHidden && "max-hero:hidden",
          )}
        >
          <div className={cn("relative overflow-hidden rounded-card bg-surface shadow-[0_18px_50px_rgba(0,0,0,.55)] ring-1 ring-inset ring-white/[0.08]", photo.aspect)}>
            <img
              src={photo.src}
              alt=""
              draggable={false}
              loading={photo.eager ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="mt-2.5">
            <b className="block font-landing text-[11.5px] font-medium leading-[1.4] text-white/90">
              {photo.name}
            </b>
            <i className="block font-landing-mono text-[10.5px] not-italic leading-[1.5] tracking-[0.02em] text-ink-faint">
              <span className="tracking-[0.06em] text-data">{"★".repeat(photo.meta.rating ?? 0)}</span>
              {photo.meta.rating ? " · " : ""}
              {photo.meta.status === "archived" && <span className="text-data">{t.collage.archived}</span>}
              {photo.meta.status === "blur" && t.collage.blur}
              {photo.meta.status === "overexposed" && t.collage.overexposed}
              {photo.meta.status === "duplicate" && t.collage.duplicate}
              {photo.meta.date}
            </i>
          </figcaption>
        </figure>
      ))}

      <figure className="absolute right-[4.2%] top-[13.5%] m-0 w-[34%] max-w-[530px] max-hero:hidden">
        <div className="relative aspect-[1262/838] overflow-hidden rounded-window bg-surface shadow-[0_40px_100px_rgba(0,0,0,.75)] ring-1 ring-white/10">
          <img src={appGrid} alt={t.hero.windowAlt} loading="eager" decoding="async" className="size-full object-cover" />
        </div>
        <figcaption className="mt-2.5 flex justify-between gap-3 font-landing-mono text-[10.5px] text-ink-faint">
          <span>ImageFilter</span>
          <span>{t.collage.windowMeta}</span>
        </figcaption>
      </figure>
    </div>
  );
}
```

`t.collage` 需要新增 key：`archived / blur / overexposed / duplicate / windowMeta`。若不想新增，可把这些元信息直接写死；但中英切换要求保留，建议加。

- [ ] **Step 3: 重写 Hero**

```tsx
export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const [usedHint, setUsedHint] = useState(false);
  const title = `${t.hero.title.line1} ${t.hero.title.line2}${t.hero.title.emphasis}`;

  return (
    <section id="top" className="relative flex min-h-svh items-end overflow-hidden">
      <HeroCollage lang={lang} onFirstDrag={() => setUsedHint(true)} />

      <p
        className={cn(
          "absolute right-6 top-[88px] z-[3] hidden items-center gap-1.5 font-landing-mono text-[10px] uppercase tracking-[0.1em] text-white/50 transition-opacity duration-500 hero:flex",
          usedHint && "opacity-0",
        )}
      >
        {t.hero.dragHint}
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,.94)_26%,rgba(0,0,0,.72)_52%,rgba(0,0,0,.3)_78%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 max-hero:px-[18px] max-hero:pb-[30px]">
        <div className="grid items-end gap-12 hero:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] max-hero:gap-5">
          <div>
            <p className="mb-[18px] flex items-center gap-2 font-landing-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
              <span className="size-[5px] rounded-full bg-data shadow-[0_0_0_3px_rgba(16,185,129,.14)]" />
              {t.hero.eyebrow}
            </p>
            <h1 aria-label={title} className="font-display text-display font-semibold text-ink text-balance">
              <span className="block">{t.hero.title.line1}</span>
              <span className="block">
                {t.hero.title.line2}
                <em className="not-italic">{t.hero.title.emphasis}</em>
              </span>
            </h1>
          </div>

          <div className="max-w-[400px] justify-self-end pb-1.5 max-hero:max-w-[520px] max-hero:justify-self-start">
            <p className="mb-[22px] text-[15px] leading-[1.65] text-ink-muted text-pretty">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href="#download" variant="solid" size="lg">{t.hero.windows}</ButtonLink>
              <ButtonLink href="#download" variant="ghost" size="lg">{t.hero.macos}</ButtonLink>
            </div>
            <p className="mt-4 font-landing-mono text-[10.5px] leading-[1.5] tracking-[0.04em] text-ink-faint">
              {t.hero.micro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

> Hero 需要补 import：`useState`（React）、`ButtonLink`、`HeroCollage`、`cn`、`translations`/`Lang`。`hero:dragHint` 的对比度用 `text-white/50`，不要用原型的 `/35`。

- [ ] **Step 4: 更新 i18n**

在 `LandingMessages` 中：

```ts
hero: {
  eyebrow: string;
  title: { line1: string; line2: string; emphasis: string };
  subtitle: string;
  windows: string;
  macos: string;
  micro: string;
  dragHint: string;
  windowAlt: string;
};
collage: {
  archived: string;
  blur: string;
  overexposed: string;
  duplicate: string;
  windowMeta: string;
};
```

中文：

```ts
hero: {
  eyebrow: "本地处理 · 照片不上传",
  title: { line1: "整张卡的照片", line2: "只留", emphasis: "你要的那几张" },
  subtitle: "插卡即看，星级初筛，AI 标出模糊与重复；命名归档一次完成。",
  windows: "Windows",
  macos: "macOS",
  micro: "Windows 10 / 11 · macOS Universal · 本地处理",
  dragHint: "拖动看看",
  windowAlt: "ImageFilter 网格视图，已选 3 / 24",
},
collage: {
  archived: "已归档",
  blur: "AI · 模糊",
  overexposed: "AI · 过曝",
  duplicate: "AI · 连拍重复",
  windowMeta: "网格 · 已选 3 / 24",
},
```

英文：

```ts
hero: {
  eyebrow: "Local only · never uploaded",
  title: { line1: "Cull a whole card", line2: "Keep only", emphasis: "the keepers" },
  subtitle: "Instant RAW previews, star-based culling, AI flags for blur and duplicates, and template archiving — all on your machine.",
  windows: "Windows",
  macos: "macOS",
  micro: "Windows 10 / 11 · macOS Universal · Local processing",
  dragHint: "Drag to explore",
  windowAlt: "ImageFilter grid view, 3 of 24 selected",
},
collage: {
  archived: "Archived",
  blur: "AI · Blurry",
  overexposed: "AI · Overexposed",
  duplicate: "AI · Burst duplicate",
  windowMeta: "Grid · 3 of 24 selected",
},
```

- [ ] **Step 5: 构建 + 断点检查**

Run: `npm run build`
Expected: PASS。

Run: `npm run dev`；在 1440 宽检查：
- 6 张照片 + 1 个主窗口可见，标题压在底部；
- 拖动拼贴跟手，边界 ±150px，首次拖动后提示消失；
- 390 宽只剩 3 张照片，无横向滚动；
- 中英切换标题断行正确，切换后拼贴位置不重置。

- [ ] **Step 6: 提交**

```bash
git add src/landing/Hero.tsx src/landing/HeroCollage.tsx src/landing/i18n.ts src/assets/photos src/assets/app-grid.jpg
git commit -m "feat(hero): rebuild draggable photo collage with the new title"
```

---

## Task 5: 演示区块

**Files:**
- Modify: `src/landing/DemoWindow.tsx`
- Modify: `src/landing/i18n.ts`（demo 新增 key）

**Interfaces:**
- Consumes: `SectionHead`, `Reveal`, `ImageFilterDemo`
- Produces: `demo.eyebrow / demo.title / demo.windowLabel / demo.caption`

- [ ] **Step 1: 重写 DemoWindow**

```tsx
<section id="demo" className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]">
  <div className="mx-auto max-w-6xl">
    <Reveal>
      <SectionHead eyebrow={t.demo.eyebrow} title={t.demo.title} />
    </Reveal>

    <Reveal delay={0.06} className="mt-10">
      <div className="overflow-hidden rounded-window border border-line bg-surface">
        <div className="flex h-11 items-center justify-between border-b border-line px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#3a3a3a]" />
            <span className="size-2 rounded-full bg-[#3a3a3a]" />
            <span className="size-2 rounded-full bg-[#3a3a3a]" />
          </div>
          <span className="font-landing-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
            {t.demo.windowLabel}
          </span>
          <span className="font-landing-mono text-[10.5px] text-ink-faint">{t.demo.langHint}</span>
        </div>
        <div className="p-2">
          <ImageFilterDemo className="w-full" />
        </div>
      </div>
    </Reveal>

    <p className="mt-4 font-landing-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">
      {t.demo.caption}
    </p>
  </div>
</section>
```

删除 `BorderGlow` import 与包裹层。

- [ ] **Step 2: 补 i18n**

```ts
demo: {
  langHint: "中 / EN",
  hint: "点击照片体验选片流程",
  eyebrow: "LIVE DEMO",
  title: "不用安装，先筛几张。",
  windowLabel: "ImageFilter / demo",
  caption: "真实界面 · 可交互",
};
```

英文：

```ts
demo: {
  langHint: "中 / EN",
  hint: "Click a photo to try the culling flow.",
  eyebrow: "LIVE DEMO",
  title: "Try it before you install.",
  windowLabel: "ImageFilter / demo",
  caption: "Real UI · interactive",
};
```

- [ ] **Step 3: 构建 + 交互检查**

Run: `npm run build`
Expected: PASS。

Run: `npm run dev`，打开 `#demo`：点击照片能选中/取消；demo 内滚动/设置可操作；无控制台报错。

- [ ] **Step 4: 提交**

```bash
git add src/landing/DemoWindow.tsx src/landing/i18n.ts
git commit -m "feat(demo): frame the live demo in a monochrome window"
```

---

## Task 6: 对比区块

**Files:**
- Modify: `src/landing/Compare.tsx`
- Modify: `src/landing/i18n.ts`（compare.eyebrow）

**Interfaces:**
- Consumes: `SectionHead`, `Card`, `Reveal`
- Produces: `compare.eyebrow`

- [ ] **Step 1: 重写 Compare**

```tsx
<section id="compare" className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]">
  <div className="mx-auto max-w-6xl">
    <Reveal>
      <SectionHead eyebrow={t.compare.eyebrow} title={t.compare.title} subtitle={t.compare.subtitle} />
    </Reveal>

    <div className="mt-10 grid gap-4 lg:grid-cols-2">
      <Reveal delay={0.06}>
        <Card className="h-full p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-white/45">
              <X className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-body font-medium text-ink-muted">{t.compare.manual}</p>
              <p className="text-caption text-ink-faint">{t.compare.manualCaption}</p>
            </div>
          </div>
          <ul className="mt-8 space-y-5">
            {t.compare.rows.map((row, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 font-landing-mono text-[10.5px] tabular-nums text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body leading-[1.65] text-ink-muted">{row.manual}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>

      <Reveal delay={0.12}>
        <Card className="h-full border-line-strong bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-data/10 text-data">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-body font-medium text-ink">{t.compare.imagefilter}</p>
              <p className="text-caption text-ink-faint">{t.compare.imagefilterCaption}</p>
            </div>
          </div>
          <ul className="mt-8 space-y-5">
            {t.compare.rows.map((row, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 font-landing-mono text-[10.5px] tabular-nums text-data/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body leading-[1.65] text-ink">{row.app}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </div>
  </div>
</section>
```

删除 `@icon-park`、`motion` 直用与 VS 圆。

- [ ] **Step 2: 补 i18n**

```ts
compare: {
  eyebrow: "工作流差异",
  // …
}
```

英文 `eyebrow: "Workflow difference"`。

- [ ] **Step 3: 构建 + 检查**

Run: `npm run build`
Expected: PASS。打开 `#compare`：两列在 1024 以上并排，移动端单列，emerald 只出现在勾/编号。

- [ ] **Step 4: 提交**

```bash
git add src/landing/Compare.tsx src/landing/i18n.ts
git commit -m "feat(compare): rebuild comparison as two hairline cards"
```

---

## Task 7: 特性区块

**Files:**
- Modify: `src/landing/Features.tsx`
- Modify: `src/landing/i18n.ts`（仅当需要新 key；默认沿用现有）

**Interfaces:**
- Consumes: `SectionHead`, `Card`, `Reveal`
- Produces: 无新接口

- [ ] **Step 1: 重写 Features**

```tsx
const icons = [Image, Star, Sparkles, Folder, FileCheck2, HardDrive];

<section id="features" className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]">
  <div className="mx-auto max-w-6xl">
    <Reveal>
      <SectionHead eyebrow={t.features.eyebrow} title={t.features.title} subtitle={t.features.subtitle} />
    </Reveal>

    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {t.features.items.map((feature, index) => {
        const Icon = icons[index];
        return (
          <Reveal key={feature.title} delay={index * 0.04}>
            <Card className="h-full p-6 transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.015]">
              <div className="flex items-start justify-between gap-4">
                <Icon className="size-5 text-white/55" aria-hidden="true" />
                <span className="font-landing-mono text-[10.5px] tabular-nums text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-title font-medium text-ink">{feature.title}</h3>
              <p className="mt-2 text-body leading-[1.65] text-ink-muted">{feature.description}</p>
            </Card>
          </Reveal>
        );
      })}
    </div>
  </div>
</section>
```

删除 `BorderGlow`、`SpotlightCard`、`@icon-park`。

- [ ] **Step 2: 构建 + 检查**

Run: `npm run build`
Expected: PASS。3×2 网格；hover 只变边框/底色；无发光。

- [ ] **Step 3: 提交**

```bash
git add src/landing/Features.tsx
git commit -m "feat(features): rebuild feature grid with mono numbering"
```

---

## Task 8: 工作流区块

**Files:**
- Modify: `src/landing/Workflow.tsx`

**Interfaces:**
- Consumes: `SectionHead`, `Reveal`
- Produces: 无新接口

- [ ] **Step 1: 重写 Workflow**

```tsx
<section id="workflow" className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]">
  <div className="mx-auto max-w-6xl">
    <Reveal>
      <SectionHead eyebrow={t.workflow.eyebrow} title={t.workflow.title} subtitle={t.workflow.subtitle} />
    </Reveal>

    <div className="mt-10 grid gap-8 lg:grid-cols-3">
      {t.workflow.steps.map((step, index) => (
        <Reveal key={step.title} delay={index * 0.06}>
          <article className="border-t border-line pt-6">
            <span className="font-landing-mono text-[40px] leading-none tracking-[-0.04em] text-white/20">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 font-display text-[18px] font-medium text-ink">{step.title}</h3>
            <p className="mt-2 max-w-sm text-body leading-[1.65] text-ink-muted">{step.description}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

删除 `@icon-park` 图标、渐变圆与彩线。

- [ ] **Step 2: 构建 + 检查**

Run: `npm run build`
Expected: PASS。移动端三步纵排，顶部细线；桌面三列。

- [ ] **Step 3: 提交**

```bash
git add src/landing/Workflow.tsx
git commit -m "feat(workflow): rebuild steps with mono numerals and hairlines"
```

---

## Task 9: 下载区块

**Files:**
- Modify: `src/landing/Download.tsx`

**Interfaces:**
- Consumes: `SectionHead`, `Card`, `Reveal`, `buttonStyles`
- Produces: 无新接口；**保留** `CN_DOWNLOADS`、`ASSET_MATCHERS`、`LatestRelease`、`fetch` 逻辑

- [ ] **Step 1: 保留数据与 fetch 代码**

以下代码**原样保留**，只换渲染：
- `REPOSITORY` / `RELEASES_PAGE` / `LATEST_RELEASE_API`
- `CN_DOWNLOADS`（蓝奏云 1.0.0 数据，不改）
- `ASSET_MATCHERS`
- `LatestRelease` / `ReleaseAsset` / `platformIcons`
- `useEffect` 里对 `/releases/latest` 的请求与 `cancelled` 清理
- `versionLabel = latest?.tag ? latest.tag : failed ? t.download.fetchFailed : t.download.loading`

- [ ] **Step 2: 重写渲染**

```tsx
<section id="download" className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]">
  <div className="mx-auto max-w-6xl">
    <Reveal>
      <SectionHead
        eyebrow={t.download.eyebrow}
        title={t.download.title}
        actions={
          <span
            aria-live="polite"
            className="mb-1 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-landing-mono text-[10.5px] tabular-nums text-ink-faint"
          >
            {versionLabel}
          </span>
        }
      />
    </Reveal>

    <div className="mt-10 grid gap-4 lg:grid-cols-3">
      {t.download.cards.map((card, index) => {
        const Icon = platformIcons[index];
        const asset = latest?.assets[index];
        const href = asset?.url || RELEASES_PAGE;
        const fileName = asset?.name ?? "—";
        const recommended = index === 0;

        return (
          <Reveal key={card.platform} delay={index * 0.05}>
            <Card
              className={cn(
                "flex h-full flex-col p-6",
                recommended && "border-line-strong bg-surface",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <Icon className="size-5 text-white/55" aria-hidden="true" />
                {card.badge ? (
                  <span className={cn(
                    "rounded-full border px-2.5 py-1 font-landing-mono text-[10px] uppercase tracking-[0.08em]",
                    recommended ? "border-data/30 bg-data/10 text-data" : "border-line text-ink-faint",
                  )}>
                    {card.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-5 font-display text-title font-medium text-ink">{card.platform}</h3>
              <p className="mt-2 truncate font-landing-mono text-mono-sm text-ink-muted" title={fileName}>
                {fileName}
              </p>
              <p className="mt-3 text-body leading-[1.65] text-ink-muted">{card.description}</p>

              <div className="mt-auto pt-7">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({
                    variant: recommended ? "solid" : "ghost",
                    size: "md",
                    className: "w-full",
                  })}
                >
                  {card.action}
                </a>
              </div>
            </Card>
          </Reveal>
        );
      })}
    </div>

    {/* 国内直链 */}
    <Reveal delay={0.15} className="mt-10">
      <button
        type="button"
        onClick={() => setCnOpen((o) => !o)}
        aria-expanded={cnOpen}
        className={buttonStyles({ variant: "ghost", size: "md", className: "gap-2.5 px-5" })}
      >
        <DownloadCloud className="size-4" aria-hidden="true" />
        {t.download.cnDownload}
        <ChevronDown className={cn("size-4 transition-transform duration-200", cnOpen && "rotate-180")} aria-hidden="true" />
      </button>

      {cnOpen && (
        <div className="mt-5 max-w-lg rounded-card border border-line bg-surface-sunken p-4">
          {CN_DOWNLOADS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0 hover:text-white"
            >
              <span className="truncate font-landing-mono text-mono-sm text-ink-muted">{item.name}</span>
              {item.password ? (
                <span className="shrink-0 text-caption text-ink-faint">
                  {t.download.password} {item.password}
                </span>
              ) : null}
            </a>
          ))}
          <p className="mt-3 border-t border-line pt-3 text-caption text-ink-faint">
            {t.download.msiNote}{" "}
            <a href={RELEASES_PAGE} target="_blank" rel="noreferrer" className="text-ink underline-offset-2 hover:underline">
              GitHub Releases
            </a>
          </p>
        </div>
      )}
    </Reveal>

    <div className="mt-8">
      <a href={RELEASES_PAGE} target="_blank" rel="noreferrer" className="text-body text-ink-muted hover:text-ink">
        {t.download.releases}
      </a>
    </div>
  </div>
</section>
```

> 按钮外层用 `mt-auto pt-7` 推到卡片底部；`Card` 本身是 `flex flex-col`，不要给 `<a>` 加 `mt-auto` 与内边距混用。

- [ ] **Step 3: 补 i18n `download.password`**

```ts
download: {
  // …现有 key
  password: "密码",
}
```

英文 `password: "Password"`。类型 `LandingMessages.download` 同步加 `password: string`。

- [ ] **Step 4: 构建 + 下载态检查**

Run: `npm run build`
Expected: PASS。

打开 `#download`：
- 版本徽章先显示「获取最新版…」，随后显示 GitHub 最新 tag；
- 推荐卡白底按钮，其余 ghost；
- 国内直链展开后能看到两条蓝奏云文件名与密码；
- 断网/被墙时显示「版本获取失败」，按钮落到 Releases 页。

- [ ] **Step 5: 提交**

```bash
git add src/landing/Download.tsx src/landing/i18n.ts
git commit -m "feat(download): restyle installers while keeping runtime release fetch"
```

---

## Task 10: FAQ 区块

**Files:**
- Create: `src/landing/FAQ.tsx`
- Modify: `src/landing/LandingPage.tsx`（在 Download 后插入 `<FAQ lang={lang} />`）
- Modify: `src/landing/i18n.ts`

**Interfaces:**
- Consumes: `SectionHead`, `Reveal`
- Produces: `faq: { eyebrow, title, items: { q, a }[] }`

- [ ] **Step 1: 写 FAQ**

```tsx
import { Plus } from "lucide-react";
import { cn } from "./lib/cn";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

export default function FAQ({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <section id="faq" className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="border-t border-line">
            {t.faq.items.map((item, index) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-landing-mono text-[10.5px] tabular-nums text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-ink">{item.q}</span>
                  <Plus
                    className="size-4 shrink-0 translate-y-0.5 text-ink-faint transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-prose pb-5 pl-[30px] text-body leading-[1.7] text-ink-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 补 i18n（按 spec §4.8 的 4 条问答）**

```ts
faq: {
  eyebrow: "FAQ",
  title: "常见问题",
  items: [
    { q: "照片会被上传吗？", a: "不会。解码、AI 检测与导入都在本机完成；软件只在检查更新时访问 GitHub。手机图库服务只在局域网内监听，默认关闭。" },
    { q: "支持哪些照片格式？", a: "RAW 支持 ARW / CR2 / CR3 / NEF / DNG / ORF / RW2 / RAF / PEF / SRW；同时可浏览 JPG / PNG / GIF / BMP / TIFF / WebP / HEIC / HEIF，以及 MP4 / MOV / AVI / MKV 的视频缩略图。DNG 使用内置专用解码器。" },
    { q: "可以商用或二次开发吗？", a: "可以。项目采用 MIT 许可证，源码公开；保留版权与许可声明即可使用、修改和分发。" },
    { q: "macOS 能用吗？", a: "可以在 Releases 下载 Universal 安装包（Intel 与 Apple Silicon）。但 macOS 版尚未充分实机验证，遇到问题请附系统版本与复现步骤提交 Issue。Lightroom 衔接与 Mica 毛玻璃仅 Windows。" },
  ],
},
```

英文：

```ts
faq: {
  eyebrow: "FAQ",
  title: "Common questions",
  items: [
    { q: "Are my photos uploaded anywhere?", a: "No. Decoding, AI detection, and imports all run on your machine; the app only contacts GitHub to check for updates. The mobile gallery service listens on your LAN only and is off by default." },
    { q: "Which formats are supported?", a: "RAW: ARW, CR2, CR3, NEF, DNG, ORF, RW2, RAF, PEF, SRW. Also JPG, PNG, GIF, BMP, TIFF, WebP, HEIC, HEIF, plus video thumbnails for MP4, MOV, AVI, MKV. DNG has a dedicated built-in decoder." },
    { q: "Can I use it commercially or fork it?", a: "Yes. ImageFilter is MIT-licensed and the source is public; keep the copyright and license notice when you use, modify, or redistribute it." },
    { q: "Does it run on macOS?", a: "Yes — a Universal build (Intel and Apple Silicon) is on Releases. That said, the macOS build has not been thoroughly tested on real hardware; please report issues with your OS version and repro steps. Lightroom hand-off and Mica glass are Windows-only." },
  ],
},
```

- [ ] **Step 3: 插入 LandingPage**

在 `<Download lang={lang} />` 后加 `<FAQ lang={lang} />`，并补 import。

- [ ] **Step 4: 构建 + 检查**

Run: `npm run build`
Expected: PASS。点击每条 FAQ 展开/收起；键盘 Tab + Enter 可用；中英切换无缺失。

- [ ] **Step 5: 提交**

```bash
git add src/landing/FAQ.tsx src/landing/LandingPage.tsx src/landing/i18n.ts
git commit -m "feat(faq): add four factual questions after download"
```

---

## Task 11: 页脚

**Files:**
- Modify: `src/landing/Footer.tsx`
- Modify: `src/landing/i18n.ts`（footer 分组标签）

**Interfaces:**
- Consumes: `cn`
- Produces: `footer.product / footer.resources / footer.contact`

- [ ] **Step 1: 重写 Footer**

保留常量：`REPOSITORY_URL`、`DOUYIN_URL`、`CONTACT_EMAIL`、`DouyinIcon`。

```tsx
<footer className="border-t border-line bg-canvas px-6 pb-8 pt-14 max-hero:px-[18px]">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,.6fr))]">
      <div>
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="size-8" />
          <span className="font-display text-[15px] font-semibold text-ink">ImageFilter</span>
        </a>
        <p className="mt-3 max-w-xs text-body text-ink-muted">{t.footer.tagline}</p>
      </div>

      <FooterColumn title={t.footer.product} links={[
        { href: "#features", label: t.nav.features },
        { href: "#compare", label: t.nav.compare },
        { href: "#workflow", label: t.nav.workflow },
        { href: "#download", label: t.nav.download },
        { href: "#faq", label: t.faq.title },
      ]} />

      <FooterColumn title={t.footer.resources} links={[
        { href: REPOSITORY_URL, label: t.footer.github, external: true },
        { href: `${REPOSITORY_URL}/releases`, label: "GitHub Releases", external: true },
        { href: `${REPOSITORY_URL}/blob/master/LICENSE`, label: t.footer.mit, external: true },
      ]} />

      <FooterColumn title={t.footer.contact} links={[
        { href: DOUYIN_URL, label: t.footer.douyin, external: true },
        { href: `mailto:${CONTACT_EMAIL}`, label: t.footer.email },
        { href: "#demo", label: t.footer.backToDemo },
      ]} />
    </div>

    <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-landing-mono text-[10.5px] tracking-[0.04em] text-ink-faint">{t.footer.copyright}</p>
      <p className="font-landing-mono text-[10.5px] tracking-[0.04em] text-ink-faint">MIT · ImageFilter</p>
    </div>
  </div>
</footer>
```

`FooterColumn` 小函数放在同文件：

```tsx
function FooterColumn({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <p className="font-landing-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-body text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

删除 `@icon-park` 的 Github / EmailPush import 与 `DouyinIcon` 组件（GitHub、抖音、邮件三个链接仍以文字保留，不丢功能）。

- [ ] **Step 2: 补 i18n**

```ts
footer: {
  // …现有 key
  product: "产品",
  resources: "资源",
  contact: "联系",
}
```

英文 `product: "Product"`, `resources: "Resources"`, `contact: "Contact"`。

- [ ] **Step 3: 构建 + 检查**

Run: `npm run build`
Expected: PASS。所有原有链接（GitHub/抖音/邮件/MIT/回到演示）仍在；移动端 3 列折成单列。

- [ ] **Step 4: 提交**

```bash
git add src/landing/Footer.tsx src/landing/i18n.ts
git commit -m "feat(footer): rebuild footer as three link columns"
```

---

## Task 12: demo 同步 1.1.2 → 1.3.0

**Files:**
- Modify: `src/demo/ui/**`（只由同步脚本覆盖）
- Modify: `src/demo/app-version.ts`
- Modify: `src/demo/mock/tauri-mock.ts`
- Modify: `src/demo/mock/tauri-types.d.ts`
- Modify: `src/demo/index.css`
- Modify: 必要时 `src/demo/ImageFilterDemo.tsx`（App 必传参数不变则不动）

**Interfaces:**
- Consumes: 主仓库 `A:\tenent\src`（只读）
- Produces: demo 显示版本 `1.3.0`；新增 16 个 mock 命令；`@tauri-apps/api/event` 的 `listen` mock/声明

- [ ] **Step 1: 确认主仓库没有未提交的 src 改动**

Run: `git -C A:/tenent status --short src`
Expected: 空输出（只有 `android/` 在改）。若有 `src/` 改动，停止并询问用户，不要复制半成品。

- [ ] **Step 2: 按 README 同步**

```powershell
cd A:\ImageFilter-Website
$src = "A:\tenent\src"; $dst = "src\demo\ui";
Get-ChildItem $src -Recurse -File | Where-Object { $_.Name -notin @("main.tsx","index.css","vite-env.d.ts") } | ForEach-Object {
  $rel = $_.FullName.Substring($src.Length).TrimStart('\');
  $target = Join-Path $dst $rel;
  New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null;
  Copy-Item $_.FullName $target -Force;
}
Remove-Item "$dst\hooks\use-mobile.ts" -ErrorAction SilentlyContinue
```

- [ ] **Step 3: 改版本号**

```ts
// src/demo/app-version.ts
export const APP_VERSION = "1.3.0";
```

- [ ] **Step 4: 补 16 个 mock 命令**

在 `src/demo/mock/tauri-mock.ts` 的 `handlers` 对象里加（放在 Phase 7 后）：

```ts
  // ---- Phase 8 · 图库服务 / mDNS 配对（1.3.0）----
  // 设置面板打开就会读这几项；mock 对未知命令直接 throw，缺一个面板就报错。
  get_server_status: async () => ({
    ...demoServerStatus,
    shares: [...demoServerStatus.shares],
  }),

  get_server_network_hints: async () => ({
    lan: [{ address: "192.168.1.10", interface: "Wi-Fi" }],
    publicIpv4: [],
    profile: "private",
    firewallHint: "",
  }),

  get_server_pairing_qr: async () => null,

  rotate_server_token: async () => {
    demoServerStatus.token = `demo-${Date.now().toString(36)}`;
  },

  add_share: async (a) => {
    const path = String(a.path ?? "");
    if (path && !demoServerStatus.shares.includes(path)) demoServerStatus.shares.push(path);
    return [...demoServerStatus.shares];
  },

  remove_share: async (a) => {
    const path = String(a.path ?? "");
    demoServerStatus.shares = demoServerStatus.shares.filter((item) => item !== path);
    return [...demoServerStatus.shares];
  },

  set_server_enabled: async (a) => {
    const enabled = Boolean(a.enabled);
    demoServerStatus.enabled = enabled;
    demoServerStatus.running = enabled;
    demoServerStatus.port = enabled ? 47832 : 0;
    demoServerStatus.url = enabled ? "http://192.168.1.10:47832" : "";
    demoServerStatus.lastError = null;
  },

  set_server_read_only: async (a) => {
    demoServerStatus.readOnly = Boolean(a.readOnly);
  },

  get_server_clients: async () => [],

  open_pairing_window: async () => {
    demoPairingOpen = true;
    return { expiresAt: Date.now() + 300_000 };
  },

  close_pairing_window: async () => {
    demoPairingOpen = false;
  },

  pairing_status: async () => ({
    open: demoPairingOpen,
    pending: [],
    paired: [],
  }),

  approve_pairing: async () => undefined,
  deny_pairing: async () => undefined,
  forget_paired_device: async () => undefined,

  // macOS 权限引导（demo 里平台是 Windows，正常不会显示；兜底 no-op）
  open_macos_privacy_settings: async () => undefined,
```

在 `handlers` 之前加模块级状态：

```ts
let demoServerStatus = {
  running: false,
  port: 0,
  url: "",
  token: "demo-token",
  shares: [] as string[],
  enabled: false,
  lastError: null as string | null,
  publicAckAt: null as number | null,
  readOnly: false,
};
let demoPairingOpen = false;
```

在 `getCurrentWindow` 附近加 `listen` 导出：

```ts
// ---------------------------------------------------------------------------
// @tauri-apps/api/event（1.3.0 起配对事件走动态 import）
// ---------------------------------------------------------------------------

export async function listen<T>(
  _event: string,
  _handler: (event: { payload: T }) => void,
): Promise<() => void> {
  return () => {};
}
```

- [ ] **Step 5: 补 `@tauri-apps/api/event` 类型声明**

在 `src/demo/mock/tauri-types.d.ts` 末尾加：

```ts
declare module "@tauri-apps/api/event" {
  export interface Event<T> {
    payload: T;
  }
  export function listen<T>(
    event: string,
    handler: (event: Event<T>) => void,
  ): Promise<() => void>;
}
```

- [ ] **Step 6: 补 demo 语义色 token（README 五项之外的第六项）**

在 `src/demo/index.css` 的 `:root` 里加：

```css
  --brand: var(--color-emerald-500);
  --brand-hover: var(--color-emerald-400);
  --brand-strong: var(--color-emerald-600);
  --danger: var(--color-red-400);
  --danger-strong: var(--color-red-600);
  --warning: var(--color-amber-400);
  --info: var(--color-sky-400);
```

在 `@theme inline` 里加：

```css
  --color-brand: var(--brand);
  --color-brand-hover: var(--brand-hover);
  --color-brand-strong: var(--brand-strong);
  --color-danger: var(--danger);
  --color-danger-strong: var(--danger-strong);
  --color-warning: var(--warning);
  --color-info: var(--info);
```

- [ ] **Step 7: 构建，修所有同步落下的类型/导入错误**

Run: `npm run build`
Expected: 第一遍大概率报错。常见原因与修法：
- `Cannot find module '@tauri-apps/api/event'` → 检查 Step 5 声明；
- `unknown command: xxx`（运行时）→ 回 Step 4 补 handler；
- 新组件引用的 `text-brand` 没颜色 → 检查 Step 6；
- 新组件需要的 `@/lib/...` 文件缺失 → 同步脚本应已复制；不要手改 `demo/ui`，从主仓库重新复制该文件。

重复直到 `npm run build` PASS。

- [ ] **Step 8: 实机点设置面板与 demo**

Run: `npm run dev`

检查：
- 打开 demo → 设置（齿轮）→ 「图库服务」面板能渲染，控制台无 `ReferenceError` / `unknown command`；
- 配对窗口按钮不崩（可以显示空状态）；
- demo 内：点照片、星级、导入历史、命名方案、主题切换仍正常；
- 版本号显示 `1.3.0`（设置里）。

- [ ] **Step 9: 提交**

```bash
git add src/demo
git commit -m "chore(demo): sync main app 1.3.0 and mock the new commands"
```

---

## Task 13: 验收、截图、文档

**Files:**
- Modify: `docs/官网改版-交接.md`
- Modify: `README.md`（改版状态段落）
- Create: `.scratch/proto/verify.mjs`（gitignored，临时脚本）

**Interfaces:**
- 无代码接口；产出验收证据与文档更新

- [ ] **Step 1: 三条命令全绿**

```bash
cd A:/ImageFilter-Website
npm run build
npm run lint
npx vitest run
```

Expected：三条全部 PASS，记录输出摘要。

- [ ] **Step 2: 启动 dev server 并跑断点脚本**

```bash
cd A:/ImageFilter-Website
npm run dev -- --host 127.0.0.1
```

> 用后台任务启动 dev server（`run_in_background`），不要阻塞验收步骤；确认 `http://127.0.0.1:5173/` 可访问后再跑脚本。

另开一个终端，用 `.scratch/proto` 里已有的 Playwright：

```js
// .scratch/proto/verify.mjs
import { chromium } from "playwright-core";

const sizes = [390, 768, 1024, 1280, 1440, 1920];
const browser = await chromium.launch({ channel: "msedge", headless: true });
for (const width of sizes) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `A:/ImageFilter-Website/.design-audit/redesign-${width}.png`, fullPage: true });
  console.log(width, "overflow:", overflow, "errors:", errors);
  await page.close();
}
await browser.close();
```

Run: `node .scratch/proto/verify.mjs`
Expected：每个宽度 `overflow <= 0`；`errors` 为空（GitHub API 被墙的失败不算，但不应有 React 异常）。

- [ ] **Step 3: 功能逐项点过**

手动或脚本检查：
- 导航 4 锚点、Star、语言切换、下载按钮；
- 首屏拖拽 + 提示消失；
- demo 点照片、星级、设置面板、导入历史、命名方案；
- 对比 / 特性 / 工作流可见；
- 下载版本号、国内直链展开、Releases 链接；
- FAQ 4 条展开；
- 页脚 5 类链接。

- [ ] **Step 4: 对比度抽查**

用浏览器 DevTools 或脚本取 computed color/background，确认：
- 正文 `ink-muted` 在黑底 ≥ 4.5:1；
- 微标签 `ink-faint` ≥ 4.5:1；
- emerald `data` 在黑底 ≥ 4.5:1；
- 按钮白底黑字 ≥ 4.5:1。

若某项不达标，调整到 `white/55` 或提高 emerald 亮度，不要只靠字号规避。

- [ ] **Step 5: 更新交接文档与 README**

`docs/官网改版-交接.md`：
- 状态改为「P1–P3 已完成，P4 验收中/已验收」；
- 列出实际完成项、未完成项（真实照片待替换、CN_DOWNLOADS 仍 1.0.0、vite base 可选）；
- 记录 demo 已同步 1.3.0、新增 FAQ、照片占位位置。

`README.md`：
- 把「目前只完成首屏原型，正式页面尚未改动」改成当前状态；
- 保留 `demo/ui` 同步规则与五項检查，补第 6 项 CSS token。

- [ ] **Step 6: 提交文档**

```bash
git add docs/官网改版-交接.md README.md docs/superpowers
git commit -m "docs(website): record redesign acceptance and demo 1.3.0 sync"
```

- [ ] **Step 7: 最终检查**

```bash
git status --short
git log --oneline -12
```

Expected：工作区干净；所有提交在本地；**没有执行 `git push`**。

---

## Self-Review

**Spec coverage:**
- §3 token/字体 → Task 1；基础组件 → Task 2。
- §4.1 Nav → Task 3；§4.2 Hero → Task 4；§4.3 Demo → Task 5；§4.4 Compare → Task 6；§4.5 Features → Task 7；§4.6 Workflow → Task 8；§4.7 Download → Task 9；§4.8 FAQ → Task 10；§4.9 Footer → Task 11。
- §5 拼贴 → Task 4；§6 i18n → 分散在各区块任务；§7 demo 同步 → Task 12；§8 可访问性/性能 → Task 1（reduced motion/字体）与 Task 13（对比度/断点）；§9 验收 → Task 13。
- §10 风险 → 真实照片占位在 Task 4，CN_DOWNLOADS 保留在 Task 9，CSS token 在 Task 12，拖拽提示在 Task 4。

**Placeholder scan:** 无 `TBD` / `TODO` / 「稍后补」；每个代码步骤都有可执行片段。

**Type consistency:** `buttonStyles`、`SectionHead`、`Card`、`Reveal` 的签名在 Task 2 定义，后续任务按同一签名使用；`hero.title` 在 Task 4 改为对象后，所有引用同任务内更新；`faq` 在 Task 10 定义并由 Footer 的 `t.faq.title` 引用。
