import { Camera } from "@icon-park/react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import DepthCarousel from "@/components/DepthCarousel";
import screenshotSrc from "../assets/screenshot.png";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const CARD_WIDTH = 720;
const CARD_HEIGHT = 405;

function buildPlaceholderImage(primary: string, secondary: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="405" viewBox="0 0 720 405">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#8b5cf6"/>
          <stop offset="1" stop-color="#22d3ee"/>
        </linearGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="720" height="405" fill="url(#g)"/>
      <rect width="720" height="405" fill="url(#grid)"/>
      <circle cx="360" cy="172" r="36" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"/>
      <path d="M305 170h26l8-14h42l8 14h26v60h-110z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="360" cy="200" r="15" fill="none" stroke="white" stroke-width="3"/>
      <text x="360" y="270" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="rgba(255,255,255,0.92)">${primary}</text>
      <text x="360" y="300" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" fill="rgba(255,255,255,0.66)">${secondary}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

interface ScreenshotsProps {
  lang: Lang;
}

export default function Screenshots({ lang }: ScreenshotsProps) {
  const t = translations[lang];
  const [active, setActive] = useState(0);

  // DepthCarousel only renders item.image inside its 3D cards, so each
  // slide's title is exposed as the active caption below the deck.
  const placeholder = useMemo(
    () =>
      buildPlaceholderImage(
        t.screenshots.placeholder,
        t.screenshots.placeholderEnglish,
      ),
    [t],
  );

  const slides = [
    {
      image: screenshotSrc,
      title: t.screenshots.mainInterface,
    },
    // 待补充截图位置：第二、三张使用渐变 SVG 占位卡片。
    {
      image: placeholder,
      title: `${t.screenshots.placeholder} / ${t.screenshots.placeholderEnglish}`,
    },
    {
      image: placeholder,
      title: `${t.screenshots.placeholder} / ${t.screenshots.placeholderEnglish}`,
    },
  ];

  const items = slides.map((slide) => ({
    image: slide.image,
    alt: slide.title,
  }));

  return (
    <section
      id="screenshots"
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
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-normal text-cyan-200/70">
            <Camera size={15} fill="currentColor" />
            <span>{t.screenshots.caption}</span>
          </div>
          <h2 className="text-3xl font-semibold text-white sm:text-5xl">
            {t.screenshots.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {t.screenshots.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative mt-14 h-[420px] sm:h-[460px]"
        >
          <DepthCarousel
            items={items}
            cardWidth={CARD_WIDTH}
            cardHeight={CARD_HEIGHT}
            radius={18}
            tint="#070910"
            depth={210}
            spread={82}
            tilt={20}
            perspective={1300}
            visibleCards={3}
            falloff={0.18}
            blur={4}
            duration={700}
            ease="power3.out"
            autoplay
            autoplayDelay={4200}
            loop
            showControls
            showIndicators
            onChange={(index) => setActive(index)}
          />

          <div className="mt-5 flex min-h-12 items-center justify-center gap-3 text-center">
            <span className="text-xs font-medium tabular-nums text-white/45">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-1 text-white/25">/</span>
              {String(slides.length).padStart(2, "0")}
            </span>
            <span
              className="h-1.5 w-8 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
              aria-hidden="true"
            />
            <p
              aria-live="polite"
              className="text-sm font-medium text-white/75"
            >
              {slides[active].title}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
