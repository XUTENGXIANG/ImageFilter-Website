// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { useEffect, useState } from "react";
import { Apple, ChevronDown, DownloadCloud, Monitor } from "lucide-react";
import Card from "./components/Card";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import SplitFlapText from "./components/SplitFlapText";
import { buttonStyles } from "./components/buttonStyles";
import type { Lang } from "./i18n";
import { translations } from "./i18n";
import { cn } from "./lib/cn";

const REPOSITORY = "XUTENGXIANG/ImageFilter";
const RELEASES_PAGE = `https://github.com/${REPOSITORY}/releases`;
const LATEST_RELEASE_API = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;

// ─── 国内直链（蓝奏云）────────────────────────────────────────
// 手动添加直链的方法：
//   1. 在蓝奏云上传新版本安装包，复制分享链接
//   2. 在下面的数组中新增一条记录（建议按平台排序）：
//      { name: "文件名（页面展示用，建议带版本号）", href: "蓝奏云分享链接", password: "访问密码(无则省略)" }
//   3. 列表会按数组顺序自动渲染，点击即在新标签页打开
// 注意：这一份是**手动**的 —— 走 GitHub 的三张卡片已经自动取最新版了，这里不会跟着变。
// 换了新安装包就得自己重传蓝奏云、把 name 里的版本号与 password 一起改掉。
const CN_DOWNLOADS = [
  {
    name: "ImageFilter_1.0.0_x64-setup.exe",
    password: "fih2",
    href: "https://wwbny.lanzoue.com/iO3ka420hdmj?webpage=AjMAYF47UjBVNlQ2BmECM1M9AjBScQU0AjVWZ1M7UmcDM1o_aCmQAbQgiUzQ_c",
  },
  {
    name: "ImageFilter_1.0.0_universal.dmg",
    password: "hx0o",
    href: "https://wwbny.lanzoue.com/i6bKM420hclc?webpage=BDVSMghtDmxVNgJgBmFWZwFvU2ECIQc2ADdUZQJqWm9XZwJnDWBTNVJ4AmU_c",
  },
];

/** 三张卡片（= t.download.cards 的顺序）各自从 release 附件里挑哪一个 */
const ASSET_MATCHERS: ((name: string) => boolean)[] = [
  (n) => /-setup\.exe$/i.test(n), // NSIS 安装包
  (n) => /\.msi$/i.test(n), // MSI
  (n) => /\.dmg$/i.test(n), // macOS
];

interface ReleaseAsset {
  name: string;
  url: string;
}

interface LatestRelease {
  tag: string;
  /** 与 ASSET_MATCHERS / cards 同序；某个平台没发布就是 undefined */
  assets: (ReleaseAsset | undefined)[];
}

const platformIcons = [Monitor, Monitor, Apple];

interface DownloadProps {
  lang: Lang;
}

export default function Download({ lang }: DownloadProps) {
  const t = translations[lang];
  const [cnOpen, setCnOpen] = useState(false);
  // 版本号不再写死在页面里：打开页面时去问一次 GitHub 的最新正式版，附件直链也从那里取。
  // 这样发新版不用再回来改这 3 行 —— 之前那三条写死的链接停在 v1.0.0 上，落后了三个版本。
  const [latest, setLatest] = useState<LatestRelease | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(LATEST_RELEASE_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (cancelled) return;
        const raw: { name?: unknown; browser_download_url?: unknown }[] = Array.isArray(data?.assets)
          ? data.assets
          : [];
        const pick = (test: (name: string) => boolean): ReleaseAsset | undefined => {
          const hit = raw.find((a) => typeof a?.name === "string" && test(a.name));
          if (!hit || typeof hit.name !== "string") return undefined;
          return { name: hit.name, url: String(hit.browser_download_url ?? "") };
        };
        setLatest({
          tag: typeof data?.tag_name === "string" ? data.tag_name : "",
          assets: ASSET_MATCHERS.map(pick),
        });
      })
      .catch(() => {
        // 取不到就照实说，并把三张卡片的按钮退回 Releases 页（不留死链，也不假装有版本号）
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const versionLabel = latest?.tag
    ? latest.tag
    : failed
      ? t.download.fetchFailed
      : t.download.loading;

  return (
    <section
      id="download"
      className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
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
            <div className="shrink-0 pb-1" aria-hidden="true">
              <SplitFlapText
                words={lang === "zh" ? ["下载", "即刻使用"] : ["DOWNLOAD", "USE NOW"]}
                flipDuration={0.12}
                stagger={0.05}
                cycleDelay={2600}
                charset="alphanumeric"
                flipsPerChar={6}
                order="left"
                align="center"
                tileStyle="board"
                tileColor="#1c1c1c"
                textColor="#fafafa"
                glare={0}
                depth={0.6}
                tileRadius={9}
                gap={5}
                fontSize={34}
                loop
                padTo={lang === "zh" ? 4 : 8}
                intro
                className="download-flap"
              />
            </div>
          </div>
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
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 font-landing-mono text-[10px] uppercase tracking-[0.08em]",
                          recommended
                            ? "border-data/30 bg-data/10 text-data"
                            : "border-line text-ink-faint",
                        )}
                      >
                        {card.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 font-display text-title font-medium text-ink">
                    {card.platform}
                  </h3>
                  <p
                    className="mt-2 truncate font-landing-mono text-mono-sm text-ink-muted"
                    title={fileName}
                  >
                    {fileName}
                  </p>
                  <p className="mt-3 text-body leading-[1.65] text-ink-muted">
                    {card.description}
                  </p>

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

        {/* 国内直链下载（蓝奏云） */}
        <Reveal delay={0.15} className="mt-10">
          <button
            type="button"
            onClick={() => setCnOpen((open) => !open)}
            aria-expanded={cnOpen}
            className={buttonStyles({ variant: "ghost", size: "md", className: "gap-2.5 px-5" })}
          >
            <DownloadCloud className="size-4" aria-hidden="true" />
            {t.download.cnDownload}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                cnOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
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
                  <span className="truncate font-landing-mono text-mono-sm text-ink-muted">
                    {item.name}
                  </span>
                  {item.password ? (
                    <span className="shrink-0 text-caption text-ink-faint">
                      {t.download.password} {item.password}
                    </span>
                  ) : null}
                </a>
              ))}
              <p className="mt-3 border-t border-line pt-3 text-caption text-ink-faint">
                {t.download.msiNote}{" "}
                <a
                  href={RELEASES_PAGE}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline-offset-2 hover:underline"
                >
                  GitHub Releases
                </a>
              </p>
            </div>
          )}
        </Reveal>

        <div className="mt-8">
          <a
            href={RELEASES_PAGE}
            target="_blank"
            rel="noreferrer"
            className="text-body text-ink-muted hover:text-ink"
          >
            {t.download.releases}
          </a>
        </div>
      </div>
    </section>
  );
}
