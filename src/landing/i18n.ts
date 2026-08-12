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
  screenshots: {
    title: string;
    subtitle: string;
    caption: string;
    mainInterface: string;
    placeholder: string;
    placeholderEnglish: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
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
  screenshots: {
    title: "界面",
    subtitle: "从导入到成片，界面始终围绕摄影师的工作节奏组织。",
    caption: "工作流 · 创作 · 影像",
    mainInterface: "主界面 — 三栏布局",
    placeholder: "截图待补充",
    placeholderEnglish: "Screenshot coming soon",
  },
  features: {
    eyebrow: "工作流 · 创作 · 影像",
    title: "特性",
    subtitle: "让 RAW 管理更专注：从解码、筛选到归档，每一步都围绕影像工作流设计。",
    items: [
      {
        title: "RAW 原生解码",
        description: "主流 RAW 格式原生支持，DNG 内置专用解码器。",
      },
      {
        title: "星级筛选",
        description: "LrC 同款星级体系，快速完成初筛。",
      },
      {
        title: "AI 检测",
        description: "模糊、过曝、连拍重复自动识别。",
      },
      {
        title: "命名归档",
        description: "模板化规则自动整理归档。",
      },
      {
        title: "MD5 校验",
        description: "导入全程校验，确保数据完整。",
      },
      {
        title: "本地处理",
        description: "全程本地完成，影像不上传。",
      },
    ],
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
  screenshots: {
    title: "Interface",
    subtitle: "Every workspace is organized around the photographer's flow, from import to final export.",
    caption: "Workflow · Creative · Imaging",
    mainInterface: "Main interface - three-panel layout",
    placeholder: "Screenshot coming soon",
    placeholderEnglish: "截图待补充",
  },
  features: {
    eyebrow: "Workflow · Creative · Imaging",
    title: "Features",
    subtitle: "A focused RAW workflow: decoding, culling, and archiving without leaving the local image pipeline.",
    items: [
      {
        title: "RAW Native Decode",
        description: "Native support for mainstream RAW formats, with a dedicated DNG decoder.",
      },
      {
        title: "Star-based Culling",
        description: "The same star rating system as LrC for fast first-pass selection.",
      },
      {
        title: "AI Detection",
        description: "Automatically flags blur, overexposure, and burst duplicates.",
      },
      {
        title: "Template Archiving",
        description: "Rename and organize with repeatable, template-driven rules.",
      },
      {
        title: "MD5 Verification",
        description: "End-to-end checksums during import keep data intact.",
      },
      {
        title: "Local Processing",
        description: "Everything runs locally; photos never leave your machine.",
      },
    ],
  },
};

export const translations: Record<Lang, LandingMessages> = { zh, en };
