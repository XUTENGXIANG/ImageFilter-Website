/**
 * tensyn.online — /imagefilter/* 前缀保留转发
 *
 * 作用: 让官网在 https://tensyn.online/imagefilter/ 子路径下访问,
 *       同时保持 GitHub Pages 根路径源站不变。
 *
 * 工作原理:
 *   1. 请求 pathname 以 /imagefilter 开头 → 去掉前缀, 转发到本域根路径
 *      (tensyn.online 回源到 GitHub Pages)
 *   2. 转发出去的请求(不带 /imagefilter 前缀)不会再次命中本路由 → 不会循环
 *
 * 部署方式(Cloudflare Dashboard):
 *   1. dash.cloudflare.com → Workers & Pages → 创建 Worker → 粘贴本文件代码 → Deploy
 *   2. 在 Worker 的 Settings → Routes(路由) 添加: tensyn.online/imagefilter/*
 *   3. 完成: https://tensyn.online/imagefilter/ 可访问
 */
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 仅处理 /imagefilter 前缀(含 /imagefilter 本身)
    if (url.pathname.startsWith("/imagefilter")) {
      const stripped = url.pathname.replace(/^\/imagefilter/, "") || "/";
      const target = `https://tensyn.online${stripped}${url.search}`;
      return fetch(target, request);
    }

    // 其余路径原样回源
    return fetch(request);
  },
};
