import { Link } from 'react-router-dom';
import { MapPin, Clock, Share2, ArrowUpRight } from 'lucide-react';
import type { JobListing } from '../../types';
import { buildWhatsAppShareLink } from '../../lib/mailto';
import { cn } from '../../lib/utils';

interface JobCardProps {
  job: JobListing;
}

function WorkModeBadge({ mode }: { mode: string }) {
  const colors: Record<string, string> = {
    Remote: 'bg-blue-100 text-blue-800 border-blue-300',
    Onsite: 'bg-orange-100 text-orange-800 border-orange-300',
    Hybrid: 'bg-purple-100 text-purple-800 border-purple-300',
  };
  return (
    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border', colors[mode] || 'bg-gray-100 text-gray-700 border-gray-300')}>
      {mode}
    </span>
  );
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-border bg-surface text-muted">
      {level}
    </span>
  );
}

export default function JobCard({ job }: JobCardProps) {
  const initials = job.company
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const shareUrl = `${window.location.origin}/jobs/${job.slug}`;

  return (
    <div className={cn(
      'bg-white border-2 border-ink p-5 group transition-all',
      job.isBoosted
        ? 'border-l-[6px] border-l-accent shadow-brutal-sm'
        : 'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal'
    )}>
      {/* Top row */}
      <div className="flex items-start gap-4">
        {/* Company avatar */}
        <div className="w-11 h-11 bg-primary-soft border-2 border-ink flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary">{initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/jobs/${job.slug}`}
                className="text-base font-bold text-ink no-underline hover:text-primary transition-colors leading-snug block"
              >
                {job.title}
              </Link>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-muted">
                <span>{job.company}</span>
                <span>·</span>
                <MapPin size={12} />
                <span>{job.location}</span>
              </div>
            </div>

            {job.isBoosted && (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-accent text-ink px-2 py-0.5 border border-ink flex-shrink-0">
                Featured
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <WorkModeBadge mode={job.workMode} />
            <LevelBadge level={job.experienceLevel} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4" />

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Clock size={12} />
          <span>Deadline: {job.deadline}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp Share */}
          <a
            href={buildWhatsAppShareLink(shareUrl, job.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border hover:border-ink hover:bg-surface transition-colors no-underline"
            aria-label="Share on WhatsApp"
          >
            <Share2 size={14} className="text-muted" />
          </a>

          {/* Apply */}
          {job.hrEmail ? (
            <Link
              to={`/jobs/${job.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-primary text-white px-4 py-2 border-2 border-ink hover:bg-primary-light transition-colors no-underline"
            >
              Apply on Jhub ✓
            </Link>
          ) : (
            <a
              href={job.externalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-muted border border-border px-3 py-2 hover:border-ink transition-colors no-underline"
            >
              Apply on site
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
