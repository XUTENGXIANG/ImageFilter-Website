import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Download, Loader2 } from "lucide-react";
import logo from "../assets/logo.png";
import LanguageToggle from "./components/LanguageToggle";
import Reveal from "./components/Reveal";
import SectionHead from "./components/SectionHead";
import { ALL_RELEASES_API, CN_DOWNLOADS, RELEASES_PAGE } from "./downloadData";
import type { Lang } from "./i18n";
import { triggerIframeDownload } from "./lib/download";
import { translations } from "./i18n";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface Release {
  tag_name: string;
  name: string | null;
  published_at: string | null;
  html_url: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

interface VersionsPageProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

const formatSize = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "—";
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

const assetKind = (name: string) => {
  if (/-setup\.exe$/i.test(name)) return "Windows · EXE";
  if (/\.msi$/i.test(name)) return "Windows · MSI";
  if (/\.dmg$/i.test(name)) return "macOS · DMG";
  if (/\.apk$/i.test(name)) return "Android · APK";
  if (/\.zip$/i.test(name)) return "ZIP";
  return "File";
};

const isInstallerAsset = (name: string) =>
  /(-setup\.exe|\.msi|\.dmg|\.apk|\.zip)$/i.test(name);

export default function VersionsPage({ lang, onLangChange }: VersionsPageProps) {
  const t = translations[lang];
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${t.versions.title} · ImageFilter`;
    return () => {
      document.title = previousTitle;
    };
  }, [t.versions.title]);

  useEffect(() => {
    let cancelled = false;
    fetch(ALL_RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error(`HTTP ${response.status}`)),
      )
      .then((data) => {
        if (!cancelled) setReleases(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (value: string | null) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-svh bg-canvas text-ink">
      <header className="border-b border-line px-6 py-4 max-hero:px-[18px]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-3">
          <a href="#" className="flex items-center gap-2.5">
            <img src={logo} alt="" className="size-7" />
            <span className="font-display text-[15px] font-semibold text-ink">
              ImageFilter
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-body text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.versions.back}
          </a>
          <div className="ml-auto">
            <LanguageToggle lang={lang} onChange={onLangChange} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14 max-hero:px-[18px]">
        <Reveal>
          <SectionHead
            eyebrow={t.versions.eyebrow}
            title={t.versions.title}
            subtitle={t.versions.subtitle}
          />
        </Reveal>

        <div className="mt-10">
          {error ? (
            <div className="rounded-card border border-line bg-surface-sunken p-6">
              <p className="text-body text-ink-muted">{t.versions.error}</p>
              <a
                href={RELEASES_PAGE}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-body text-ink underline-offset-2 hover:underline"
              >
                {t.versions.openReleases}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          ) : releases === null ? (
            <div className="flex items-center gap-2.5 rounded-card border border-line bg-surface-sunken p-6 text-body text-ink-muted">
              <Loader2 className="size-4 animate-spin text-ink-faint" aria-hidden="true" />
              {t.versions.loading}
            </div>
          ) : releases.length === 0 ? (
            <div className="rounded-card border border-line bg-surface-sunken p-6 text-body text-ink-muted">
              {t.versions.empty}
            </div>
          ) : (
            <div className="grid gap-4">
              {releases.map((release, index) => {
                const title =
                  release.name && release.name !== release.tag_name ? release.name : null;
                const assets = release.assets.filter((asset) =>
                  isInstallerAsset(asset.name),
                );

                return (
                  <Reveal key={release.tag_name} delay={Math.min(index * 0.03, 0.2)}>
                    <article className="rounded-card border border-line bg-surface-sunken p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-display text-title font-medium text-ink">
                              {release.tag_name}
                            </h2>
                            {index === 0 && (
                              <span className="rounded-full border border-data/30 bg-data/10 px-2 py-0.5 font-landing-mono text-[10px] uppercase tracking-[0.08em] text-data">
                                {t.versions.latest}
                              </span>
                            )}
                            {release.prerelease && (
                              <span className="rounded-full border border-line px-2 py-0.5 font-landing-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                                {t.versions.prerelease}
                              </span>
                            )}
                          </div>
                          {title && (
                            <p className="mt-1 text-body text-ink-muted">{title}</p>
                          )}
                        </div>
                        <time
                          dateTime={release.published_at ?? undefined}
                          className="font-landing-mono text-[10.5px] tabular-nums text-ink-faint"
                        >
                          {t.versions.published} {formatDate(release.published_at)}
                        </time>
                      </div>

                      {assets.length > 0 ? (
                        <div className="mt-5 border-t border-line">
                          {assets.map((asset) => (
                            <a
                              key={asset.name}
                              href={asset.browser_download_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => {
                                if (
                                  event.metaKey ||
                                  event.ctrlKey ||
                                  event.shiftKey ||
                                  event.altKey ||
                                  event.button !== 0
                                ) {
                                  return;
                                }
                                event.preventDefault();
                                triggerIframeDownload(asset.browser_download_url);
                              }}
                              className="group flex flex-col gap-1 border-b border-line py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                            >
                              <span className="min-w-0 truncate font-landing-mono text-mono-sm text-ink">
                                {asset.name}
                              </span>
                              <span className="flex shrink-0 items-center gap-3 font-landing-mono text-[10.5px] text-ink-faint">
                                <span>{assetKind(asset.name)}</span>
                                <span>{formatSize(asset.size)}</span>
                                <Download
                                  className="size-3.5 transition-colors group-hover:text-ink"
                                  aria-hidden="true"
                                />
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 text-body text-ink-faint">{t.versions.noAssets}</p>
                      )}

                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-body text-ink-muted transition-colors hover:text-ink"
                      >
                        {t.versions.releaseNotes}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>

        <section className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-display-lg font-semibold text-ink">
              {t.versions.cnTitle}
            </h2>
            <p className="max-w-2xl text-body text-ink-muted text-pretty">
              {t.versions.cnNote}
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CN_DOWNLOADS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-card border border-line bg-surface-sunken p-5 transition-colors hover:border-line-strong hover:bg-white/[0.015]"
              >
                <span className="block truncate font-landing-mono text-mono-sm text-ink">
                  {item.name}
                </span>
                {item.password ? (
                  <span className="mt-2 block text-caption text-ink-faint">
                    {t.download.password} {item.password}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-line pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-landing-mono text-[10.5px] tracking-[0.04em] text-ink-faint">
              {t.footer.copyright}
            </p>
            <a
              href={RELEASES_PAGE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-body text-ink-muted transition-colors hover:text-ink"
            >
              {t.versions.openReleases}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
