import { describe, it, expect } from "vitest";
import { getDrives, getPhotos, getExif } from "./fake-data";

describe("fake-data", () => {
  it("返回 3 个设备, 可移动设备在前", () => {
    const d = getDrives();
    expect(d).toHaveLength(3);
    expect(d[0].driveType).toBe("removable");
  });
  it("同一路径的 EXIF 确定性一致", () => {
    const p = "FAKE:/SD/DCIM/100CANON/IMG_0001.CR2";
    expect(getExif(p)).toEqual(getExif(p));
  });
  it("照片扩展名在 RAW/JPG 集合内", () => {
    const photos = getPhotos("FAKE:/SD/DCIM/100CANON");
    expect(photos.length).toBeGreaterThan(0);
    for (const ph of photos)
      expect(ph.path).toMatch(/\.(CR2|ARW|DNG|JPG|NEF)$/i);
  });
});
