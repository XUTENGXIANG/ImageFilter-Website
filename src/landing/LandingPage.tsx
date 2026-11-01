// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { useEffect, useState } from "react";
import LiquidCursorGradient from "./components/LiquidCursorGradient";
import type { Lang } from "./i18n";
import Compare from "./Compare";
import DemoWindow from "./DemoWindow";
import Download from "./Download";
import FAQ from "./FAQ";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import TechTextBand from "./TechTextBand";
import VersionsPage from "./VersionsPage";
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
  const [route, setRoute] = useState<"landing" | "versions">(() =>
    window.location.hash === "#/versions" ? "versions" : "landing",
  );

  const changeLang = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem("site-lang", next);
    } catch {
      // Persisting language is optional when storage is unavailable.
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash === "#/versions" ? "versions" : "landing");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "versions") {
    return <VersionsPage lang={lang} onLangChange={changeLang} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
      <LiquidCursorGradient />
      <Nav lang={lang} onLangChange={changeLang} />
      <main className="relative z-10">
        <Hero lang={lang} />
        <TechTextBand />
        <DemoWindow lang={lang} />
        <Compare lang={lang} />
        <Features lang={lang} />
        <Workflow lang={lang} />
        <Download lang={lang} />
        <FAQ lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
