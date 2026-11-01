import type { Lang } from "../i18n";
import { translations } from "../i18n";
import Disclosure from "./Disclosure";

const ISSUE_URL = "https://github.com/XUTENGXIANG/ImageFilter/issues/new";

interface MacOSSigningNoteProps {
  lang: Lang;
}

export default function MacOSSigningNote({ lang }: MacOSSigningNoteProps) {
  const t = translations[lang];

  return (
    <Disclosure
      variant="card"
      label={t.macosSign.label}
      title={t.macosSign.title}
    >
      <p className="text-caption leading-[1.6] text-ink-faint text-pretty">
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

      <p className="mt-3 text-caption leading-[1.5] text-ink-faint text-pretty">
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
    </Disclosure>
  );
}
