// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { useEffect, useState } from "react";
import BorderGlow from "@/components/BorderGlow";
import LineSidebar from "@/components/LineSidebar";
import SpecularButton from "@/components/SpecularButton";
import SpotlightCard from "@/components/SpotlightCard";
import { AnimatePresence, motion } from "motion/react";
import { Apple, ChevronDown, DownloadCloud, Monitor } from "lucide-react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

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

  const versionLabel = latest?.tag ? latest.tag : failed ? t.download.fetchFailed : t.download.loading;


  return (
    <section
      id="download"
      className="relative scroll-mt-28 px-4 pb-32 pt-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-normal text-violet-200/70">
            {t.download.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            {t.download.title}
            <span
              aria-live="polite"
              className="ml-3 inline-block translate-y-[-0.35rem] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tabular-nums text-white/55"
            >
              {versionLabel}
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.download.cards.map((card, index) => {
            const Icon = platformIcons[index];
            const asset = latest?.assets[index];
            // 附件还没到 / 取失败 → 按钮落到 Releases 页: 不假装有直链, 也不留死链
            const href = asset?.url || RELEASES_PAGE;
            const fileName = asset?.name ?? "—";

            return (
              <motion.article
                key={card.platform}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="h-full"
              >
                <BorderGlow
                  className="h-full rounded-2xl"
                  backgroundColor="rgba(255,255,255,0.04)"
                  borderRadius={16}
                  colors={["#a78bfa", "#22d3ee", "#7dd3fc"]}
                  glowColor="250 85 80"
                  glowRadius={28}
                  glowIntensity={0.55}
                  edgeSensitivity={22}
                  fillOpacity={0.12}
                >
                <SpotlightCard
                  className="h-full rounded-2xl bg-transparent"
                  spotlightColor="rgba(139, 92, 246, 0.18)"
                >
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-400/20 to-cyan-300/15 text-violet-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      {card.badge ? (
                        <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-medium text-cyan-100/80">
                          {card.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-white">
                      {card.platform}
                    </h3>
                    <p
                      className="mt-2 truncate font-mono text-xs text-white/65"
                      title={fileName}
                    >
                      {fileName}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {card.description}
                    </p>

                    <div className="mt-auto pt-7">
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full rounded-[18px] outline-none transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
                      >
                        <SpecularButton
                          size="md"
                          radius={16}
                          tint="#0f172a"
                          tintOpacity={0.55}
                          blur={14}
                          baseColor="#323a4d"
                          lineColor="#c7d2fe"
                          textColor="#f8fafc"
                          intensity={1.1}
                          proximity={360}
                          className="w-full"
                        >
                          {card.action}
                        </SpecularButton>
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
                </BorderGlow>
              </motion.article>
            );
          })}
        </div>

        {/* 国内直链下载（蓝奏云） */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col items-center"
        >
          <button
            type="button"
            onClick={() => setCnOpen((o) => !o)}
            aria-expanded={cnOpen}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-white/80 transition hover:border-violet-300/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
          >
            <DownloadCloud className="h-4 w-4 text-violet-200/70" />
            {t.download.cnDownload}
            <ChevronDown
              className={`h-4 w-4 text-white/40 transition-transform duration-300 ${
                cnOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {cnOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full overflow-hidden"
              >
                <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <LineSidebar
                    items={CN_DOWNLOADS.map((d) =>
                      d.password ? `${d.name}  密码：${d.password}` : d.name
                    )}
                    accentColor="#a78bfa"
                    textColor="rgba(255,255,255,0.72)"
                    markerColor="rgba(255,255,255,0.22)"
                    proximityRadius={60}
                    fontSize={0.95}
                    showIndex={false}
                    onItemClick={(index) =>
                      window.open(CN_DOWNLOADS[index].href, "_blank", "noreferrer")
                    }
                  />
                  <p className="mt-5 border-t border-white/10 pt-4 text-center text-xs text-white/45">
                    {t.download.msiNote}{" "}
                    <a
                      href={RELEASES_PAGE}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-200/80 underline-offset-2 transition hover:text-violet-100 hover:underline"
                    >
                      GitHub Releases
                    </a>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={RELEASES_PAGE}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
          >
            {t.download.releases}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
