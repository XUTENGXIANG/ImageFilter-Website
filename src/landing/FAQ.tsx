// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { Plus } from "lucide-react";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface FAQProps {
  lang: Lang;
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang];

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]"
    >
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
