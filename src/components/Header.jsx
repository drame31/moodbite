import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Moods',        href: '#moods' },
  { label: 'Recs',         href: '#recommendations' },
  { label: 'Favorites',    href: '#favorites' },
  { label: 'How it works', href: '#how-it-works' },
];

export default function Header({ theme, onThemeToggle }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 dark:bg-espresso/90 border-b border-sand dark:border-bark backdrop-blur-sm">
      <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          className="font-display font-bold text-lg text-ink dark:text-parchment hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango focus-visible:ring-offset-2 rounded-sm"
          aria-label="MoodBite — home"
        >
          MoodBite<span className="text-tomato">·</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Nav links — hidden on mobile */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 mr-2">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-ink-soft dark:text-parchment-soft hover:text-ink dark:hover:text-parchment transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-cream-muted dark:hover:bg-espresso-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato dark:focus-visible:ring-mango"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}
