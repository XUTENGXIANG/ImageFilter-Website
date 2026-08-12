import BorderGlow from "@/components/BorderGlow";
import SpotlightCard from "@/components/SpotlightCard";
import {
  Detection,
  FileHash,
  Folder,
  ImageFiles,
  Local,
  Star,
} from "@icon-park/react";
import { motion } from "motion/react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

// CardSwap is a position-swapping deck for absolutely positioned cards. It
// would fight the responsive feature grid, so this section uses SpotlightCard
// hover accents with a motion fade-up stagger instead.
const featureIcons = [ImageFiles, Star, Detection, Folder, FileHash, Local];

interface FeaturesProps {
  lang: Lang;
}

export default function Features({ lang }: FeaturesProps) {
  const t = translations[lang];

  return (
    <section
      id="features"
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
            {t.features.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            {t.features.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index];

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="h-full"
              >
                <BorderGlow
                  className="h-full rounded-2xl"
                  backgroundColor="rgba(255,255,255,0.04)"
                  borderRadius={16}
                  colors={["#a78bfa", "#22d3ee", "#7dd3fc"]}
                  glowColor="250 85 80"
                  glowRadius={28}
                  glowIntensity={0.55}
                  edgeSensitivity={22}
                  fillOpacity={0.12}
                >
                  <SpotlightCard
                    className="h-full border-white/10 bg-transparent backdrop-blur-xl"
                    spotlightColor="rgba(139, 92, 246, 0.18)"
                  >
                    <div className="flex h-full flex-col p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-400/20 to-cyan-300/15 text-violet-100">
                        <Icon size={22} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-base font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        {feature.description}
                      </p>
                      <span className="mt-auto pt-6 text-xs tabular-nums text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </SpotlightCard>
                </BorderGlow>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
