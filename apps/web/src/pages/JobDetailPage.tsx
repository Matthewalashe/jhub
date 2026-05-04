import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Share2, Download, Send, ArrowUpRight, DollarSign } from 'lucide-react';
import { jobs } from '../data/jobs';
import { useProfileStore } from '../store/profileStore';
import { buildWhatsAppShareLink, openApplicationEmail } from '../lib/mailto';
import { generateCoverLetter } from '../lib/coverLetter';
import { Badge } from '../components/common';

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { profile } = useProfileStore();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-surface pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Job not found</h1>
          <p className="text-muted text-sm mb-4">This listing may have been removed or the link is incorrect.</p>
          <Link to="/jobs" className="btn-brutal bg-primary text-white text-sm px-5 py-2.5 no-underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const initials = job.company.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const shareUrl = `${window.location.origin}/jobs/${job.slug}`;

  const handleApply = async () => {
    if (!job.hrEmail) return;
    const coverLetter = generateCoverLetter(profile, {
      jobTitle: job.title,
      company: job.company,
      whyThisRole: '',
    });
    await openApplicationEmail(job.hrEmail, job.title, profile.personalInfo.fullName, coverLetter);
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-[1000px] mx-auto px-5 md:px-6 py-8">
        {/* Back */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink no-underline mb-6 transition-colors">
          <ArrowLeft size={14} />
          Back to Jobs
        </Link>

        {/* Header */}
        <div className="bg-white border-2 border-ink p-6 md:p-8 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-primary-soft border-2 border-ink flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-primary">{initials}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted flex-wrap">
                    <span className="font-bold text-ink">{job.company}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1"><Clock size={12} />Posted {job.postedDate}</span>
                  </div>
                </div>
                {job.isBoosted && (
                  <Badge variant="accent">Featured</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge>{job.workMode}</Badge>
                <Badge>{job.experienceLevel}</Badge>
                {job.salary && <Badge variant="success"><DollarSign size={10} className="inline" /> {job.salary}</Badge>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main content */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white border-2 border-ink p-6">
              <h2 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary" /> About this role
              </h2>
              <p className="text-sm text-muted leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <div className="bg-white border-2 border-ink p-6">
                <h2 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent" /> Responsibilities
                </h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary mt-1.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div className="bg-white border-2 border-ink p-6">
                <h2 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success" /> Requirements
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-success mt-1.5 flex-shrink-0 rounded-full" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply section */}
            <div className="bg-primary-soft border-2 border-primary p-6">
              <h2 className="font-display text-lg font-bold text-ink mb-2">Ready to apply?</h2>
              <p className="text-sm text-muted mb-4">Download your CV first, then apply via email.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/cv-builder" className="btn-brutal bg-white text-ink text-sm px-5 py-3 no-underline">
                  <Download size={14} className="inline mr-2" /> Download CV
                </Link>
                {job.hrEmail ? (
                  <button
                    onClick={() => navigate(`/cover-letter?job=${job.slug}`)}
                    className="btn-brutal bg-accent text-ink text-sm px-5 py-3"
                  >
                    <Send size={14} className="inline mr-2" /> Write Cover Letter & Apply
                  </button>
                ) : (
                  <a
                    href={job.externalUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal bg-white text-ink text-sm px-5 py-3 no-underline"
                  >
                    Apply on site <ArrowUpRight size={14} className="inline ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border-2 border-ink p-5">
              <h3 className="font-bold text-sm text-ink mb-4">Job Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted">Deadline</span><span className="font-bold text-ink">{job.deadline}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-muted">Work Mode</span><span className="font-bold text-ink">{job.workMode}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-muted">Experience</span><span className="font-bold text-ink">{job.experienceLevel}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-muted">Method</span><span className="font-bold text-ink">{job.hrEmail ? 'Email via Jhub' : 'External'}</span></div>
                {job.salary && <>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between"><span className="text-muted">Salary</span><span className="font-bold text-ink">{job.salary}</span></div>
                </>}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {job.hrEmail && (
                <button
                  onClick={handleApply}
                  className="btn-brutal bg-primary text-white w-full py-3 text-sm"
                >
                  <Send size={14} className="inline mr-2" /> Quick Apply
                </button>
              )}

              <a
                href={buildWhatsAppShareLink(shareUrl, job.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal bg-green-600 text-white w-full py-3 text-sm inline-flex items-center justify-center no-underline"
              >
                <Share2 size={14} className="inline mr-2" /> Share on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
