// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { useState } from "react";
import FlapButtonLink from "./components/FlapButtonLink";
import HeroCollage from "./HeroCollage";
import type { Lang } from "./i18n";
import { translations } from "./i18n";
import { cn } from "./lib/cn";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const [usedHint, setUsedHint] = useState(false);
  const titleGap = lang === "en" ? " " : "";
  const title = `${t.hero.title.line1} ${t.hero.title.line2}${titleGap}${t.hero.title.emphasis}`;

  return (
    <section id="top" className="relative flex min-h-svh items-end overflow-hidden">
      <HeroCollage lang={lang} onFirstDrag={() => setUsedHint(true)} />

      <p
        className={cn(
          "absolute right-6 top-[88px] z-[3] hidden items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 font-landing-mono text-[10px] uppercase tracking-[0.1em] text-white/70 backdrop-blur-sm transition-opacity duration-500 hero:flex",
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
            <h1
              aria-label={title}
              className="font-display text-display font-semibold text-ink text-balance"
            >
              <span className="block">{t.hero.title.line1}</span>
              <span className="block">
                {t.hero.title.line2}
                {titleGap}
                <em className="not-italic">{t.hero.title.emphasis}</em>
              </span>
            </h1>
          </div>

          <div className="max-w-[400px] justify-self-end pb-1.5 max-hero:max-w-[520px] max-hero:justify-self-start">
            <p className="mb-[22px] text-[15px] leading-[1.65] text-ink-muted text-pretty">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              <FlapButtonLink
                href="#download"
                variant="solid"
                size="lg"
                label={t.hero.windows}
              />
              <FlapButtonLink
                href="#download"
                variant="ghost"
                size="lg"
                label={t.hero.macos}
              />
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
