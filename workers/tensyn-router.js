/**
 * tensyn.online 主路由 Worker — 路径分发
 *
 * 用途: 根路径给个人站, /imagefilter/* 给 ImageFilter 官网。
 *
 * 前置准备(做个人站时需要):
 *   ImageFilter 仓库的 vite base 改为 "/imagefilter/"
 *   (改后官网所有资源请求都带 /imagefilter 前缀, 不会和个人站冲突)
 *
 * 部署步骤(替换掉现在的 imagefilter-proxy):
 *   1. Workers & Pages → 编辑现有 Worker(或新建) → 粘贴本文件 → Deploy
 *   2. Settings → Routes: 删除旧的 tensyn.online/imagefilter/* 路由
 *   3. 添加路由 tensyn.online/* → 本 Worker
 *   4. 完成: tensyn.online → 个人站; tensyn.online/imagefilter → 官网
 */

// ═══ 个人站内容(编辑这里) ═══
const PERSONAL_SITE_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>我的个人站</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0d12; color: #e6e8ee;
           display: flex; flex-direction: column; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; }
    a { color: #a78bfa; }
  </style>
</head>
<body>
  <h1>你好，我是 [你的名字]</h1>
  <p>这里是我的个人站</p>
  <p><a href="/imagefilter/">ImageFilter 官网</a></p>
</body>
</html>`;

export default {
  async fetch(request) {
    // 循环防护: 内部转发请求直接回源(GitHub Pages), 不再分发
    if (request.headers.get("x-proxy-internal") === "1") {
      return fetch(request);
    }

    const url = new URL(request.url);

    // ImageFilter 官网: 去掉 /imagefilter 前缀 → 转发本域根路径(回源 GitHub Pages)
    if (url.pathname.startsWith("/imagefilter")) {
      const stripped = url.pathname.replace(/^\/imagefilter/, "") || "/";
      const target = `https://tensyn.online${stripped}${url.search}`;
      const headers = new Headers(request.headers);
      headers.set("x-proxy-internal", "1");
      return fetch(target, { method: request.method, headers, body: request.body });
    }

    // 其余路径 → 个人站
    return new Response(PERSONAL_SITE_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
};
