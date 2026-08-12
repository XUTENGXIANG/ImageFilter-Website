import { EmailPush, Github } from "@icon-park/react";
import logo from "../assets/logo.png";
import type { Lang } from "./i18n";
import { translations } from "./i18n";

const REPOSITORY_URL = "https://github.com/XUTENGXIANG/ImageFilter";
const DOUYIN_URL = "https://v.douyin.com/-ynyv8dbB7U/";
const CONTACT_EMAIL = "mail@tensyn.online";

// 抖音图标 — @icon-park 无抖音图标, 内联官方 tiktok 音符路径(Font Awesome 来源)
// 样式与 Github 图标一致: fill=currentColor, 跟随链接文字颜色
const DouyinIcon = ({ size = 17 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
  </svg>
);

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="relative border-t border-white/10 bg-[#06070d]/85 px-4 pb-8 pt-8 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-400/20 to-cyan-300/15 text-violet-200">
              <img src={logo} alt="ImageFilter" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">ImageFilter</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                {t.footer.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#demo"
              className="text-xs font-medium text-cyan-200/70 transition hover:text-cyan-100"
            >
              {t.footer.backToDemo}
            </a>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/65 transition hover:text-white"
            >
              <Github size={17} fill="currentColor" />
              {t.footer.github}
            </a>
            <a
              href={DOUYIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/65 transition hover:text-white"
            >
              <DouyinIcon />
              {t.footer.douyin}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-white/65 transition hover:text-white"
            >
              <EmailPush size={17} fill="currentColor" />
              {t.footer.email}
            </a>
            <span className="text-xs text-white/45">{t.footer.mit}</span>
          </div>
        </div>

        <p className="pt-6 text-xs tabular-nums text-white/40">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
