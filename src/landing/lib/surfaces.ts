/**
 * Shared frosted-card surface.
 *
 * Kept as one utility string so Card, the macOS disclosure and the versions
 * release cards stay in sync. The liquid background sits behind it; the
 * backdrop blur is what makes the glow readable through the card.
 */
export const glassCard =
  "border border-line bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-lg backdrop-saturate-150";
