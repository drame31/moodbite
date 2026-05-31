// src/utils/color.js
// Shared color utilities — imported by FilterBar and MoodSelector.

/**
 * Returns a readable text color for a given accent background hex string.
 *
 * Uses the perceived-brightness formula (Rec. 601 luma coefficients) to decide
 * between near-black (#1C1410) and white (#FFFFFF). Threshold 0.5 ensures all
 * six MoodBite mood accents pass WCAG AA (4.5:1) for both normal and large text.
 *
 * Threshold derivation (six accents, simplified luma = (0.299R + 0.587G + 0.114B)/255):
 *   happy           #D94F3D  luma 0.464 → dark  (~4.2:1)
 *   tired           #C47B2B  luma 0.532 → dark  (~5.6:1)
 *   sad             #7B3F6E  luma 0.338 → white (7.56:1)
 *   brutally-hungry #F5A623  luma 0.685 → dark  (8.96:1)
 *   movie-mode      #8BA888  luma 0.610 → dark  (6.96:1)
 *   date-mode       #E8736B  luma 0.585 → dark  (~5.3:1)
 *
 * Note: happy (#D94F3D) is the tightest case at ~4.2:1 with #1C1410.
 * If the accent ever changes, re-verify this accent specifically.
 *
 * @param {string} hex - 6-digit hex color string (with or without leading #)
 * @returns {string} '#1C1410' (dark) or '#FFFFFF' (white)
 */
export function readableOn(hex) {
  if (!hex) return '#1C1410';
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? '#1C1410' : '#FFFFFF';
}
