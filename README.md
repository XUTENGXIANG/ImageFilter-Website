# ImageFilter 官网

[ImageFilter](https://github.com/XUTENGXIANG/ImageFilter) 桌面应用的落地页与在线演示。线上地址：[https://xutengxiang.github.io/ImageFilter-Website/](https://xutengxiang.github.io/ImageFilter-Website/)（别名 [tensyn.online/imagefilter](https://tensyn.online/imagefilter/)）。

## 结构

```
src/
  landing/       落地页组件(Hero/DemoWindow/Compare/Features/Workflow/Download/Footer/Nav)
  demo/          软件迷你演示(真实 UI + mock 数据层)
    ui/          ← 从主仓库 src/ 同步的副本(见下方"demo/ui 同步")
    mock/        Tauri 命令 mock(fake-data/tauri-mock/placeholder)
  index.css      落地页样式
workers/         Cloudflare Worker 路由(手动部署, 见文件头部注释)
.github/workflows/deploy.yml   GitHub Pages 自动部署
```

## 开发

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build
npm run lint       # oxlint
npx vitest run     # mock 数据层确定性测试
```

## demo/ui 同步（重要）

`src/demo/ui/` 是主仓库 `src/` 的**逐文件副本**（网页演示"零修改"运行软件真实 UI）。主仓库每次改动 `src/` 后都必须同步，否则演示会跑旧代码：

```powershell
# 主仓库 → 官网副本(排除入口/样式/类型声明)
$src = "<主仓库路径>\src"; $dst = "src\demo\ui";
Get-ChildItem $src -Recurse -File | Where-Object { $_.Name -notin @("main.tsx","index.css","vite-env.d.ts") } | ForEach-Object {
  $rel = $_.FullName.Substring($src.Length).TrimStart('\');
  $target = Join-Path $dst $rel;
  New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null;
  Copy-Item $_.FullName $target -Force;
}
Remove-Item "$dst\hooks\use-mobile.ts" -ErrorAction SilentlyContinue
```

同步后检查 `src/demo/mock/tauri-mock.ts` 的命令表：主仓库新增/删除 Tauri 命令时，mock 表要同步增删（未知命令会抛错，fail-fast）。

## 部署

- GitHub Pages：push `master` 后 Actions 自动构建部署
- Cloudflare Worker（tensyn.online 前缀转发）：手动粘贴 `workers/` 下对应脚本，步骤见文件头部注释

## 下载信息维护

`src/landing/Download.tsx` 的 `CN_DOWNLOADS` / `downloadLinks` 与 `src/landing/i18n.ts` 的 `download.version` 指向具体版本资产。**发布新版本（建 GitHub Release）时三处必须同步更新**，否则下载页会 404。

## 动效组件说明

`src/demo/ui/components/` 下的 BorderGlow/ClickSpark/LiquidEther/ParticleText/SpecularButton 等为 React Bits 风格动效（JS/JSX 变体 + `.d.ts` 声明）。改 GL 生命周期相关代码（LiquidEther）时注意：`main.tsx` 为兼容其 WebGL 双挂载行为禁用了 StrictMode，除非同时修好 dispose 路径，不要重新启用。
