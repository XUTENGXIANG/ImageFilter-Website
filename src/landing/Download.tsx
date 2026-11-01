// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { useEffect, useState } from "react";
import { Apple, ArrowUpRight, Layers, Monitor } from "lucide-react";
import Card from "./components/Card";
import FlapLabel, { useFlapTrigger } from "./components/FlapLabel";
import NeumorphicDownloadButton from "./components/NeumorphicDownloadButton";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import SplitFlapText from "./components/SplitFlapText";
import { buttonStyles } from "./components/buttonStyles";
import { ASSET_MATCHERS, LATEST_RELEASE_API, RELEASES_PAGE } from "./downloadData";
import type { Lang } from "./i18n";
import { translations } from "./i18n";
import { cn } from "./lib/cn";

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
  // 版本号不再写死在页面里：打开页面时去问一次 GitHub 的最新正式版，附件直链也从那里取。
  // 这样发新版不用再回来改这 3 行 —— 之前那三条写死的链接停在 v1.0.0 上，落后了三个版本。
  const [latest, setLatest] = useState<LatestRelease | null>(null);
  const [failed, setFailed] = useState(false);
  const moreFlap = useFlapTrigger();

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
                    <NeumorphicDownloadButton
                      href={href}
                      external
                      label={card.action}
                      downloadingLabel={t.download.downloading}
                      doneLabel={t.download.downloaded}
                    />
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* 更多版本：进入 #/versions，列出全部 releases 与国内直链 */}
        <Reveal delay={0.15} className="mt-10">
          <a
            href="#/versions"
            onMouseEnter={() => moreFlap.trigger()}
            onFocus={() => moreFlap.trigger()}
            className={buttonStyles({ variant: "ghost", size: "md", className: "gap-2.5 px-5" })}
          >
            <Layers className="size-4" aria-hidden="true" />
            <FlapLabel
              label={t.download.moreVersions}
              intro={moreFlap.intro}
              flipKey={moreFlap.flipKey}
            />
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
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
