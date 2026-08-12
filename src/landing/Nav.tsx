import { Camera } from "@icon-park/react";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface NavProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Nav({ lang, onLangChange }: NavProps) {
  const t = translations[lang];
  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#screenshots", label: t.nav.screenshots },
    { href: "#workflow", label: t.nav.workflow },
    { href: "#download", label: t.nav.download },
  ];

  const renderLinks = () =>
    links.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="rounded-full px-3 py-2 text-xs text-white/65 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
      >
        {link.label}
      </a>
    ));

  const changeLang = (next: Lang) => {
    onLangChange(next);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06070d]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-violet-300 transition group-hover:border-violet-300/30 group-hover:bg-violet-300/10">
            <Camera size={20} fill="currentColor" />
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline">
            ImageFilter
          </span>
        </a>

        <nav
          className="hidden items-center justify-center gap-1 md:flex"
          aria-label="Primary"
        >
          {renderLinks()}
        </nav>

        <div
          className="flex items-center rounded-full border border-white/10 bg-white/5 p-1"
          aria-label="Language"
        >
          {(["zh", "en"] as Lang[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeLang(item)}
              aria-pressed={lang === item}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                lang === item
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              {item === "zh" ? "中" : "EN"}
            </button>
          ))}
        </div>
      </div>

      <nav
        className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden"
        aria-label="Primary mobile"
      >
        {renderLinks()}
      </nav>
    </header>
  );
}
