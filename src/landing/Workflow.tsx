import { FolderOpen, SdCard, Star } from "@icon-park/react";
import { motion } from "motion/react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const stepIcons = [SdCard, Star, FolderOpen];

interface WorkflowProps {
  lang: Lang;
}

export default function Workflow({ lang }: WorkflowProps) {
  const t = translations[lang];

  return (
    <section
      id="workflow"
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
          <p className="text-xs font-medium uppercase tracking-normal text-cyan-200/70">
            {t.workflow.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            {t.workflow.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {t.workflow.subtitle}
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[17%] right-[17%] top-8 hidden h-px bg-gradient-to-r from-violet-400/50 via-cyan-300/60 to-sky-400/50 lg:block"
          />

          <div className="relative grid gap-10 lg:grid-cols-3 lg:gap-6">
            {t.workflow.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const stepNumber = String(index + 1).padStart(2, "0");

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="relative flex flex-col items-start"
                >
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-400/75 via-cyan-300/45 to-sky-400/55 p-px">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0b0d15] text-violet-100">
                      <Icon size={26} strokeWidth={2} fill="currentColor" />
                    </span>
                    <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/30 bg-[#0b0d15] text-[11px] font-semibold tabular-nums text-white/75">
                      {stepNumber}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
