// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
import logo from "../assets/logo.png";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const REPOSITORY_URL = "https://github.com/XUTENGXIANG/ImageFilter";
const DOUYIN_URL = "https://v.douyin.com/-ynyv8dbB7U/";
const CONTACT_EMAIL = "mail@tensyn.online";

interface FooterProps {
  lang: Lang;
}

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="font-landing-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-body text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="border-t border-line bg-canvas px-6 pb-8 pt-14 max-hero:px-[18px]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,.6fr))]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <img src={logo} alt="" className="size-8" />
              <span className="font-display text-[15px] font-semibold text-ink">
                ImageFilter
              </span>
            </a>
            <p className="mt-3 max-w-xs text-body text-ink-muted">{t.footer.tagline}</p>
          </div>

          <FooterColumn
            title={t.footer.product}
            links={[
              { href: "#features", label: t.nav.features },
              { href: "#compare", label: t.nav.compare },
              { href: "#workflow", label: t.nav.workflow },
              { href: "#download", label: t.nav.download },
              { href: "#faq", label: t.faq.title },
            ]}
          />

          <FooterColumn
            title={t.footer.resources}
            links={[
              { href: REPOSITORY_URL, label: t.footer.github, external: true },
              { href: `${REPOSITORY_URL}/releases`, label: "GitHub Releases", external: true },
              {
                href: `${REPOSITORY_URL}/blob/master/LICENSE`,
                label: t.footer.mit,
                external: true,
              },
            ]}
          />

          <FooterColumn
            title={t.footer.contact}
            links={[
              { href: DOUYIN_URL, label: t.footer.douyin, external: true },
              { href: `mailto:${CONTACT_EMAIL}`, label: t.footer.email },
              { href: "#demo", label: t.footer.backToDemo },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-landing-mono text-[10.5px] tracking-[0.04em] text-ink-faint">
            {t.footer.copyright}
          </p>
          <p className="font-landing-mono text-[10.5px] tracking-[0.04em] text-ink-faint">
            MIT · ImageFilter
          </p>
        </div>
      </div>
    </footer>
  );
}
