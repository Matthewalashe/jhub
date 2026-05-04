import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { to: '/jobs', label: 'Jobs' },
  { to: '/opportunities', label: 'Opportunities' },
  { to: '/cv-builder', label: 'Build CV' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome || mobileOpen
          ? 'bg-white/92 backdrop-blur-xl border-b-2 border-ink'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo — Bauhaus bold */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-ink no-underline group"
          >
            <div className="w-9 h-9 bg-primary flex items-center justify-center border-2 border-ink shadow-brutal-sm group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
              <span className="text-white font-bold text-sm tracking-tight">J</span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight hidden sm:block">
              Jhub
            </span>
          </Link>

          {/* Center nav — Brutalist pill bar */}
          <nav className="hidden md:flex items-center" aria-label="Primary navigation">
            <div className="flex items-center border-2 border-ink bg-white">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-5 py-2.5 text-sm font-bold tracking-wide transition-colors no-underline border-r-2 border-ink last:border-r-0',
                    location.pathname.startsWith(link.to)
                      ? 'bg-primary text-white'
                      : 'text-ink hover:bg-primary-soft'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right — CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="hidden md:inline-flex btn-brutal bg-accent text-ink text-sm px-5 py-2.5 no-underline"
            >
              Get Started
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 border-2 border-ink bg-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-ink bg-white animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-3 text-sm font-bold border-2 border-ink no-underline transition-colors',
                  location.pathname.startsWith(link.to)
                    ? 'bg-primary text-white'
                    : 'text-ink hover:bg-primary-soft'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="px-4 py-3 text-sm font-bold border-2 border-ink bg-accent text-ink no-underline mt-1"
            >
              Get Started →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
