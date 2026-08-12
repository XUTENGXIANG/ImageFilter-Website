import { useState } from "react";
import type { Lang } from "./i18n";
import DemoWindow from "./DemoWindow";
import Features from "./Features";
import Hero from "./Hero";
import Nav from "./Nav";
import Screenshots from "./Screenshots";

function PlaceholderSection({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} aria-label={label} className="min-h-[70vh] scroll-mt-28">
      {/* {label} placeholder for a later landing stage. */}
    </section>
  );
}

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
        <PlaceholderSection id="workflow" label="Workflow" />
        <PlaceholderSection id="download" label="Download" />
      </main>
      {/* Footer placeholder for a later landing stage. */}
      <footer className="min-h-[30vh] scroll-mt-28" aria-label="Footer" />
    </div>
  );
}
