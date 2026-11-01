export const REPOSITORY = "XUTENGXIANG/ImageFilter";
export const RELEASES_PAGE = `https://github.com/${REPOSITORY}/releases`;
export const LATEST_RELEASE_API = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;
export const ALL_RELEASES_API = `https://api.github.com/repos/${REPOSITORY}/releases?per_page=100`;

// ─── 国内直链（蓝奏云）────────────────────────────────────────
// 手动添加直链的方法：
//   1. 在蓝奏云上传新版本安装包，复制分享链接
//   2. 在下面的数组中新增一条记录（建议按平台排序）：
//      { name: "文件名（页面展示用，建议带版本号）", href: "蓝奏云分享链接", password: "访问密码(无则省略)" }
//   3. 版本全览页会按数组顺序自动渲染，点击即在新标签页打开
// 注意：这一份是**手动**的 —— 走 GitHub 的安装包已经自动取最新版了，这里不会跟着变。
// 换了新安装包就得自己重传蓝奏云、把 name 里的版本号与 password 一起改掉。
export const CN_DOWNLOADS = [
  {
    name: "ImageFilter_1.0.0_x64-setup.exe",
    password: "fih2",
    href: "https://wwbny.lanzoue.com/iO3ka420hdmj?webpage=AjMAYF47UjBVNlQ2BmECM1M9AjBScQU0AjVWZ1M7UmcDM1o_aCmQAbQgiUzQ_c",
  },
  {
    name: "ImageFilter_1.0.0_universal.dmg",
    password: "hx0o",
    href: "https://wwbny.lanzoue.com/i6bKM420hclc?webpage=BDVSMghtDmxVNgJgBmFWZwFvU2ECIQc2ADdUZQJqWm9XZwJnDWBTNVJ4AmU_c",
  },
];

/** 三张卡片（= download.cards 的顺序）各自从 release 附件里挑哪一个 */
export const ASSET_MATCHERS: ((name: string) => boolean)[] = [
  (name) => /-setup\.exe$/i.test(name), // NSIS 安装包
  (name) => /\.msi$/i.test(name), // MSI
  (name) => /\.dmg$/i.test(name), // macOS
];
