// ---------------------------------------------------------------------------
// SVG placeholder data-URL generator — deterministic per path
// Gradient tone selected by hash + camera icon in center + noise overlay
// ---------------------------------------------------------------------------

/** DJB2 hash — must match fake-data.ts so placeholders stay deterministic */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 12 nice-enough gradient colour-stop pairs (pre-baked HSL)
const PALETTES: [string, string][] = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#a18cd1", "#fbc2eb"],
  ["#fbc2eb", "#a6c1ee"],
  ["#fccb90", "#d57eeb"],
  ["#e0c3fc", "#8ec5fc"],
  ["#f5576c", "#ff9a9e"],
  ["#48c6ef", "#6f86d6"],
  ["#cd9cf2", "#f6f3ff"],
];

/** SVG camera icon (minimal) */
const CAMERA_ICON =
  `<g fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">` +
  `<rect x="11" y="16" width="30" height="22" rx="3"/><path d="M41 18h4a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V21a3 3 0 013-3h4"/><circle cx="26" cy="27" r="5"/>` +
  `</g>`;

/**
 * Build an inline SVG data-URL for the given path.
 * @param path   FAKE:/… path
 * @param size   width/height in px (256 for thumbnails, 1600 for full)
 */
function makePlaceholder(path: string, size: number): string {
  const seed = hashStr(path + "::placeholder");
  const rng = mulberry32(seed);
  const [c1, c2] = PALETTES[Math.floor(rng() * PALETTES.length)];

  // noise filter (tiny random circles)
  let noiseElements = "";
  for (let i = 0; i < 40; i++) {
    const cx = rng() * size;
    const cy = rng() * size;
    const r = 0.5 + rng() * 3;
    const a = 0.02 + rng() * 0.06;
    noiseElements +=
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(2)}" fill="rgba(0,0,0,${a.toFixed(3)})"/>`;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>` +
    `<rect width="${size}" height="${size}" fill="url(#g)"/>` +
    `<g transform="translate(${(size - 52) / 2},${(size - 44) / 2})">${CAMERA_ICON}</g>` +
    noiseElements +
    `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ---- Public API ----

export function thumbnail(path: string): string {
  return makePlaceholder(path, 256);
}

export function fullImage(path: string): string {
  return makePlaceholder(path, 1600);
}

/** Convenience: pick the right size based on path convention */
export function forPath(path: string): string {
  if (path.includes("/thumb/")) return makePlaceholder(path, 256);
  if (path.includes("/preview/")) return makePlaceholder(path, 800);
  if (path.includes("/full/")) return makePlaceholder(path, 1600);
  return makePlaceholder(path, 256);
}
