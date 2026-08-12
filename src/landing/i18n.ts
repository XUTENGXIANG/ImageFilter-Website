export type Lang = "zh" | "en";

export interface LandingMessages {
  nav: {
    features: string;
    screenshots: string;
    workflow: string;
    download: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    windows: string;
    macos: string;
  };
  demo: {
    langHint: string;
    hint: string;
  };
}

export const zh: LandingMessages = {
  nav: {
    features: "特性",
    screenshots: "界面",
    workflow: "工作流",
    download: "下载",
  },
  hero: {
    eyebrow: "摄影选片 · 归档 · 创作",
    title: "ImageFilter",
    subtitle: "为创作者而生的 RAW 选片与归档工作流",
    windows: "Windows 下载",
    macos: "macOS 下载",
  },
  demo: {
    langHint: "中 / EN",
    hint: "点击照片体验选片流程",
  },
};

export const en: LandingMessages = {
  nav: {
    features: "Features",
    screenshots: "Interface",
    workflow: "Workflow",
    download: "Download",
  },
  hero: {
    eyebrow: "Cull · Archive · Create",
    title: "ImageFilter",
    subtitle: "A RAW culling and archive workflow built for creators.",
    windows: "Download for Windows",
    macos: "Download for macOS",
  },
  demo: {
    langHint: "中 / EN",
    hint: "Click a photo to try the culling flow.",
  },
};

export const translations: Record<Lang, LandingMessages> = { zh, en };
