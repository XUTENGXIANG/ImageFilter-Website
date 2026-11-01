# 首屏照片占位

这 6 张是原型用的图库占位图（Picsum / Unsplash 授权），**上线前必须替换为用户自有作品**。

需要：4 张竖构图 3:4 + 2 张横构图 3:2，长边 ≥1200px，sRGB，JPEG/WebP，单张构建后 ≤200KB。

替换时保持文件名不变：

- `photo-01.jpg`（竖，p1）
- `photo-02.jpg`（竖，p2）
- `photo-03.jpg`（竖，pf）
- `photo-04.jpg`（横，p3）
- `photo-05.jpg`（竖，p7）
- `photo-06.jpg`（横，p9）

卡片说明里的文件名/拍摄信息在 `src/landing/HeroCollage.tsx` 的 `PHOTOS` 数组里，替换照片后同步改成实际信息。
