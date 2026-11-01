# Android APK

- `ImageFilter-Mobile-1.3.0-ui.apk`：从主仓库 `release/android/` 只读复制的 1.3.0 UI 构建。
- 官网页面的 Android 卡优先使用 GitHub Release 里的 `.apk` 附件；没有时回退到这个文件。
- 发新版时替换此文件并同步修改 `src/landing/Download.tsx` 的 `LOCAL_ANDROID` 文件名。
