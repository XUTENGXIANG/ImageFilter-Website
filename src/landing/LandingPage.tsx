import { useState } from "react";
import LiquidEther from "@/components/LiquidEther";
import type { Lang } from "./i18n";
import Compare from "./Compare";
import DemoWindow from "./DemoWindow";
import Download from "./Download";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
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
    <div className="relative min-h-screen overflow-x-clip bg-[#05060a] text-slate-50">
      {/* 全局背景: LiquidEther 液态流体 + 三色光晕 */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-90">
          <LiquidEther
            colors={["#7c3aed", "#0ea5e9", "#ec4899"]}
            autoDemo
            autoSpeed={0.8}
            autoIntensity={3}
            resolution={0.4}
            mouseForce={20}
          />
        </div>
        <div className="absolute -left-32 top-12 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-[36rem] w-[36rem] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <Nav lang={lang} onLangChange={changeLang} />
      <main className="relative z-10">
        <Hero lang={lang} />
        <DemoWindow lang={lang} />
        <Compare lang={lang} />
        <Features lang={lang} />
        <Workflow lang={lang} />
        <Download lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
