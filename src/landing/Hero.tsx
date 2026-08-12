import ParticleText from "@/components/ParticleText";
import { Apple, Monitor } from "lucide-react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const RELEASES_URL = "https://github.com/XUTENGXIANG/ImageFilter/releases";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const buttons = [
    { href: RELEASES_URL, label: t.hero.windows, icon: Monitor },
    { href: RELEASES_URL, label: t.hero.macos, icon: Apple },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 md:pt-44 lg:px-8"
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur">
          {t.hero.eyebrow}
        </p>
        <h1 className="mt-8 max-w-5xl">
          <ParticleText
            text={t.hero.title}
            color="#f8fafc"
            highlightColor="#8b5cf6"
            particleSize={2.2}
            density={4}
            fontSize="clamp(3.5rem, 12vw, 9rem)"
            fontWeight={800}
            scatter={200}
            gatherDuration={1800}
            stagger={480}
            pointerRepel={40}
            repelRadius={130}
            glow
          />
        </h1>
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
          {buttons.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white shadow-2xl shadow-black/20 backdrop-blur transition hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_36px_rgba(139,92,246,0.22)] sm:w-auto"
            >
              <Icon className="h-4 w-4 text-white/80" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
