export const REPOSITORY = "XUTENGXIANG/ImageFilter";
export const RELEASES_PAGE = `https://github.com/${REPOSITORY}/releases`;
export const LATEST_RELEASE_API = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;
export const ALL_RELEASES_API = `https://api.github.com/repos/${REPOSITORY}/releases?per_page=100`;

/** 三张卡片（= download.cards 的顺序）各自从 release 附件里挑哪一个 */
export const ASSET_MATCHERS: ((name: string) => boolean)[] = [
  (name) => /-setup\.exe$/i.test(name), // NSIS 安装包
  (name) => /\.msi$/i.test(name), // MSI
  (name) => /\.dmg$/i.test(name), // macOS
  (name) => /\.apk$/i.test(name), // Android
];
