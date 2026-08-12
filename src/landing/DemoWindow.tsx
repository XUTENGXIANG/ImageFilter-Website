import BorderGlow from "@/components/BorderGlow";
import { MousePointerClick } from "lucide-react";
import ImageFilterDemo from "../demo/ImageFilterDemo";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

interface DemoWindowProps {
  lang: Lang;
}

export default function DemoWindow({ lang }: DemoWindowProps) {
  const t = translations[lang];

  return (
    <section
      id="demo"
      className="relative scroll-mt-28 px-4 pb-32 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <BorderGlow
          className="rounded-[28px]"
          animated
          colors={["#8b5cf6", "#38bdf8", "#22d3ee"]}
          glowColor="250 90 78"
          backgroundColor="#090b12"
          borderRadius={28}
          glowRadius={48}
          glowIntensity={0.9}
          fillOpacity={0.16}
          edgeSensitivity={18}
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0d15]/95">
            <div className="flex h-12 items-center justify-between border-b border-white/10 px-4 sm:px-5">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-sm font-semibold text-white/80">
                ImageFilter
              </span>
              <span className="w-16 text-right text-xs text-white/40">
                {t.demo.langHint}
              </span>
            </div>
            <div className="p-2 sm:p-3">
              <ImageFilterDemo className="w-full" />
            </div>
          </div>
        </BorderGlow>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-white/50">
          <MousePointerClick className="h-4 w-4 text-cyan-200/70" />
          <span>{t.demo.hint}</span>
        </div>
      </div>
    </section>
  );
}
