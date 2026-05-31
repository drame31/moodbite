import { X, Clock } from 'lucide-react';
import { MOODS, TAG_LABELS } from '../data/moodRecommendations';

const MOOD_LABEL = Object.fromEntries(MOODS.map(m => [m.id, m.label]));

// Compact horizontal favorite card: emoji thumbnail + condensed info + remove button.
// Deliberately lighter than RecommendationCard so saved items don't compete with the
// main recommendation (r2-uxui-spec §7 / r4-design-review #5).
export default function FavoriteCard({ fav, onRemove }) {
  const { title, emoji, mood, tags, estimatedPrepTime, colorTheme } = fav;
  const prep = estimatedPrepTime && /^\d/.test(estimatedPrepTime) ? `~${estimatedPrepTime}` : estimatedPrepTime;

  return (
    <div
      className="relative flex gap-3 items-stretch rounded-xl border border-sand dark:border-bark bg-cream-card dark:bg-espresso-card p-3 pr-10"
      style={{ borderLeft: `3px solid ${colorTheme.accent}` }}
    >
      {/* Thumbnail */}
      <div
        className="w-14 h-14 shrink-0 rounded-lg flex items-center justify-center text-2xl"
        style={{ backgroundColor: colorTheme.accentLight }}
        aria-hidden="true"
      >
        {emoji}
      </div>

      {/* Info */}
      <div className="min-w-0 flex flex-col justify-center">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted dark:text-parchment-muted">
          {MOOD_LABEL[mood] ?? mood}
        </span>
        <h4 className="font-sans font-semibold text-md text-ink dark:text-parchment truncate">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-ink-muted dark:text-parchment-muted">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className="font-mono text-xs uppercase tracking-wider">
              {TAG_LABELS[tag] ?? tag}
            </span>
          ))}
          {estimatedPrepTime && (
            <span className="inline-flex items-center gap-1 font-mono text-xs">
              <Clock size={11} className="shrink-0" />
              {prep}
            </span>
          )}
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        aria-label={`Remove ${title} from favorites`}
        onClick={() => onRemove(fav.id)}
        className="absolute top-1/2 -translate-y-1/2 right-1 text-ink-muted dark:text-parchment-muted hover:text-tomato dark:hover:text-tomato-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <X size={16} />
      </button>
    </div>
  );
}
