// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface WorkflowProps {
  lang: Lang;
}

export default function Workflow({ lang }: WorkflowProps) {
  const t = translations[lang];

  return (
    <section
      id="workflow"
      className="relative scroll-mt-24 px-6 py-20 lg:py-28 max-hero:px-[18px]"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow={t.workflow.eyebrow}
            title={t.workflow.title}
            subtitle={t.workflow.subtitle}
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {t.workflow.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <article className="border-t border-line pt-6">
                <span className="font-landing-mono text-[40px] leading-none tracking-[-0.04em] text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[18px] font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-sm text-body leading-[1.65] text-ink-muted">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
