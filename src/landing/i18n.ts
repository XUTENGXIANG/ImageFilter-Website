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
    placeholderSecondary: string;
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
  workflow: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  download: {
    eyebrow: string;
    title: string;
    version: string;
    cards: {
      platform: string;
      badge: string;
      description: string;
      action: string;
    }[];
    releases: string;
  };
  footer: {
    tagline: string;
    github: string;
    mit: string;
    backToDemo: string;
    copyright: string;
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
    placeholderSecondary: "Screenshot coming soon",
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
  workflow: {
    eyebrow: "工作流 · 创作 · 影像",
    title: "工作流 / Workflow",
    subtitle: "从插卡到归档，三步完成选片",
    steps: [
      {
        title: "插卡识别",
        description: "连接相机或 SD 卡，设备自动识别，RAW 素材即刻进入工作区。",
      },
      {
        title: "预览筛选",
        description: "秒级 RAW 预览，星级评分完成初筛，把判断留给创作。",
      },
      {
        title: "一键归档",
        description: "命名规则自动整理，MD5 校验导入，数据完整、路径清晰。",
      },
    ],
  },
  download: {
    eyebrow: "安装包 / Installers",
    title: "下载 / Download",
    version: "v1.0.0",
    cards: [
      {
        platform: "Windows 安装包",
        badge: "推荐",
        description: "NSIS 安装包，双击即装。",
        action: "下载 Windows 安装包",
      },
      {
        platform: "Windows MSI",
        badge: "企业部署",
        description: "面向企业部署与组策略安装。",
        action: "下载 MSI 安装包",
      },
      {
        platform: "macOS Universal",
        badge: "通用",
        description: "同时支持 Intel 与 Apple Silicon。",
        action: "下载 macOS 安装包",
      },
    ],
    releases: "查看 GitHub Releases →",
  },
  footer: {
    tagline: "RAW 选片与归档工作流",
    github: "GitHub 仓库",
    mit: "MIT 许可",
    backToDemo: "回到演示",
    copyright: "© 2026 ImageFilter · MIT License",
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
    placeholderSecondary: "截图待补充",
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
  workflow: {
    eyebrow: "Workflow · Creative · Imaging",
    title: "Workflow",
    subtitle: "From card to archive, finish the first pass in three steps.",
    steps: [
      {
        title: "Connect & Detect",
        description:
          "Connect your camera or SD card; the device is detected and RAW files enter the workspace.",
      },
      {
        title: "Preview & Rate",
        description:
          "Fast RAW previews with star ratings turn the first pass into a clear creative decision.",
      },
      {
        title: "Archive in One Step",
        description:
          "Apply naming rules automatically and verify imports with MD5 for a complete, traceable archive.",
      },
    ],
  },
  download: {
    eyebrow: "Installers",
    title: "Download",
    version: "v1.0.0",
    cards: [
      {
        platform: "Windows Installer",
        badge: "Recommended",
        description: "NSIS installer; double-click to set up.",
        action: "Download Windows Installer",
      },
      {
        platform: "Windows MSI",
        badge: "Enterprise",
        description: "Built for enterprise deployment and Group Policy installs.",
        action: "Download MSI",
      },
      {
        platform: "macOS Universal",
        badge: "Universal",
        description: "Supports both Intel and Apple Silicon.",
        action: "Download for macOS",
      },
    ],
    releases: "View GitHub Releases →",
  },
  footer: {
    tagline: "A RAW culling and archiving workflow",
    github: "GitHub Repository",
    mit: "MIT License",
    backToDemo: "Back to Demo",
    copyright: "© 2026 ImageFilter · MIT License",
  },
};

export const translations: Record<Lang, LandingMessages> = { zh, en };
