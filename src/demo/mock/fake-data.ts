// ---------------------------------------------------------------------------
// Types (mirror main-project types so mock is fully self-contained)
// ---------------------------------------------------------------------------

export interface DriveInfo {
  mountPoint: string;
  driveType: string;
  label: string;
  available: boolean;
}

export interface PhotoExif {
  cameraMake?: string;
  cameraModel?: string;
  lensModel?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  dateTaken?: string;
  imageWidth?: number;
  imageHeight?: number;
  fileSize: number;
}

export interface ScannedPhoto {
  path: string;
  fileName: string;
  fileSize: number;
  isRaw: boolean;
  isVideo: boolean;
  modifiedAt: number;
  exif: PhotoExif;
  star?: number; // 0-5 rating
}

export interface FolderEntry {
  path: string;
  name: string;
  photoCount: number;
  hasSubdirs: boolean;
  subfolders: FolderEntry[];
}

export interface AnalysisResult {
  path: string;
  blurScore: number;
  isBlurry: boolean;
  isOverexposed: boolean;
  isUnderexposed: boolean;
  duplicateGroup?: number;
  isBestInGroup: boolean;
}

export interface ImportProgress {
  fileName: string;
  status: string;
  message: string;
  percent: number;
}

// ---------------------------------------------------------------------------
// Deterministic hash / PRNG (seed = hash of a string)
// Every call with the same path/suffix MUST produce the same stream.
// ---------------------------------------------------------------------------

/** Fixed reference epoch so dateTaken/modifiedAt are deterministic */
const FIXED_NOW = new Date("2026-06-15T12:00:00Z").getTime();

/** DJB2 hash → 32-bit unsigned (used as seed) */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

/** Mulberry32 PRNG (fast, good-enough for fake data) */
function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededRandom(path: string, suffix = ""): () => number {
  return mulberry32(hashStr(path + "::" + suffix));
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CAMERAS: { make: string; model: string }[] = [
  { make: "SONY", model: "ILCE-7M4" },
  { make: "SONY", model: "ILCE-7RM5" },
  { make: "Canon", model: "EOS R5" },
  { make: "Canon", model: "EOS R6" },
  { make: "NIKON", model: "Z8" },
  { make: "NIKON", model: "Z6III" },
  { make: "FUJIFILM", model: "X-T5" },
  { make: "FUJIFILM", model: "GFX100S" },
];

const LENSES: string[] = [
  "FE 24-70mm F2.8 GM II",
  "FE 70-200mm F2.8 GM II",
  "FE 50mm F1.2 GM",
  "FE 16-35mm F2.8 GM",
  "RF 24-70mm F2.8 L IS USM",
  "RF 70-200mm F2.8 L IS USM",
  "NIKKOR Z 24-70mm f/2.8 S",
  "NIKKOR Z 50mm f/1.2 S",
];

const EXTENSIONS = [".CR2", ".ARW", ".DNG", ".JPG", ".NEF"];

// ---------------------------------------------------------------------------
// getDrives
// ---------------------------------------------------------------------------

export function getDrives(): DriveInfo[] {
  return [
    {
      mountPoint: "E:/",
      driveType: "removable",
      label: "CANON_DC",
      available: true,
    },
    {
      mountPoint: "C:/",
      driveType: "fixed",
      label: "本地磁盘",
      available: true,
    },
    {
      mountPoint: "D:/",
      driveType: "fixed",
      label: "照片文件夹",
      available: true,
    },
  ];
}

// ---------------------------------------------------------------------------
// getPhotos
// ---------------------------------------------------------------------------

export function getPhotos(dirPath: string): ScannedPhoto[] {
  if (!dirPath) return [];
  const base = dirPath.replace(/\/+$/, ""); // strip trailing slashes
  const photos: ScannedPhoto[] = [];
  for (let i = 0; i < 24; i++) {
    const num = 1 + i;
    const ext = EXTENSIONS[i % EXTENSIONS.length];
    const path = `${base}/IMG_${String(num).padStart(4, "0")}${ext}`;
    const rng = seededRandom(path);
    const camIdx = Math.floor(rng() * CAMERAS.length);
    const cam = CAMERAS[camIdx];
    const lensIdx = Math.floor(rng() * LENSES.length);

    photos.push({
      path,
      fileName: `IMG_${String(num).padStart(4, "0")}${ext}`,
      fileSize: Math.floor(15 + rng() * 45) * 1024 * 1024,
      isRaw: ext !== ".JPG",
      isVideo: false,
      modifiedAt: FIXED_NOW - Math.floor(rng() * 365 * 24 * 3600 * 1000),
      exif: {
        cameraMake: cam.make,
        cameraModel: cam.model,
        lensModel: LENSES[lensIdx],
        focalLength: `${Math.floor(16 + rng() * 184)}mm`,
        aperture: `f/${[1.2, 1.4, 2.8, 4, 5.6, 8, 11][Math.floor(rng() * 7)]}`,
        shutterSpeed: `1/${Math.floor(30 * 2 ** (rng() * 6))}`,
        iso: [100, 200, 400, 800, 1600, 3200, 6400][Math.floor(rng() * 7)],
        dateTaken: new Date(
          FIXED_NOW - Math.floor(rng() * 365 * 24 * 3600 * 1000),
        ).toISOString(),
        imageWidth: Math.floor(4000 + rng() * 4000),
        imageHeight: Math.floor(4000 + rng() * 4000),
        fileSize: Math.floor(15 + rng() * 45) * 1024 * 1024,
      },
      star: Math.floor(rng() * 6),
    });
  }
  return photos;
}

// ---------------------------------------------------------------------------
// getFolderTree
// ---------------------------------------------------------------------------

export function getFolderTree(mountPoint: string): FolderEntry {
  if (!mountPoint) return { path: "", name: "", photoCount: 0, hasSubdirs: false, subfolders: [] };
  const base = mountPoint.replace(/\/+$/, ""); // strip trailing slashes
  const dcimPath = `${base}/DCIM`;
  const c100Path = `${dcimPath}/100CANON`;
  const c101Path = `${dcimPath}/101CANON`;
  const privPath = `${base}/PRIVATE`;

  const rng = seededRandom(base);
  const c100Count = Math.floor(12 + rng() * 24);
  const c101Count = Math.floor(8 + rng() * 16);
  const privCount = Math.floor(rng() * 6);

  return {
    path: base,
    name: base.split("/").pop() || base,
    photoCount: c100Count + c101Count + privCount,
    hasSubdirs: true,
    subfolders: [
      {
        path: dcimPath,
        name: "DCIM",
        photoCount: c100Count + c101Count,
        hasSubdirs: true,
        subfolders: [
          {
            path: c100Path,
            name: "100CANON",
            photoCount: c100Count,
            hasSubdirs: false,
            subfolders: [],
          },
          {
            path: c101Path,
            name: "101CANON",
            photoCount: c101Count,
            hasSubdirs: false,
            subfolders: [],
          },
        ],
      },
      {
        path: privPath,
        name: "PRIVATE",
        photoCount: privCount,
        hasSubdirs: false,
        subfolders: [],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// getCounts
// ---------------------------------------------------------------------------

export function getCounts(folderPaths: string[]): Record<string, number> {
  if (!folderPaths || folderPaths.length === 0) return {};
  const result: Record<string, number> = {};
  for (const p of folderPaths) {
    const rng = seededRandom(p, "count");
    result[p] = Math.floor(5 + rng() * 40);
  }
  return result;
}

// ---------------------------------------------------------------------------
// getExif  —  deterministic per path
// ---------------------------------------------------------------------------

export function getExif(filePath: string): PhotoExif {
  const rng = seededRandom(filePath, "exif");
  const camIdx = Math.floor(rng() * CAMERAS.length);
  const cam = CAMERAS[camIdx];
  const lensIdx = Math.floor(rng() * LENSES.length);
  const w = Math.floor(4000 + rng() * 4000);
  const h = Math.floor(4000 + rng() * 4000);

  return {
    cameraMake: cam.make,
    cameraModel: cam.model,
    lensModel: LENSES[lensIdx],
    focalLength: `${Math.floor(16 + rng() * 184)}mm`,
    aperture: `f/${[1.2, 1.4, 2.8, 4, 5.6, 8, 11][Math.floor(rng() * 7)]}`,
    shutterSpeed: `1/${Math.floor(30 * 2 ** (rng() * 6))}`,
    iso: [100, 200, 400, 800, 1600, 3200, 6400][Math.floor(rng() * 7)],
    dateTaken: new Date(
      FIXED_NOW - Math.floor(rng() * 365 * 24 * 3600 * 1000),
    ).toISOString(),
    imageWidth: w,
    imageHeight: h,
    fileSize: Math.floor(15 + rng() * 45) * 1024 * 1024,
  };
}

// ---------------------------------------------------------------------------
// getAnalysis  —  deterministic per path
// ---------------------------------------------------------------------------

export function getAnalysis(filePaths: string[]): AnalysisResult[] {
  let bestGroupSeed = 0;
  const result: AnalysisResult[] = [];

  for (const p of filePaths) {
    const rng = seededRandom(p, "analysis");
    const blurScore = +(rng() * 100).toFixed(1);
    const group = rng() > 0.7 ? (bestGroupSeed++ % 5) + 1 : undefined;

    result.push({
      path: p,
      blurScore,
      isBlurry: blurScore > 70,
      isOverexposed: rng() > 0.85,
      isUnderexposed: rng() > 0.85,
      duplicateGroup: group,
      isBestInGroup: group !== undefined && rng() > 0.5,
    });
  }
  return result;
}
