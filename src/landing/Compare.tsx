import { motion } from "motion/react";
import { Close, Check } from "@icon-park/react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface CompareProps {
  lang: Lang;
}

export default function Compare({ lang }: CompareProps) {
  const t = translations[lang];

  return (
    <section id="compare" className="relative scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/70">
            {t.compare.title}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.compare.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            {t.compare.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* 传统方式列 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-zinc-400">
                <Close size={18} theme="outline" />
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-300">{t.compare.manual}</p>
                <p className="text-xs text-zinc-500">{t.compare.manualCaption}</p>
              </div>
            </div>
            <ul className="mt-8 space-y-6">
              {t.compare.rows.map((row, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-500">
                    <Close size={10} />
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-400">{row.manual}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 中间 VS 徽标 */}
          <div className="hidden items-center lg:flex" aria-hidden="true">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-sm font-bold tracking-widest text-violet-200">
              VS
            </span>
          </div>

          {/* ImageFilter 列 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="rounded-2xl border border-violet-400/25 bg-gradient-to-b from-violet-500/[0.08] to-cyan-400/[0.05] p-6 shadow-[0_0_48px_rgba(139,92,246,0.12)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/25 bg-violet-400/15 text-violet-200">
                <Check size={18} theme="outline" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{t.compare.imagefilter}</p>
                <p className="text-xs text-violet-200/60">{t.compare.imagefilterCaption}</p>
              </div>
            </div>
            <ul className="mt-8 space-y-6">
              {t.compare.rows.map((row, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-400/20 text-violet-200">
                    <Check size={10} />
                  </span>
                  <span className="text-sm leading-relaxed text-white/80">{row.app}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
