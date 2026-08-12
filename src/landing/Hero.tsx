import ParticleText from "@/components/ParticleText";
import SpecularButton from "@/components/SpecularButton";
import { Apple, Monitor } from "lucide-react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const buttons = [
    { label: t.hero.windows, icon: Monitor },
    { label: t.hero.macos, icon: Apple },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 md:pt-44 lg:px-8"
    >
      {/* 标题粒子层: 覆盖 hero 全屏, 粒子从四处散布聚集成文字 */}
      <div className="absolute inset-0 z-[5]">
        <ParticleText
          text={t.hero.title}
          color="#f8fafc"
          highlightColor="#8b5cf6"
          particleSize={2.2}
          density={4}
          fontSize="clamp(3.5rem, 12vw, 9rem)"
          fontWeight={800}
          scatter={1300}
          gatherDuration={2000}
          stagger={500}
          idleDrift={0}
          glow
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur">
          {t.hero.eyebrow}
        </p>
        <h1
          className="mt-8 h-[30vh] min-h-[220px] w-full max-w-5xl"
          aria-label={t.hero.title}
        ></h1>
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
          {buttons.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#download"
              className="block w-full rounded-2xl outline-none transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70 sm:w-auto"
            >
              <SpecularButton
                size="md"
                radius={16}
                tint="#0f172a"
                tintOpacity={0.55}
                blur={14}
                baseColor="#323a4d"
                lineColor="#c7d2fe"
                textColor="#f8fafc"
                intensity={1.1}
                proximity={360}
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </span>
              </SpecularButton>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
