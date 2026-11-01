import type { Lang } from "../i18n";
import RubberSegment from "./RubberSegment";

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export default function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  return (
    <RubberSegment
      items={[
        { value: "zh", label: "中" },
        { value: "en", label: "EN" },
      ]}
      value={lang}
      onChange={(next) => onChange(next as Lang)}
      trackColor="rgba(255,255,255,0.03)"
      thumbColor="#fafafa"
      textColor="rgba(255,255,255,0.90)"
      activeTextColor="#18181b"
      size="sm"
      radius={999}
      inset={2}
      equalSlots
      stretch={80}
      squash={2}
      speed={1}
      glide={60}
      draggable
      aria-label="Language"
      className="border border-line"
    />
  );
}
