import { useState, useMemo } from 'react';
import { ExternalLink, Calendar, MapPin, BookOpen, GraduationCap, CalendarDays } from 'lucide-react';
import { scholarships } from '../data/scholarships';
import { courses } from '../data/courses';
import { events } from '../data/events';
import { cn } from '../lib/utils';

const TABS = ['All', 'Scholarships', 'Courses', 'Events'] as const;
type Tab = typeof TABS[number];

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const items = useMemo(() => {
    const all: { type: string; id: string; title: string; subtitle: string; meta: string; link: string; tag: string }[] = [];

    if (activeTab === 'All' || activeTab === 'Scholarships') {
      scholarships.forEach(s => all.push({
        type: 'scholarship', id: s.id, title: s.title, subtitle: s.provider,
        meta: `${s.country} · Deadline: ${s.deadline}`, link: s.link, tag: 'Scholarship',
      }));
    }
    if (activeTab === 'All' || activeTab === 'Courses') {
      courses.forEach(c => all.push({
        type: 'course', id: c.id, title: c.title, subtitle: c.provider,
        meta: `${c.mode} · ${c.priceNote}`, link: c.link, tag: c.category,
      }));
    }
    if (activeTab === 'All' || activeTab === 'Events') {
      events.forEach(e => all.push({
        type: 'event', id: e.id, title: e.title, subtitle: e.organizer,
        meta: `${e.city} · ${e.date}`, link: e.link, tag: e.mode,
      }));
    }

    return all;
  }, [activeTab]);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'scholarship': return <GraduationCap size={16} className="text-accent" />;
      case 'course': return <BookOpen size={16} className="text-primary" />;
      case 'event': return <CalendarDays size={16} className="text-success" />;
      default: return null;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case 'scholarship': return 'border-l-accent';
      case 'course': return 'border-l-primary';
      case 'event': return 'border-l-success';
      default: return 'border-l-border';
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <div className="w-3 h-3 bg-primary" />
            <div className="w-3 h-3 bg-success rotate-45" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Opportunities
          </h1>
          <p className="text-muted text-sm mt-2">
            Scholarships, courses, and events — all in one place.
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex gap-1 mb-8 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-5 py-2.5 text-sm font-bold border-2 border-ink transition-colors flex-shrink-0',
                activeTab === tab ? 'bg-primary text-white' : 'bg-white text-ink hover:bg-primary-soft'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'block bg-white border-2 border-ink border-l-[6px] p-5 no-underline group',
                'hover:translate-x-[-2px] hover:translate-y-[-1px] hover:shadow-brutal-sm transition-all',
                typeColor(item.type)
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{typeIcon(item.type)}</div>
                  <div>
                    <h3 className="font-bold text-sm text-ink group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{item.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                      {item.type === 'event' ? <Calendar size={11} /> : <MapPin size={11} />}
                      <span>{item.meta}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted border border-border px-2 py-0.5">
                    {item.tag}
                  </span>
                  <ExternalLink size={14} className="text-muted group-hover:text-primary transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted">No opportunities in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
