import { Utensils, Coffee, Music, Sunset, ExternalLink } from 'lucide-react';

// Defense-in-depth: only render playlist anchors for https:// URLs.
// Rejects javascript:/data:/other schemes if a contributor adds a bad record.
const isSafeUrl = (url) => typeof url === 'string' && url.startsWith('https://');

// Individual info cell in the 2×2 grid
function InfoCell({ icon: Icon, label, value, note, extra }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Icon size={14} className="text-ink-muted dark:text-parchment-muted shrink-0" />
        <span className="font-mono text-xs text-ink-muted dark:text-parchment-muted uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="font-sans text-lg font-semibold text-ink dark:text-parchment leading-snug">{value}</div>
      {note && <div className="font-sans text-sm text-ink-soft dark:text-parchment-soft">{note}</div>}
      {extra}
    </div>
  );
}

// The editorial recommendation card: header band + 2×2 info grid.
// Tags, prep time, intensity, and actions live in RecommendationMeta (right column on desktop).
export default function RecommendationCard({ recommendation }) {
  const { food, drink, playlist, ambiance, description, emoji, colorTheme, title } = recommendation;

  return (
    <div
      className="relative rounded-2xl shadow-lg overflow-hidden h-full"
      style={{
        '--mood-accent':       colorTheme.accent,
        '--mood-accent-dark':  colorTheme.accentDark,
        '--mood-accent-light': colorTheme.accentLight,
        '--mood-accent-dim':   colorTheme.accentDim,
        borderLeft: '3px solid var(--mood-accent)',
      }}
    >
      {/* Header area with mood tint (light/dark handled in index.css .mood-header) */}
      <div className="mood-header px-6 pt-6 pb-4">
        <div className="flex items-start gap-3">
          <span className="text-4xl mt-1 shrink-0" aria-hidden="true">{emoji}</span>
          <div>
            <h3 className="font-display text-2xl font-bold text-ink dark:text-parchment leading-tight">
              {title}
            </h3>
            <p className="font-display italic text-base text-ink-soft dark:text-parchment-soft mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Info grid — 2×2 */}
      <div className="px-6 pb-6 bg-cream-card dark:bg-espresso-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4 sm:py-5 border-t border-sand-muted dark:border-bark-muted">
          <InfoCell icon={Utensils} label="Food" value={food.name} note={food.note} />
          <InfoCell icon={Coffee}   label="Drink" value={drink.name} note={drink.note} />
          <InfoCell
            icon={Music}
            label="Playlist"
            value={playlist.name}
            note={playlist.description}
            extra={
              isSafeUrl(playlist.url) ? (
                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Listen on Spotify: ${playlist.name} (opens in new tab)`}
                  className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted dark:text-parchment-muted no-underline hover:text-ink dark:hover:text-parchment transition-colors duration-150 mt-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tomato border-b border-transparent hover:border-ink-muted dark:hover:border-parchment-muted"
                >
                  <ExternalLink size={10} />
                  Listen on Spotify
                </a>
              ) : null
            }
          />
          <InfoCell icon={Sunset} label="Ambiance" value={ambiance} />
        </div>
      </div>
    </div>
  );
}
