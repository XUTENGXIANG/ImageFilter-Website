// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { FileCheck2, Folder, HardDrive, Image, Sparkles, Star } from "lucide-react";
import Card from "./components/Card";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const featureIcons = [Image, Star, Sparkles, Folder, FileCheck2, HardDrive];

interface FeaturesProps {
  lang: Lang;
}

export default function Features({ lang }: FeaturesProps) {
  const t = translations[lang];

  return (
    <section
      id="features"
      className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow={t.features.eyebrow}
            title={t.features.title}
            subtitle={t.features.subtitle}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index];

            return (
              <Reveal key={feature.title} delay={index * 0.04}>
                <Card className="h-full p-6 transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.015]">
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="size-5 text-white/55" aria-hidden="true" />
                    <span className="font-landing-mono text-[10.5px] tabular-nums text-white/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-title font-medium text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-body leading-[1.65] text-ink-muted">
                    {feature.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
