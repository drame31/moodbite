// RecommendationDetails — "WHY THIS FITS" zone
// Sits between the .mood-header band and the 2×2 info grid inside RecommendationCard.
// Spec: rb-uxui-direction.md §3. Copy: rb-copy-system.md §8.
// No interactive elements — always visible when recommendation is shown.
export default function RecommendationDetails({ reason }) {
  if (!reason) return null;

  return (
    <div
      className="px-6 py-4 bg-cream-card dark:bg-espresso-card border-t border-sand-muted dark:border-bark-muted border-b"
      aria-label="Why this recommendation matches your mood"
    >
      {/* Eyebrow — JetBrains Mono xs uppercase, rendered via CSS text-transform */}
      <p className="font-mono text-xs text-ink-soft dark:text-parchment-soft uppercase tracking-wider mb-1.5">
        Why this fits
      </p>
      {/* Reason text — DM Sans base, regular weight, never italic */}
      <p className="font-sans text-base text-ink-soft dark:text-parchment-soft">
        {reason}
      </p>
    </div>
  );
}
