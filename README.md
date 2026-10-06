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

同步后必查这几处 —— 少一处就在**网站这边**炸（`tsc -b` 报错或打开设置面板时 ReferenceError），而且报错信息不会告诉你"这是同步落下的"：

| # | 要查什么 | 落在哪 |
|---|---|---|
| 1 | **命令表增删**：主仓库 `generate_handler!` 里新增/删除的命令，mock 要同步（未知命令直接 throw，fail-fast） | `src/demo/mock/tauri-mock.ts` |
| 2 | **新增的 `@tauri-apps/*` 导入**：三处一起加 —— bundle alias、tsc 的 `declare module`、mock 里的对应导出 | `vite.config.ts` + `src/demo/mock/tauri-types.d.ts` + `tauri-mock.ts` |
| 3 | **构建期全局**（如 `__APP_VERSION__`）：声明 + `define` 都要有（主仓库 `vite-env.d.ts` 不在同步名单里） | `src/vite-env.d.ts` + `vite.config.ts` |
| 4 | **`App` 的必传参数**：1.1.1 起是 `osCapabilities`（真机由主仓库 `main.tsx` 探测后传入，而 `main.tsx` 不参与同步） | `src/demo/ImageFilterDemo.tsx` |
| 5 | **版本号**：改成主仓库 `package.json` 的 version（不能拿本仓库的 `0.0.0` 顶替） | `src/demo/app-version.ts` |

> 1.1.2 这次同步踩到的就是 1/2/3/4/5 全部五项：Phase 7 那 5 个命令漂移、`plugin-opener` 与 `api/app` 没 alias/声明、`__APP_VERSION__` 没有 define、`App` 多要一个 `osCapabilities`、版本号停在 1.0.0。

## 部署

- GitHub Pages：push `master` 后 Actions 自动构建部署
- Cloudflare Worker（tensyn.online 前缀转发）：手动粘贴 `workers/` 下对应脚本，步骤见文件头部注释

> ⚠️ `vite.config.ts` 里 `base: "/"`（为 tensyn.online 根路径部署）。因此 **github.io 那个地址其实取不到资源**：页面 HTML 里是 `/assets/...` 绝对路径，在 `xutengxiang.github.io/ImageFilter-Website/` 下会解析成 `xutengxiang.github.io/assets/...` → 404。线上真正能用的是 `https://tensyn.online/imagefilter/`。要让两个地址都能用，把 `base` 改成 `"./"`（相对路径）即可。

## 下载信息维护

下载区的**版本号与三条直链都不再写死**：打开页面时问一次 GitHub 的 `/releases/latest`，徽章显示 `tag_name`、三张卡片的文件名与直链都从该 release 的附件里挑（`-setup.exe` / `.msi` / `.dmg`）。取不到就显示"版本获取失败"，按钮退到 Releases 页 —— 所以**发新版不用再回来改这里**。

只有 `src/landing/Download.tsx` 的 `CN_DOWNLOADS`（蓝奏云国内直链）仍是手动的：换了安装包得自己重传、并把 `name` 里的版本号与 `password` 一起改掉（页面不会跟着变）。


## 动效组件说明

`src/demo/ui/components/` 下的 BorderGlow/ClickSpark/LiquidEther/ParticleText/SpecularButton 等为 React Bits 风格动效（JS/JSX 变体 + `.d.ts` 声明）。改 GL 生命周期相关代码（LiquidEther）时注意：`main.tsx` 为兼容其 WebGL 双挂载行为禁用了 StrictMode，除非同时修好 dispose 路径，不要重新启用。

## 许可

MIT 许可证，见 [LICENSE](LICENSE)（与主仓库同一份文本、同一版权所有者）。页脚的「MIT 许可」指向主仓库的 `LICENSE`。
