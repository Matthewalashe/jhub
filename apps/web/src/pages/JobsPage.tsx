import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { jobs } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import { SkeletonCard, EmptyState } from '../components/common';
import { cn } from '../lib/utils';

const WORK_MODES = ['All', 'Remote', 'Onsite', 'Hybrid'] as const;
const EXPERIENCE_LEVELS = ['All', 'Entry', 'Mid', 'Senior'] as const;

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [workMode, setWorkMode] = useState<string>('All');
  const [expLevel, setExpLevel] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());
      const matchesMode = workMode === 'All' || job.workMode === workMode;
      const matchesLevel = expLevel === 'All' || job.experienceLevel === expLevel;
      return matchesSearch && matchesMode && matchesLevel;
    });
  }, [search, workMode, expLevel]);

  const clearFilters = () => {
    setSearch('');
    setWorkMode('All');
    setExpLevel('All');
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-accent" />
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Find Your Next Opportunity
          </h1>
          <p className="text-muted text-sm mt-2">
            Hand-picked roles at Nigeria's top companies. Apply directly from Jhub.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company, or location..."
              className="w-full border-2 border-ink pl-11 pr-4 py-3 text-sm font-medium bg-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'btn-brutal text-sm px-4',
              showFilters ? 'bg-primary text-white' : 'bg-white text-ink'
            )}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {/* Filter pills */}
        <div className={cn('mb-6 space-y-3', showFilters ? 'block' : 'hidden md:block')}>
          {/* Work mode */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted uppercase tracking-wider w-20">Mode</span>
            {WORK_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setWorkMode(mode)}
                className={cn(
                  'px-4 py-2 text-xs font-bold border-2 border-ink transition-colors',
                  workMode === mode ? 'bg-primary text-white' : 'bg-white text-ink hover:bg-primary-soft'
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Experience */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted uppercase tracking-wider w-20">Level</span>
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setExpLevel(level)}
                className={cn(
                  'px-4 py-2 text-xs font-bold border-2 border-ink transition-colors',
                  expLevel === level ? 'bg-primary text-white' : 'bg-white text-ink hover:bg-primary-soft'
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted">
            <strong className="text-ink">{filtered.length}</strong> {filtered.length === 1 ? 'job' : 'jobs'} found
          </span>
          {(search || workMode !== 'All' || expLevel !== 'All') && (
            <button onClick={clearFilters} className="inline-flex items-center gap-1 text-xs font-bold text-error hover:text-red-700 transition-colors">
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Job cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No jobs match your filters"
            description="Try adjusting your search or filters to find more opportunities."
            action={
              <button onClick={clearFilters} className="btn-brutal bg-primary text-white text-sm px-5 py-2.5">
                Clear Filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
