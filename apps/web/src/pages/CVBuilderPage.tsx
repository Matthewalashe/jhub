import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Download, Edit, Check, Info } from 'lucide-react';
import { useProfileStore } from '../store/profileStore';
import GlobalCVTemplate from '../components/cv-templates/GlobalCVTemplate';
import { cn } from '../lib/utils';

const TEMPLATES = [
  { id: 'global' as const, name: 'Global Standard', available: true, color: 'bg-primary' },
  { id: 'european' as const, name: 'European', available: false, color: 'bg-blue-600' },
  { id: 'american' as const, name: 'American', available: false, color: 'bg-red-600' },
  { id: 'au' as const, name: 'AU Format', available: false, color: 'bg-green-700' },
  { id: 'ecowas' as const, name: 'ECOWAS', available: false, color: 'bg-yellow-600' },
];

export default function CVBuilderPage() {
  const { profile } = useProfileStore();
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `${profile.personalInfo.fullName || 'CV'}_Jhub`,
    pageStyle: `@page { size: A4; margin: 0; }`,
  });

  const onDownload = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  const hasProfile = profile.personalInfo.fullName && profile.personalInfo.email;

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-[1240px] mx-auto px-5 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">CV Builder</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">
              Build your CV
            </h1>
          </div>
          <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-primary no-underline hover:text-primary-light">
            <Edit size={14} />
            Edit Profile
          </Link>
        </div>

        {!hasProfile && (
          <div className="bg-accent/10 border-2 border-accent p-6 mb-8">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-accent-dark flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-ink text-sm">No profile data yet</p>
                <p className="text-sm text-muted mt-1">
                  Fill in your profile first to see your CV come to life.{' '}
                  <Link to="/profile" className="text-primary font-bold no-underline">Build your profile →</Link>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left panel — Template selector + controls */}
          <div className="space-y-4">
            <div className="bg-white border-2 border-ink p-5">
              <h2 className="font-bold text-sm text-ink mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary" />
                Choose your template
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    disabled={!t.available}
                    className={cn(
                      'p-3 border-2 text-left transition-all text-xs font-bold',
                      t.available
                        ? 'border-primary bg-primary-soft text-primary'
                        : 'border-border bg-surface text-muted cursor-not-allowed opacity-50'
                    )}
                  >
                    <div className={cn('w-3 h-0.5 mb-2', t.color)} />
                    {t.name}
                    {t.available && <Check size={12} className="inline ml-1" />}
                    {!t.available && <span className="block text-[9px] mt-0.5 opacity-60">Soon</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={onDownload}
              disabled={!hasProfile}
              className="btn-brutal bg-accent text-ink w-full py-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download size={16} className="inline mr-2" />
              Download as PDF
            </button>

            <div className="bg-surface border border-border p-4">
              <p className="text-xs text-muted leading-relaxed">
                <strong className="text-ink">Print tip:</strong> In the print dialog, set Destination → "Save as PDF" and Margins → "None" for best results.
              </p>
            </div>
          </div>

          {/* Right panel — CV Preview */}
          <div className="bg-white border-2 border-ink shadow-cv overflow-auto">
            <div className="p-2 bg-surface border-b border-border flex items-center justify-between">
              <span className="text-xs font-bold text-muted">Preview — Global Standard</span>
              <span className="text-[10px] text-muted">Updates live from your profile</span>
            </div>
            <div className="p-4 md:p-8 min-h-[600px]">
              <GlobalCVTemplate ref={cvRef} profile={profile} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky download */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t-2 border-ink z-40 no-print">
        <button
          onClick={onDownload}
          disabled={!hasProfile}
          className="btn-brutal bg-accent text-ink w-full py-3 text-sm disabled:opacity-40"
        >
          <Download size={16} className="inline mr-2" />
          Download PDF
        </button>
      </div>
    </div>
  );
}
