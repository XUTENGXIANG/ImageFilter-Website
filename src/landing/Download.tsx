import { useState } from "react";
import BorderGlow from "@/components/BorderGlow";
import LineSidebar from "@/components/LineSidebar";
import SpecularButton from "@/components/SpecularButton";
import SpotlightCard from "@/components/SpotlightCard";
import { AnimatePresence, motion } from "motion/react";
import { Apple, ChevronDown, DownloadCloud, Monitor } from "lucide-react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const RELEASES_PAGE = "https://github.com/XUTENGXIANG/ImageFilter/releases";

// ─── 国内直链（蓝奏云）────────────────────────────────────────
// 手动添加直链的方法：
//   1. 在蓝奏云上传新版本安装包，复制分享链接
//   2. 在下面的数组中新增一条记录（建议按平台排序）：
//      { name: "文件名（页面展示用，建议带版本号）", href: "蓝奏云分享链接", password: "访问密码(无则省略)" }
//   3. 列表会按数组顺序自动渲染，点击即在新标签页打开
// 注意：name 会直接展示在页面上，版本升级后记得同步更新文件名。
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

const fileNames = [
  "ImageFilter_1.0.0_x64-setup.exe",
  "ImageFilter_1.0.0_x64_zh-CN.msi",
  "ImageFilter_1.0.0_universal.dmg",
];

const downloadLinks = [
  "https://github.com/XUTENGXIANG/ImageFilter/releases/download/v1.0/ImageFilter_1.0.0_x64-setup.exe",
  "https://github.com/XUTENGXIANG/ImageFilter/releases/download/v1.0/ImageFilter_1.0.0_x64_zh-CN.msi",
  "https://github.com/XUTENGXIANG/ImageFilter/releases/download/v1.0/ImageFilter_1.0.0_universal.dmg",
];

const platformIcons = [Monitor, Monitor, Apple];

interface DownloadProps {
  lang: Lang;
}

export default function Download({ lang }: DownloadProps) {
  const t = translations[lang];
  const [cnOpen, setCnOpen] = useState(false);

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
            <span className="ml-3 inline-block translate-y-[-0.35rem] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tabular-nums text-white/55">
              {t.download.version}
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.download.cards.map((card, index) => {
            const Icon = platformIcons[index];
            const fileName = fileNames[index];
            const href = downloadLinks[index];

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
