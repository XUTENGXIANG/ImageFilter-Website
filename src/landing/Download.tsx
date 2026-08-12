import SpecularButton from "@/components/SpecularButton";
import SpotlightCard from "@/components/SpotlightCard";
import { Apple, Monitor } from "lucide-react";
import { motion } from "motion/react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const RELEASES_PAGE = "https://github.com/XUTENGXIANG/ImageFilter/releases";

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
                <SpotlightCard
                  className="h-full border-white/10 bg-white/[0.04] backdrop-blur-xl"
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
              </motion.article>
            );
          })}
        </div>

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
