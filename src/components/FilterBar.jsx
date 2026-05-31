import { readableOn } from '../utils/color';
import { TAG_LABELS } from '../data/moodRecommendations';

export default function FilterBar({ availableTags, activeTags, onTagToggle, onClearFilters, disabled, moodAccent }) {
  return (
    <div
      role="group"
      aria-label="Filter recommendations by tag"
      className={`flex flex-wrap items-center gap-2 mb-6 ${disabled ? 'opacity-40' : ''}`}
    >
      {availableTags.map(tag => {
        const isActive = activeTags.includes(tag);
        const label = TAG_LABELS[tag] ?? tag;

        return (
          <button
            key={tag}
            type="button"
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isActive}
            aria-label={isActive ? `Remove ${label} filter` : `Filter by ${label}`}
            onClick={() => !disabled && onTagToggle(tag)}
            // Inline style handles background transition across class↔inline-style boundary (r5 §1F)
            style={{
              backgroundColor: isActive ? moodAccent : undefined,
              color: isActive ? readableOn(moodAccent) : undefined,
              transition: 'background-color 150ms ease, color 150ms ease',
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
