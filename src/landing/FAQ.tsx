// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import Disclosure from "./components/Disclosure";
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
              <Disclosure
                key={item.q}
                variant="faq"
                index={String(index + 1).padStart(2, "0")}
                title={item.q}
              >
                {item.a}
              </Disclosure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
