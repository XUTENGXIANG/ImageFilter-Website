// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { Check, X } from "lucide-react";
import Card from "./components/Card";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface CompareProps {
  lang: Lang;
}

export default function Compare({ lang }: CompareProps) {
  const t = translations[lang];

  return (
    <section
      id="compare"
      className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow={t.compare.eyebrow}
            title={t.compare.title}
            subtitle={t.compare.subtitle}
          />
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
                {t.compare.rows.map((row, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 font-landing-mono text-[10.5px] tabular-nums text-ink-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body leading-[1.65] text-ink-muted">{row.manual}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="h-full bg-white/[0.06] p-6 ring-1 ring-white/15 sm:p-8">
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
                {t.compare.rows.map((row, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 font-landing-mono text-[10.5px] tabular-nums text-data">
                      {String(index + 1).padStart(2, "0")}
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
  );
}
