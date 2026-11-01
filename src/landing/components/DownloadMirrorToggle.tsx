import { cn } from "../lib/cn";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

interface DownloadMirrorToggleProps {
  lang: Lang;
  mirror: boolean;
  onChange: (mirror: boolean) => void;
  className?: string;
}

export default function DownloadMirrorToggle({
  lang,
  mirror,
  onChange,
  className,
}: DownloadMirrorToggleProps) {
  const t = translations[lang];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-landing-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
          {t.download.mirrorLabel}
        </span>
        <div className="flex items-center gap-0.5 rounded-full border border-line bg-white/[0.03] p-0.5">
          <button
            type="button"
            onClick={() => onChange(false)}
            aria-pressed={!mirror}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11.5px] font-medium transition-colors duration-200",
              !mirror ? "bg-white/10 text-white" : "text-ink-faint hover:text-ink",
            )}
          >
            {t.download.mirrorGithub}
          </button>
          <button
            type="button"
            onClick={() => onChange(true)}
            aria-pressed={mirror}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11.5px] font-medium transition-colors duration-200",
              mirror ? "bg-white/10 text-white" : "text-ink-faint hover:text-ink",
            )}
          >
            {t.download.mirrorFast}
          </button>
        </div>
      </div>
      {mirror ? (
        <p className="max-w-xl text-caption leading-[1.5] text-ink-faint">
          {t.download.mirrorNote}
        </p>
      ) : null}
    </div>
  );
}
