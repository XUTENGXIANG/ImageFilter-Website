// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import FlapButtonLink from "./components/FlapButtonLink";
import LanguageToggle from "./components/LanguageToggle";
import GitHubStarButton from "./GitHubStarButton";
import type { Lang } from "./i18n";
import { translations } from "./i18n";
import { cn } from "./lib/cn";

interface NavProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function Nav({ lang, onLangChange }: NavProps) {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#compare", label: t.nav.compare },
    { href: "#workflow", label: t.nav.workflow },
    { href: "#download", label: t.nav.download },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-brand",
        scrolled
          ? "border-b border-line bg-black/[0.72] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {!scrolled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.82),rgba(0,0,0,.34)_58%,transparent)]"
        />
      )}

      <div className="relative mx-auto flex h-16 max-w-6xl items-center gap-2 px-6 max-hero:px-[18px]">
        <a href="#top" className="flex shrink-0 items-center gap-[9px]">
          <img src={logo} alt="" className="size-[26px]" />
          <span className="font-display text-[15px] font-semibold text-ink max-hero:hidden">
            ImageFilter
          </span>
        </a>

        <nav className="ml-3.5 hidden items-center gap-0.5 hero:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 font-display text-[13.5px] font-medium text-white/[0.66] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <GitHubStarButton lang={lang} />

          <LanguageToggle lang={lang} onChange={onLangChange} />

          <FlapButtonLink
            href="#download"
            variant="solid"
            size="sm"
            label={t.nav.download}
          />
        </div>
      </div>

      <nav
        className="no-scrollbar flex items-center gap-1 overflow-x-auto border-t border-line/60 bg-black/75 px-[18px] py-2 backdrop-blur-xl hero:hidden"
        aria-label="Primary mobile"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
