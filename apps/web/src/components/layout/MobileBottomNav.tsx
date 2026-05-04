import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, FileText, Compass, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const TABS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/cv-builder', label: 'Build CV', icon: FileText },
  { to: '/opportunities', label: 'Discover', icon: Compass },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-ink no-print"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {TABS.map((tab) => {
          const isActive =
            tab.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.to);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2 py-1.5 no-underline transition-colors min-w-[56px]',
                isActive ? 'text-primary' : 'text-muted'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-bold tracking-wide">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
