import { Plus } from "lucide-react";
import type { Lang } from "../i18n";
import { translations } from "../i18n";

const ISSUE_URL = "https://github.com/XUTENGXIANG/ImageFilter/issues/new";

interface MacOSSigningNoteProps {
  lang: Lang;
}

export default function MacOSSigningNote({ lang }: MacOSSigningNoteProps) {
  const t = translations[lang];

  return (
    <details className="group rounded-card border border-line bg-surface-sunken">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="font-landing-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
          {t.macosSign.label}
        </span>
        <span className="flex-1 text-body font-medium text-ink">
          {t.macosSign.title}
        </span>
        <Plus
          className="size-4 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        />
      </summary>

      <div className="border-t border-line px-5 pb-5 pt-4">
        <p className="text-caption leading-[1.6] text-ink-faint">
          {t.macosSign.intro}
        </p>

        <ol className="mt-3 space-y-2">
          {t.macosSign.steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 text-body leading-[1.6] text-ink-muted"
            >
              <span className="mt-0.5 font-landing-mono text-[10.5px] tabular-nums text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <pre className="mt-3 whitespace-pre-wrap break-words rounded-md border border-line bg-black/40 px-3 py-2 font-landing-mono text-[11px] leading-[1.5] text-ink">
          <code>{t.macosSign.command}</code>
        </pre>

        <p className="mt-3 text-caption leading-[1.5] text-ink-faint">
          {t.macosSign.note}{" "}
          <a
            href={ISSUE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-ink underline-offset-2 hover:underline"
          >
            {t.macosSign.issue} →
          </a>
        </p>
      </div>
    </details>
  );
}
