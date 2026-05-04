import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { jobs } from '../../data/jobs';
import JobCard from '../jobs/JobCard';

export default function JobsTeaser() {
  const teaserJobs = jobs.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1120px] mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Latest</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Fresh opportunities
            </h2>
            <p className="text-muted text-sm mt-2">
              Hand-picked roles at Nigeria's top companies.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-light no-underline transition-colors"
          >
            Browse all opportunities
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Job cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teaserJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
