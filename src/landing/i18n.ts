// Copyright (c) 2026 XUTENGXIANG
// SPDX-License-Identifier: MIT
export type Lang = "zh" | "en";

export interface LandingMessages {
  nav: {
    features: string;
    compare: string;
    workflow: string;
    download: string;
    starOnGithub: string;
  };
  hero: {
    eyebrow: string;
    title: {
      line1: string;
      line2: string;
      emphasis: string;
    };
    subtitle: string;
    windows: string;
    macos: string;
    micro: string;
    dragHint: string;
    windowAlt: string;
  };
  collage: {
    deviceTree: string;
    deviceTreeMeta: string;
    folders: string;
    foldersMeta: string;
    grid: string;
    gridMeta: string;
    mainUi: string;
    mainUiMeta: string;
    details: string;
    detailsMeta: string;
    demoData: string;
    demoDataMeta: string;
    windowMeta: string;
  };
  demo: {
    langHint: string;
    hint: string;
    eyebrow: string;
    title: string;
    windowLabel: string;
    caption: string;
    swipeHint: string;
  };
  compare: {
    eyebrow: string;
    title: string;
    subtitle: string;
    manual: string;
    manualCaption: string;
    imagefilter: string;
    imagefilterCaption: string;
    rows: {
      manual: string;
      app: string;
    }[];
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
    /** 版本号徽章：正在问 GitHub 最新正式版时显示 */
    loading: string;
    /** 版本号徽章：问不到时显示（此时三张卡片的按钮退到 Releases 页） */
    fetchFailed: string;
    cards: {
      platform: string;
      badge: string;
      description: string;
      action: string;
    }[];
    releases: string;
    moreVersions: string;
    downloading: string;
    downloaded: string;
    mirrorLabel: string;
    mirrorGithub: string;
    mirrorFast: string;
    mirrorNote: string;
  };
  macosSign: {
    label: string;
    title: string;
    intro: string;
    steps: string[];
    command: string;
    note: string;
    issue: string;
  };
  versions: {
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    loading: string;
    error: string;
    empty: string;
    latest: string;
    prerelease: string;
    published: string;
    releaseNotes: string;
    noAssets: string;
    openReleases: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    tagline: string;
    github: string;
    douyin: string;
    email: string;
    mit: string;
    backToDemo: string;
    copyright: string;
    product: string;
    resources: string;
    contact: string;
  };
}

export const zh: LandingMessages = {
  nav: {
    features: "特性",
    compare: "对比",
    workflow: "工作流",
    download: "下载",
    starOnGithub: "Star on GitHub",
  },
  hero: {
    eyebrow: "本地处理 · 照片不上传",
    title: {
      line1: "整张卡的照片",
      line2: "只留",
      emphasis: "你要的那几张",
    },
    subtitle: "插卡即看，星级初筛，AI 标出模糊与重复；命名归档一次完成。",
    windows: "Windows",
    macos: "macOS",
    micro: "Windows 10 / 11 · macOS Universal · 本地处理",
    dragHint: "拖动看看",
    windowAlt: "ImageFilter 网格视图，已选 3 / 24",
  },
  collage: {
    deviceTree: "设备树",
    deviceTreeMeta: "插卡识别",
    folders: "目录",
    foldersMeta: "按相机分卷",
    grid: "网格",
    gridMeta: "彩色 Demo",
    mainUi: "主界面",
    mainUiMeta: "v1.3.0",
    details: "详细信息",
    detailsMeta: "EXIF · 评分",
    demoData: "演示数据",
    demoDataMeta: "占位卡片",
    windowMeta: "网格 · 已选 3 / 24",
  },
  demo: {
    langHint: "中 / EN",
    hint: "点击照片体验选片流程",
    eyebrow: "LIVE DEMO",
    title: "不用安装，先筛几张。",
    windowLabel: "ImageFilter / demo",
    caption: "真实界面 · 可交互",
    swipeHint: "窄屏可左右滑动",
  },
  compare: {
    eyebrow: "工作流差异",
    title: "对比",
    subtitle: "同样是整理照片，传统方式与 ImageFilter 的差距，在一次导入后就显现。",
    manual: "传统方式",
    manualCaption: "手动文件夹管理",
    imagefilter: "ImageFilter",
    imagefilterCaption: "完整选片工作流",
    rows: [
      {
        manual: "上千张 RAW 逐张翻找，凭记忆打星标",
        app: "RAW 秒级预览，LrC 同款星级体系一键初筛",
      },
      {
        manual: "肉眼判断模糊与过曝，漏看是常态",
        app: "AI 自动识别模糊 / 过曝 / 连拍重复",
      },
      {
        manual: "手工改名、新建文件夹，一次拍摄耗半小时",
        app: "命名规则模板自动归档，插卡即导入",
      },
      {
        manual: "复制粘贴完成，拷完即忘、无从校验",
        app: "MD5 全程校验，数据完整可追溯",
      },
    ],
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
    loading: "获取最新版…",
    fetchFailed: "版本获取失败",
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
    moreVersions: "更多版本",
    downloading: "下载中…",
    downloaded: "已完成",
    mirrorLabel: "下载线路",
    mirrorGithub: "GitHub",
    mirrorFast: "国内加速",
    mirrorNote: "第三方加速，可能失效；安装前请核对文件大小。",
  },
  macosSign: {
    label: "macOS / SIGNING",
    title: "打不开？签名与首次启动",
    intro: "macOS 包未做 Apple 公证，Gatekeeper 会拦截首次启动。",
    steps: [
      "把 ImageFilter 拖进「应用程序」。",
      "先双击一次，再到 系统设置 → 隐私与安全性 → 仍要打开；或右键 ImageFilter → 打开。",
      "若提示「已损坏」：终端执行下面命令，再打开。",
    ],
    command: "sudo xattr -rd com.apple.quarantine /Applications/ImageFilter.app",
    note: "仍然打不开？附 macOS 版本和报错截图提 Issue。",
    issue: "提交 Issue",
  },
  versions: {
    eyebrow: "全部版本",
    title: "版本全览",
    subtitle: "从 GitHub Releases 读取的完整版本与安装包。",
    back: "返回首页",
    loading: "正在读取版本…",
    error: "版本获取失败，请直接前往 GitHub Releases。",
    empty: "还没有可显示的版本。",
    latest: "最新",
    prerelease: "预发布",
    published: "发布于",
    releaseNotes: "发布说明",
    noAssets: "这个版本没有可下载的安装包。",
    openReleases: "在 GitHub 查看全部 Releases",
  },
  faq: {
    eyebrow: "FAQ",
    title: "常见问题",
    items: [
      {
        q: "照片会被上传吗？",
        a: "不会。解码、AI 检测与导入都在本机完成；软件只在检查更新时访问 GitHub。手机图库服务只在局域网内监听，默认关闭。",
      },
      {
        q: "支持哪些照片格式？",
        a: "RAW 支持 ARW / CR2 / CR3 / NEF / DNG / ORF / RW2 / RAF / PEF / SRW；同时可浏览 JPG / PNG / GIF / BMP / TIFF / WebP / HEIC / HEIF，以及 MP4 / MOV / AVI / MKV 的视频缩略图。DNG 使用内置专用解码器。",
      },
      {
        q: "可以商用或二次开发吗？",
        a: "可以。项目采用 MIT 许可证，源码公开；保留版权与许可声明即可使用、修改和分发。",
      },
      {
        q: "macOS 能用吗？",
        a: "可以在 Releases 下载 Universal 安装包（Intel 与 Apple Silicon）。但 macOS 版尚未充分实机验证，遇到问题请附系统版本与复现步骤提交 Issue。Lightroom 衔接与 Mica 毛玻璃仅 Windows。",
      },
    ],
  },
  footer: {
    tagline: "RAW 选片与归档工作流",
    github: "GitHub 仓库",
    douyin: "抖音",
    email: "mail@tensyn.online",
    mit: "MIT 许可",
    backToDemo: "回到演示",
    copyright: "© 2026 XUTENGXIANG · MIT License",
    product: "产品",
    resources: "资源",
    contact: "联系",
  },
};

export const en: LandingMessages = {
  nav: {
    features: "Features",
    compare: "Compare",
    workflow: "Workflow",
    download: "Download",
    starOnGithub: "Star on GitHub",
  },
  hero: {
    eyebrow: "Local only · never uploaded",
    title: {
      line1: "Cull a whole card",
      line2: "Keep only",
      emphasis: "the keepers",
    },
    subtitle:
      "Instant RAW previews, star-based culling, AI flags for blur and duplicates, and template archiving — all on your machine.",
    windows: "Windows",
    macos: "macOS",
    micro: "Windows 10 / 11 · macOS Universal · Local processing",
    dragHint: "Drag to explore",
    windowAlt: "ImageFilter grid view, 3 of 24 selected",
  },
  collage: {
    deviceTree: "Device tree",
    deviceTreeMeta: "Card detected",
    folders: "Folders",
    foldersMeta: "By camera",
    grid: "Grid",
    gridMeta: "Colored demo",
    mainUi: "Main UI",
    mainUiMeta: "v1.3.0",
    details: "Details",
    detailsMeta: "EXIF · rating",
    demoData: "Demo data",
    demoDataMeta: "Placeholder cards",
    windowMeta: "Grid · 3 of 24 selected",
  },
  demo: {
    langHint: "中 / EN",
    hint: "Click a photo to try the culling flow.",
    eyebrow: "LIVE DEMO",
    title: "Try it before you install.",
    windowLabel: "ImageFilter / demo",
    caption: "Real UI · interactive",
    swipeHint: "Swipe horizontally on narrow screens",
  },
  compare: {
    eyebrow: "Workflow difference",
    title: "Compare",
    subtitle: "Both handle photos — one import later, the gap shows.",
    manual: "Manual",
    manualCaption: "Folder-by-folder management",
    imagefilter: "ImageFilter",
    imagefilterCaption: "A complete culling workflow",
    rows: [
      {
        manual: "Hunt through thousands of RAW files, stars from memory",
        app: "Instant RAW previews; cull with a familiar star system",
      },
      {
        manual: "Judge blur and overexposure by eye — misses are normal",
        app: "AI flags blur, overexposure, and burst duplicates",
      },
      {
        manual: "Rename and create folders by hand, half an hour per shoot",
        app: "Template-based archiving; import straight from the card",
      },
      {
        manual: "Copy-paste import, then forget — no way to verify",
        app: "MD5 verification throughout, traceable and complete",
      },
    ],
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
    loading: "Fetching latest…",
    fetchFailed: "Version unavailable",
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
    moreVersions: "More versions",
    downloading: "Downloading…",
    downloaded: "Downloaded",
    mirrorLabel: "Download via",
    mirrorGithub: "GitHub",
    mirrorFast: "Fast mirror",
    mirrorNote: "Third-party mirror; may be unavailable. Check the file size before installing.",
  },
  macosSign: {
    label: "macOS / SIGNING",
    title: "Won't open? Signing & first launch",
    intro: "The macOS build is not notarized by Apple, so Gatekeeper blocks the first launch.",
    steps: [
      "Drag ImageFilter into Applications.",
      "Open it once, then go to System Settings → Privacy & Security → Open Anyway; or right-click ImageFilter → Open.",
      "If macOS says the app is damaged: run the command below, then open it.",
    ],
    command: "sudo xattr -rd com.apple.quarantine /Applications/ImageFilter.app",
    note: "Still stuck? Open an issue with your macOS version and a screenshot of the error.",
    issue: "Open an issue",
  },
  versions: {
    eyebrow: "All releases",
    title: "All versions",
    subtitle: "Every release and installer pulled from GitHub Releases.",
    back: "Back to home",
    loading: "Loading releases…",
    error: "Could not load releases. Open GitHub Releases instead.",
    empty: "No releases to show yet.",
    latest: "Latest",
    prerelease: "Pre-release",
    published: "Published",
    releaseNotes: "Release notes",
    noAssets: "This release has no installer assets.",
    openReleases: "View all releases on GitHub",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    items: [
      {
        q: "Are my photos uploaded anywhere?",
        a: "No. Decoding, AI detection, and imports all run on your machine; the app only contacts GitHub to check for updates. The mobile gallery service listens on your LAN only and is off by default.",
      },
      {
        q: "Which formats are supported?",
        a: "RAW: ARW, CR2, CR3, NEF, DNG, ORF, RW2, RAF, PEF, SRW. Also JPG, PNG, GIF, BMP, TIFF, WebP, HEIC, HEIF, plus video thumbnails for MP4, MOV, AVI, MKV. DNG has a dedicated built-in decoder.",
      },
      {
        q: "Can I use it commercially or fork it?",
        a: "Yes. ImageFilter is MIT-licensed and the source is public; keep the copyright and license notice when you use, modify, or redistribute it.",
      },
      {
        q: "Does it run on macOS?",
        a: "Yes — a Universal build (Intel and Apple Silicon) is on Releases. That said, the macOS build has not been thoroughly tested on real hardware; please report issues with your OS version and repro steps. Lightroom hand-off and Mica glass are Windows-only.",
      },
    ],
  },
  footer: {
    tagline: "A RAW culling and archiving workflow",
    github: "GitHub Repository",
    douyin: "Douyin",
    email: "mail@tensyn.online",
    mit: "MIT License",
    backToDemo: "Back to Demo",
    copyright: "© 2026 XUTENGXIANG · MIT License",
    product: "Product",
    resources: "Resources",
    contact: "Contact",
  },
};

export const translations: Record<Lang, LandingMessages> = { zh, en };
