/**
 * 用隐藏 iframe 触发浏览器原生下载。
 *
 * 为什么不直接给 <a> 加 target="_blank"：会开新标签页/闪一下；
 * 为什么不用 fetch + Blob：GitHub 资源动辄 20MB+，缓存完才保存，慢且占内存。
 * iframe 里收到 Content-Disposition: attachment 就会下载，当前页面保持不变；
 * 失败时也只是在隐藏 iframe 里显示错误页，不会把落地页顶掉。
 */
export function triggerIframeDownload(url: string) {
  if (typeof document === "undefined" || !url) return;

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.setAttribute("aria-hidden", "true");
  iframe.title = "download";
  iframe.src = url;
  document.body.appendChild(iframe);

  // 下载已经交给浏览器下载管理器；iframe 留久一点再清理，避免慢速连接在响应前被移除。
  window.setTimeout(() => iframe.remove(), 300_000);
}
