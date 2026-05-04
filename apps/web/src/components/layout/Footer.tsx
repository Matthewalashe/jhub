import { Link } from 'react-router-dom';

const EXPLORE_LINKS = [
  { label: 'Jobs', to: '/jobs' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'Build CV', to: '/cv-builder' },
];

const TOOL_LINKS = [
  { label: 'Profile Builder', to: '/profile' },
  { label: 'CV Templates', to: '/cv-builder' },
  { label: 'Cover Letter', to: '/cover-letter' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-ink bg-white no-print">
      <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 no-underline group">
              <div className="w-8 h-8 bg-primary flex items-center justify-center border-2 border-ink">
                <span className="text-white font-bold text-xs">J</span>
              </div>
              <span className="font-display text-lg font-bold text-ink">Jhub</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Build your profile once.<br />
              Apply to anything, anywhere, in minutes.
            </p>
          </div>

          {/* Nav grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-bold uppercase tracking-widest text-ink mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary inline-block" />
                Explore
              </div>
              {EXPLORE_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted hover:text-primary no-underline transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-bold uppercase tracking-widest text-ink mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent inline-block" />
                Tools
              </div>
              {TOOL_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted hover:text-primary no-underline transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-bold uppercase tracking-widest text-ink mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-error inline-block rounded-full" />
                Company
              </div>
              <a href="/#about" className="text-sm text-muted hover:text-primary no-underline transition-colors">
                About
              </a>
              <a href="mailto:hello@jhub.ng" className="text-sm text-muted hover:text-primary no-underline transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-ink bg-surface">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-muted">
            © {year} Jhub. Built for Nigeria 🇳🇬
          </span>
          <span className="text-xs text-muted">
            Free for job seekers, always.
          </span>
        </div>
      </div>
    </footer>
  );
}
