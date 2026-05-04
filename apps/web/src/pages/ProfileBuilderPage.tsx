import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, FileText, Briefcase, GraduationCap, Zap,
  Award, Globe, Users, Plus, Trash2, ChevronRight, Check, ArrowRight
} from 'lucide-react';
import { useProfileStore } from '../store/profileStore';
import { ProgressBar, Toast } from '../components/common';
import { cn } from '../lib/utils';
import type { ProfileSection } from '../types';
import {
  createWorkExperience, createEducation, createCertification,
  createLanguage, createReferee
} from '../types';
import confetti from 'canvas-confetti';

const SECTION_ICONS: Record<string, React.ElementType> = {
  personal: User, summary: FileText, experience: Briefcase,
  education: GraduationCap, skills: Zap, certifications: Award,
  languages: Globe, referees: Users,
};

const SECTIONS: { key: ProfileSection; label: string }[] = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'summary', label: 'Professional Summary' },
  { key: 'experience', label: 'Work Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'languages', label: 'Languages' },
  { key: 'referees', label: 'Referees' },
];

export default function ProfileBuilderPage() {
  const navigate = useNavigate();
  const { profile, updatePersonalInfo, updateSummary, updateExperience,
    updateEducation, updateSkills, updateCertifications, updateLanguages,
    updateReferees, toggleShowReferees, markSectionComplete, completedSections } = useProfileStore();

  const [activeIdx, setActiveIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const activeKey = SECTIONS[activeIdx].key;
  const percentage = Math.round(((activeIdx + (completedSections.has(activeKey) ? 1 : 0)) / SECTIONS.length) * 100);

  const showSaveToast = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const saveAndContinue = () => {
    markSectionComplete(activeKey);
    showSaveToast();
    if (activeIdx < SECTIONS.length - 1) {
      setActiveIdx(activeIdx + 1);
    } else {
      // Completion!
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const isLastSection = activeIdx === SECTIONS.length - 1;
  const allDone = SECTIONS.every(s => completedSections.has(s.key));

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Progress bar */}
      <ProgressBar percentage={percentage} className="fixed top-16 left-0 right-0 z-40" />

      <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Profile Builder</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">
            Build your master profile
          </h1>
          <p className="text-sm text-muted mt-1">Fill this once — it powers every CV and cover letter.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Left: Section navigator */}
          <nav className="hidden lg:block">
            <div className="bg-white border-2 border-ink p-1">
              {SECTIONS.map((s, i) => {
                const Icon = SECTION_ICONS[s.key];
                const done = completedSections.has(s.key);
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-bold transition-colors',
                      i === activeIdx
                        ? 'bg-primary text-white'
                        : done
                          ? 'text-primary hover:bg-primary-soft'
                          : 'text-muted hover:bg-surface'
                    )}
                  >
                    {done ? <Check size={16} /> : <Icon size={16} />}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile section tabs */}
          <div className="lg:hidden flex gap-1 overflow-x-auto no-scrollbar pb-2">
            {SECTIONS.map((s, i) => {
              const done = completedSections.has(s.key);
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    'flex-shrink-0 px-3 py-2 text-xs font-bold border-2 border-ink transition-colors',
                    i === activeIdx ? 'bg-primary text-white' : done ? 'bg-primary-soft text-primary' : 'bg-white text-muted'
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Main form area */}
          <div className="bg-white border-2 border-ink p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                {(() => { const Icon = SECTION_ICONS[activeKey]; return <Icon size={16} className="text-white" />; })()}
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-ink">{SECTIONS[activeIdx].label}</h2>
                <p className="text-xs text-muted">Step {activeIdx + 1} of {SECTIONS.length}</p>
              </div>
            </div>

            {/* ── Personal Info ── */}
            {activeKey === 'personal' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" value={profile.personalInfo.fullName}
                  onChange={v => updatePersonalInfo({ fullName: v })} placeholder="e.g. Adaeze Okafor" required />
                <Field label="Email" type="email" value={profile.personalInfo.email}
                  onChange={v => updatePersonalInfo({ email: v })} placeholder="you@email.com" required />
                <Field label="Phone" value={profile.personalInfo.phone}
                  onChange={v => updatePersonalInfo({ phone: v })} placeholder="+234..." required />
                <Field label="Location" value={profile.personalInfo.location}
                  onChange={v => updatePersonalInfo({ location: v })} placeholder="Lagos, Nigeria" required />
                <Field label="LinkedIn (optional)" value={profile.personalInfo.linkedin || ''}
                  onChange={v => updatePersonalInfo({ linkedin: v })} placeholder="https://linkedin.com/in/..." />
                <Field label="Portfolio (optional)" value={profile.personalInfo.portfolio || ''}
                  onChange={v => updatePersonalInfo({ portfolio: v })} placeholder="https://..." />
              </div>
            )}

            {/* ── Summary ── */}
            {activeKey === 'summary' && (
              <div>
                <TextArea
                  label="Professional Summary"
                  value={profile.summary}
                  onChange={updateSummary}
                  placeholder="A brief 2-3 sentence summary of who you are professionally..."
                  maxLength={200}
                  rows={4}
                />
                <p className="text-xs text-muted mt-2">Keep it concise — this appears at the top of your CV.</p>
              </div>
            )}

            {/* ── Experience ── */}
            {activeKey === 'experience' && (
              <div className="space-y-6">
                {profile.experience.map((exp, i) => (
                  <div key={exp.id} className="border border-border p-4 relative">
                    <button onClick={() => updateExperience(profile.experience.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 text-muted hover:text-error transition-colors" aria-label="Remove">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Job Title" value={exp.jobTitle} onChange={v => {
                        const u = [...profile.experience]; u[i] = { ...u[i], jobTitle: v }; updateExperience(u);
                      }} placeholder="Product Designer" />
                      <Field label="Company" value={exp.company} onChange={v => {
                        const u = [...profile.experience]; u[i] = { ...u[i], company: v }; updateExperience(u);
                      }} placeholder="Company name" />
                      <Field label="Location" value={exp.location} onChange={v => {
                        const u = [...profile.experience]; u[i] = { ...u[i], location: v }; updateExperience(u);
                      }} placeholder="Lagos, Nigeria" />
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Start" type="month" value={exp.startDate} onChange={v => {
                          const u = [...profile.experience]; u[i] = { ...u[i], startDate: v }; updateExperience(u);
                        }} />
                        <Field label="End" type="month" value={exp.endDate} onChange={v => {
                          const u = [...profile.experience]; u[i] = { ...u[i], endDate: v }; updateExperience(u);
                        }} placeholder="Present" />
                      </div>
                    </div>
                    <TextArea label="Responsibilities (one per line)" value={exp.responsibilities.join('\n')} onChange={v => {
                      const u = [...profile.experience]; u[i] = { ...u[i], responsibilities: v.split('\n').filter(Boolean) }; updateExperience(u);
                    }} rows={3} placeholder="- Built responsive UI components..." className="mt-3" />
                  </div>
                ))}
                <button onClick={() => updateExperience([...profile.experience, createWorkExperience()])}
                  className="btn-brutal bg-surface text-ink text-sm w-full py-3">
                  <Plus size={14} className="inline mr-1" /> Add Experience
                </button>
              </div>
            )}

            {/* ── Education ── */}
            {activeKey === 'education' && (
              <div className="space-y-6">
                {profile.education.map((edu, i) => (
                  <div key={edu.id} className="border border-border p-4 relative">
                    <button onClick={() => updateEducation(profile.education.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 text-muted hover:text-error transition-colors" aria-label="Remove">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Degree" value={edu.degree} onChange={v => {
                        const u = [...profile.education]; u[i] = { ...u[i], degree: v }; updateEducation(u);
                      }} placeholder="BSc Computer Science" />
                      <Field label="Institution" value={edu.institution} onChange={v => {
                        const u = [...profile.education]; u[i] = { ...u[i], institution: v }; updateEducation(u);
                      }} placeholder="University of Lagos" />
                      <Field label="Graduation Year" value={edu.graduationYear} onChange={v => {
                        const u = [...profile.education]; u[i] = { ...u[i], graduationYear: v }; updateEducation(u);
                      }} placeholder="2024" />
                      <Field label="Honours (optional)" value={edu.honours || ''} onChange={v => {
                        const u = [...profile.education]; u[i] = { ...u[i], honours: v }; updateEducation(u);
                      }} placeholder="First Class" />
                    </div>
                  </div>
                ))}
                <button onClick={() => updateEducation([...profile.education, createEducation()])}
                  className="btn-brutal bg-surface text-ink text-sm w-full py-3">
                  <Plus size={14} className="inline mr-1" /> Add Education
                </button>
              </div>
            )}

            {/* ── Skills ── */}
            {activeKey === 'skills' && (
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">Skills</label>
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] border border-border p-3 bg-surface">
                  {profile.skills.map((skill) => (
                    <span key={skill.id} className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1 border-2 border-ink">
                      {skill.name}
                      <button onClick={() => updateSkills(profile.skills.filter(s => s.id !== skill.id))}
                        className="hover:text-accent transition-colors" aria-label={`Remove ${skill.name}`}>×</button>
                    </span>
                  ))}
                  {profile.skills.length === 0 && (
                    <span className="text-xs text-muted">Type a skill and press Enter...</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
                        e.preventDefault();
                        updateSkills([...profile.skills, { id: crypto.randomUUID(), name: skillInput.trim() }]);
                        setSkillInput('');
                      }
                    }}
                    placeholder="e.g. React, TypeScript, Figma..."
                    className="flex-1 border-2 border-ink px-3 py-2.5 text-sm outline-none focus:border-primary bg-white"
                  />
                  <button onClick={() => {
                    if (skillInput.trim()) {
                      updateSkills([...profile.skills, { id: crypto.randomUUID(), name: skillInput.trim() }]);
                      setSkillInput('');
                    }
                  }} className="btn-brutal bg-primary text-white text-sm px-4">Add</button>
                </div>
                <p className="text-xs text-muted mt-2">Press Enter or comma to add each skill.</p>
              </div>
            )}

            {/* ── Certifications ── */}
            {activeKey === 'certifications' && (
              <div className="space-y-6">
                {profile.certifications.map((cert, i) => (
                  <div key={cert.id} className="border border-border p-4 relative">
                    <button onClick={() => updateCertifications(profile.certifications.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 text-muted hover:text-error transition-colors" aria-label="Remove">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="Certification Name" value={cert.name} onChange={v => {
                        const u = [...profile.certifications]; u[i] = { ...u[i], name: v }; updateCertifications(u);
                      }} placeholder="AWS Cloud Practitioner" />
                      <Field label="Issuer" value={cert.issuer} onChange={v => {
                        const u = [...profile.certifications]; u[i] = { ...u[i], issuer: v }; updateCertifications(u);
                      }} placeholder="Amazon" />
                      <Field label="Year" value={cert.year} onChange={v => {
                        const u = [...profile.certifications]; u[i] = { ...u[i], year: v }; updateCertifications(u);
                      }} placeholder="2024" />
                    </div>
                  </div>
                ))}
                <button onClick={() => updateCertifications([...profile.certifications, createCertification()])}
                  className="btn-brutal bg-surface text-ink text-sm w-full py-3">
                  <Plus size={14} className="inline mr-1" /> Add Certification
                </button>
                {profile.certifications.length === 0 && (
                  <p className="text-xs text-muted text-center">No certifications yet. This section is optional.</p>
                )}
              </div>
            )}

            {/* ── Languages ── */}
            {activeKey === 'languages' && (
              <div className="space-y-6">
                {profile.languages.map((lang, i) => (
                  <div key={lang.id} className="border border-border p-4 relative">
                    <button onClick={() => updateLanguages(profile.languages.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 text-muted hover:text-error transition-colors" aria-label="Remove">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Language" value={lang.name} onChange={v => {
                        const u = [...profile.languages]; u[i] = { ...u[i], name: v }; updateLanguages(u);
                      }} placeholder="English" />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Proficiency</label>
                        <select value={lang.proficiency} onChange={e => {
                          const u = [...profile.languages];
                          u[i] = { ...u[i], proficiency: e.target.value as 'Basic' | 'Conversational' | 'Fluent' | 'Native' };
                          updateLanguages(u);
                        }} className="border-2 border-ink px-3 py-2.5 text-sm bg-white outline-none focus:border-primary">
                          <option value="Basic">Basic</option>
                          <option value="Conversational">Conversational</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Native">Native</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateLanguages([...profile.languages, createLanguage()])}
                  className="btn-brutal bg-surface text-ink text-sm w-full py-3">
                  <Plus size={14} className="inline mr-1" /> Add Language
                </button>
              </div>
            )}

            {/* ── Referees ── */}
            {activeKey === 'referees' && (
              <div className="space-y-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={profile.showReferees} onChange={toggleShowReferees}
                    className="w-4 h-4 border-2 border-ink accent-primary" />
                  <span className="text-sm font-bold text-ink">Show referees on my CV</span>
                </label>

                {profile.referees.map((ref, i) => (
                  <div key={ref.id} className="border border-border p-4 relative">
                    <button onClick={() => updateReferees(profile.referees.filter((_, idx) => idx !== i))}
                      className="absolute top-3 right-3 text-muted hover:text-error transition-colors" aria-label="Remove">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Name" value={ref.name} onChange={v => {
                        const u = [...profile.referees]; u[i] = { ...u[i], name: v }; updateReferees(u);
                      }} placeholder="Dr. Jane Smith" />
                      <Field label="Title" value={ref.title} onChange={v => {
                        const u = [...profile.referees]; u[i] = { ...u[i], title: v }; updateReferees(u);
                      }} placeholder="Head of Department" />
                      <Field label="Organisation" value={ref.organisation} onChange={v => {
                        const u = [...profile.referees]; u[i] = { ...u[i], organisation: v }; updateReferees(u);
                      }} placeholder="University of Lagos" />
                      <Field label="Email" value={ref.email} onChange={v => {
                        const u = [...profile.referees]; u[i] = { ...u[i], email: v }; updateReferees(u);
                      }} placeholder="jane@unilag.edu.ng" />
                    </div>
                  </div>
                ))}
                <button onClick={() => updateReferees([...profile.referees, createReferee()])}
                  className="btn-brutal bg-surface text-ink text-sm w-full py-3">
                  <Plus size={14} className="inline mr-1" /> Add Referee
                </button>
                {profile.referees.length === 0 && (
                  <p className="text-xs text-muted text-center">This section is optional.</p>
                )}
              </div>
            )}

            {/* Save & Continue */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-border">
              <button
                onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                className="text-sm font-bold text-muted disabled:opacity-30 hover:text-ink transition-colors"
              >
                ← Back
              </button>

              <div className="flex gap-3">
                {allDone && (
                  <button
                    onClick={() => navigate('/cv-builder')}
                    className="btn-brutal bg-accent text-ink text-sm px-6 py-3"
                  >
                    Build Your CV <ArrowRight size={14} className="inline ml-1" />
                  </button>
                )}
                <button
                  onClick={saveAndContinue}
                  className="btn-brutal bg-primary text-white text-sm px-6 py-3"
                >
                  {isLastSection ? (allDone ? 'Complete ✓' : 'Save & Finish') : 'Save & Continue'}
                  {!isLastSection && <ChevronRight size={14} className="inline ml-1" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast message="Profile saved ✓" visible={showToast} />
    </div>
  );
}

/* ── Reusable Form Components ── */

function Field({ label, value, onChange, placeholder, type = 'text', required, className }:
  { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-xs font-bold text-muted uppercase tracking-wider">
        {label}{required && <span className="text-error ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-2 border-ink px-3 py-2.5 text-sm outline-none focus:border-primary bg-white transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, maxLength, rows = 3, className }:
  { label: string; value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number; rows?: number; className?: string }) {
  const charState = maxLength ? (value.length >= maxLength ? 'text-error' : value.length >= maxLength * 0.9 ? 'text-warning' : 'text-muted') : 'text-muted';

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-bold text-muted uppercase tracking-wider">{label}</label>
        {maxLength && (
          <span className={cn('text-xs font-mono font-bold', charState)}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={e => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        rows={rows}
        className="border-2 border-ink px-3 py-2.5 text-sm outline-none focus:border-primary bg-white resize-y transition-colors"
      />
    </div>
  );
}
