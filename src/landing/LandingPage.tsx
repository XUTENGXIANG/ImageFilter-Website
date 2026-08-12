import { useState } from "react";
import DotField from "@/components/DotField";
import type { Lang } from "./i18n";
import DemoWindow from "./DemoWindow";
import Download from "./Download";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import Screenshots from "./Screenshots";
import Workflow from "./Workflow";

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem("site-lang");
    return saved === "zh" || saved === "en" ? saved : "zh";
  } catch {
    return "zh";
  }
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const changeLang = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem("site-lang", next);
    } catch {
      // Persisting language is optional when storage is unavailable.
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05060a] text-slate-50">
      {/* 全局背景: DotField 交互点阵 + 三色光晕(整页可见, 随滚动自然铺开) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <DotField
          className="absolute inset-0"
          dotRadius={1.5}
          dotSpacing={18}
          cursorRadius={520}
          cursorForce={0.08}
          bulgeStrength={72}
          glowRadius={280}
          gradientFrom="rgba(168, 85, 247, 0.18)"
          gradientTo="rgba(34, 211, 238, 0.08)"
          glowColor="#8b5cf6"
        />
        <div className="absolute -left-32 top-12 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-[36rem] w-[36rem] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <Nav lang={lang} onLangChange={changeLang} />
      <main className="relative z-10">
        <Hero lang={lang} />
        <DemoWindow lang={lang} />
        <Screenshots lang={lang} />
        <Features lang={lang} />
        <Workflow lang={lang} />
        <Download lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
