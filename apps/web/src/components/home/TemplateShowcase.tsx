import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import type { CVTemplate } from '../../types';

interface TemplateInfo {
  id: CVTemplate;
  name: string;
  standard: string;
  bestFor: string;
  available: boolean;
  accentColor: string;
}

const TEMPLATES: TemplateInfo[] = [
  {
    id: 'global',
    name: 'Global Standard',
    standard: 'International',
    bestFor: 'Most job applications',
    available: true,
    accentColor: 'bg-primary',
  },
  {
    id: 'european',
    name: 'European',
    standard: 'Europass-aligned',
    bestFor: 'EU roles, international orgs',
    available: false,
    accentColor: 'bg-blue-600',
  },
  {
    id: 'american',
    name: 'American',
    standard: 'US resume format',
    bestFor: 'US remote roles',
    available: false,
    accentColor: 'bg-red-600',
  },
  {
    id: 'au',
    name: 'AU Format',
    standard: 'African Union',
    bestFor: 'AU institutions',
    available: false,
    accentColor: 'bg-green-700',
  },
  {
    id: 'ecowas',
    name: 'ECOWAS',
    standard: 'West African',
    bestFor: 'Regional bodies',
    available: false,
    accentColor: 'bg-yellow-600',
  },
];

export default function TemplateShowcase() {
  return (
    <section className="py-20 md:py-28 bg-white border-y-2 border-ink">
      <div className="max-w-[1120px] mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[3px] w-12 bg-ink" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Templates</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">
              CVs that meet global standards
            </h2>
            <p className="text-muted text-sm mt-2 max-w-[50ch]">
              Choose the format that matches your target region. Each template is pixel-perfect and ATS-friendly.
            </p>
          </div>
          <Link
            to="/cv-builder"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-light no-underline transition-colors"
          >
            View all templates
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Template cards — horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-5 md:overflow-visible">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-[200px] md:w-auto group"
            >
              <div className="bg-surface border-2 border-ink p-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all relative">
                {/* A4 preview placeholder */}
                <div className="aspect-[3/4] bg-white border border-border mb-4 p-3 relative overflow-hidden">
                  {/* Mini template preview */}
                  <div className="space-y-2">
                    <div className={`h-1.5 w-full ${t.accentColor} opacity-60`} />
                    <div className="h-2 w-3/4 bg-ink/20 rounded-sm" />
                    <div className="h-1.5 w-1/2 bg-muted/20 rounded-sm" />
                    <div className="h-px bg-border my-1" />
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-muted/10 rounded-sm" />
                      <div className="h-1 w-4/5 bg-muted/10 rounded-sm" />
                      <div className="h-1 w-3/5 bg-muted/10 rounded-sm" />
                    </div>
                    <div className="h-px bg-border my-1" />
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-muted/10 rounded-sm" />
                      <div className="h-1 w-2/3 bg-muted/10 rounded-sm" />
                    </div>
                  </div>

                  {/* Coming soon overlay */}
                  {!t.available && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider border border-border px-2 py-1">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Available badge */}
                  {t.available && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-primary flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className={`h-1 w-full ${t.accentColor} mb-3 opacity-70`} />
                <h3 className="font-bold text-sm text-ink">{t.name}</h3>
                <p className="text-xs text-muted mt-0.5">{t.standard}</p>
                <p className="text-xs text-muted/70 mt-1">{t.bestFor}</p>

                {t.available && (
                  <Link
                    to="/cv-builder"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary no-underline hover:text-primary-light transition-colors"
                  >
                    Start with this →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
