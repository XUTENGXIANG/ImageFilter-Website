// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import ImageFilterDemo from "../demo/ImageFilterDemo";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface DemoWindowProps {
  lang: Lang;
}

export default function DemoWindow({ lang }: DemoWindowProps) {
  const t = translations[lang];

  return (
    <section
      id="demo"
      className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]"
    >
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
              <span className="font-landing-mono text-[10.5px] text-ink-faint">
                {t.demo.langHint}
              </span>
            </div>
            <div className="p-2">
              <div className="overflow-x-auto">
                <ImageFilterDemo className="w-full max-hero:min-w-[720px]" />
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-4 font-landing-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">
          {t.demo.caption}
          <span className="ml-2 hidden max-hero:inline">{t.demo.swipeHint}</span>
        </p>
      </div>
    </section>
  );
}
