import { useState } from "react";
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
      <Nav lang={lang} onLangChange={changeLang} />
      <main>
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
