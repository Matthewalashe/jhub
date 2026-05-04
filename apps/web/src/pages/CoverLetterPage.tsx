import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Copy, Send, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useProfileStore } from '../store/profileStore';
import { jobs } from '../data/jobs';
import { generateCoverLetter, getCoverLetterCharState } from '../lib/coverLetter';
import { openApplicationEmail } from '../lib/mailto';
import { Toast } from '../components/common';
import { cn } from '../lib/utils';

export default function CoverLetterPage() {
  const [params] = useSearchParams();
  const jobSlug = params.get('job');
  const job = jobs.find((j) => j.slug === jobSlug);
  const { profile } = useProfileStore();

  const [jobTitle, setJobTitle] = useState(job?.title || '');
  const [company, setCompany] = useState(job?.company || '');
  const [recipientName, setRecipientName] = useState('');
  const [whyThisRole, setWhyThisRole] = useState('');
  const [showToast, setShowToast] = useState(false);

  const generatedLetter = useMemo(() => {
    return generateCoverLetter(profile, { jobTitle, company, recipientName, whyThisRole });
  }, [profile, jobTitle, company, recipientName, whyThisRole]);

  const [letter, setLetter] = useState(generatedLetter);

  // Regenerate when inputs change
  const regenerate = useCallback(() => {
    setLetter(generateCoverLetter(profile, { jobTitle, company, recipientName, whyThisRole }));
  }, [profile, jobTitle, company, recipientName, whyThisRole]);

  const charState = getCoverLetterCharState(letter.length);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch {
      console.warn('Failed to copy');
    }
  };

  const handleApply = async () => {
    const hrEmail = job?.hrEmail || '';
    if (!hrEmail) return;
    await openApplicationEmail(hrEmail, jobTitle, profile.personalInfo.fullName, letter);
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-[900px] mx-auto px-5 md:px-6 py-8">
        {/* Back */}
        {job && (
          <Link to={`/jobs/${job.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink no-underline mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to job listing
          </Link>
        )}

        {/* Header */}
        <div className="bg-white border-2 border-ink p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted">Cover Letter</span>
              </div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-ink">
                {job ? `Cover Letter for ${job.title} at ${job.company}` : 'Write a Cover Letter'}
              </h1>
            </div>
            <div className={cn(
              'text-sm font-mono font-bold px-3 py-1 border',
              charState === 'locked' ? 'text-error border-error bg-red-50' :
              charState === 'danger' ? 'text-error border-error bg-red-50' :
              charState === 'warning' ? 'text-warning border-warning bg-amber-50' :
              'text-muted border-border'
            )}>
              {letter.length} / 1,500
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left — inputs */}
          <div className="space-y-4">
            {/* Profile info (read-only) */}
            <div className="bg-white border-2 border-ink p-5">
              <h3 className="font-bold text-xs text-muted uppercase tracking-wider mb-3">From your profile</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-muted">Name:</span> <span className="font-bold text-ink">{profile.personalInfo.fullName || '—'}</span></div>
                <div><span className="text-muted">Skills:</span> <span className="font-bold text-ink">{profile.skills.slice(0, 3).map(s => s.name).join(', ') || '—'}</span></div>
              </div>
              <Link to="/profile" className="text-xs font-bold text-primary no-underline mt-2 inline-block">Edit profile →</Link>
            </div>

            {/* Job-specific inputs */}
            <div className="bg-white border-2 border-ink p-5 space-y-3">
              <h3 className="font-bold text-xs text-muted uppercase tracking-wider mb-1">Job Details</h3>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted">Job Title</label>
                <input value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                  className="border-2 border-ink px-3 py-2 text-sm bg-white outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted">Company</label>
                <input value={company} onChange={e => setCompany(e.target.value)}
                  className="border-2 border-ink px-3 py-2 text-sm bg-white outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted">Hiring Manager (optional)</label>
                <input value={recipientName} onChange={e => setRecipientName(e.target.value)}
                  placeholder="e.g. Ms. Adaeze"
                  className="border-2 border-ink px-3 py-2 text-sm bg-white outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted">Why this role? (1 sentence)</label>
                <textarea value={whyThisRole} onChange={e => setWhyThisRole(e.target.value)}
                  rows={2} placeholder="I'm drawn to this role because..."
                  className="border-2 border-ink px-3 py-2 text-sm bg-white outline-none focus:border-primary resize-y" />
              </div>
              <button onClick={regenerate} className="btn-brutal bg-surface text-ink text-xs w-full py-2.5">
                Regenerate Letter
              </button>
            </div>
          </div>

          {/* Right — Letter editor */}
          <div className="space-y-4">
            <div className="bg-white border-2 border-ink p-6">
              <textarea
                value={letter}
                onChange={e => {
                  if (e.target.value.length <= 1500) {
                    setLetter(e.target.value);
                  }
                }}
                rows={18}
                className={cn(
                  'w-full border-2 px-4 py-3 text-sm leading-relaxed bg-white outline-none resize-y font-sans',
                  charState === 'locked' ? 'border-error animate-shake' :
                  charState === 'danger' ? 'border-error' :
                  charState === 'warning' ? 'border-warning' :
                  'border-ink focus:border-primary'
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleCopy} className="btn-brutal bg-white text-ink text-sm flex-1 py-3">
                <Copy size={14} className="inline mr-2" /> Copy to Clipboard
              </button>
              {job?.hrEmail && (
                <button onClick={handleApply} className="btn-brutal bg-accent text-ink text-sm flex-1 py-3">
                  <Send size={14} className="inline mr-2" /> Open Email to Apply
                </button>
              )}
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-300 p-4 flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>After your email client opens,</strong> attach your downloaded CV before sending.
                Your cover letter has been copied to clipboard as a backup.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toast message="Copied to clipboard ✓" visible={showToast} />
    </div>
  );
}
