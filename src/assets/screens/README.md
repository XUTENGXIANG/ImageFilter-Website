# 首屏截图素材

- `light-demo.png`：按用户提供的浅色 demo 状态，从当前 1.3.0 demo **重新截取**（2268×1122，修复浅色主题黑底后），用于首屏拼贴的主界面/网格/详细信息裁切。
- `device-tree-light.png`：从当前 1.3.0 demo 重新截取的浅色设备树（480×640，修复树行重叠后），用于首屏左上角卡片。
- `../app-grid.jpg`：主仓库 `assets/screenshot-light-clean.jpg`，彩色 DEMO 卡片；用于首屏主窗口和「演示数据」卡片。

首屏不再使用图库占位照片；如果以后换回真实照片，替换 `HeroCollage.tsx` 的 `shots` 数据与对应资源即可。
