import { readableOn } from '../utils/color';
import { TAG_LABELS } from '../data/moodRecommendations';

// FilterBar receives zeroMatchTags from App.jsx — an array of tag slugs that have
// zero matching recs for the active mood. These chips are dimmed but NOT removed,
// so the layout stays stable and screen readers know they exist but are unavailable.
export default function FilterBar({
  availableTags,
  activeTags,
  onTagToggle,
  onClearFilters,
  disabled,
  moodAccent,
  zeroMatchTags = [],
  moodLabel = '',
}) {
  return (
    <div
      role="group"
      aria-label="Filter recommendations by tag"
      className={`flex flex-wrap items-center gap-2 mb-6 ${disabled ? 'opacity-40' : ''}`}
    >
      {availableTags.map(tag => {
        const isActive = activeTags.includes(tag);
        const label = TAG_LABELS[tag] ?? tag;
        // A tag is dimmed when a mood is selected and that tag has zero matching recs.
        // Do not dim active tags (active selection should stay visible to show current state).
        const isDimmed = !disabled && !isActive && zeroMatchTags.includes(tag);

        if (isDimmed) {
          return (
            // Dimmed chip: opacity 0.38, pointer-events none, aria-disabled.
            // Uses aria-disabled NOT the disabled attribute — disabled removes from a11y tree.
            <span
              key={tag}
              role="button"
              aria-disabled="true"
              aria-label={`${label} — no matches for ${moodLabel}`}
              tabIndex={-1}
              className="font-sans text-sm px-3 py-1.5 rounded-full border min-h-[44px] min-w-[44px] inline-flex items-center font-medium border-sand dark:border-bark text-ink-soft dark:text-parchment-soft cursor-not-allowed"
              style={{
                opacity: 0.38,
                pointerEvents: 'none',
                transition: 'opacity 200ms ease',
              }}
            >
              {label}
            </span>
          );
        }

        return (
          <button
            key={tag}
            type="button"
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isActive}
            aria-label={isActive ? `Remove ${label} filter` : `Filter by ${label}`}
            onClick={() => !disabled && onTagToggle(tag)}
            // Inline style handles background transition across class↔inline-style boundary
            style={{
              backgroundColor: isActive ? moodAccent : undefined,
              color: isActive ? readableOn(moodAccent) : undefined,
              transition: 'background-color 150ms ease, color 150ms ease, opacity 200ms ease',
            }}
            className={[
              'font-sans text-sm px-3 py-1.5 rounded-full border min-h-[44px] min-w-[44px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango focus-visible:ring-offset-1',
              isActive
                ? 'font-semibold border-transparent shadow-sm hover:brightness-90 active:brightness-75 transition-all duration-150'
                : 'font-medium border-sand dark:border-bark text-ink-soft dark:text-parchment-soft hover:bg-cream-muted dark:hover:bg-espresso-muted transition-colors duration-150',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}

      {/* Clear all — only visible when filters are active */}
      {activeTags.length > 0 && !disabled && (
        <button
          type="button"
          onClick={onClearFilters}
          aria-label="Remove all active filters"
          className="ml-auto font-sans text-sm text-ink-muted dark:text-parchment-muted underline underline-offset-2 hover:text-ink dark:hover:text-parchment transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
