import { forwardRef } from 'react';
import type { UserProfile } from '../../types';

interface GlobalCVTemplateProps {
  profile: UserProfile;
}

const GlobalCVTemplate = forwardRef<HTMLDivElement, GlobalCVTemplateProps>(
  ({ profile }, ref) => {
    const { personalInfo, summary, experience, education, skills, certifications, languages, referees, showReferees } = profile;

    return (
      <div
        ref={ref}
        id="cv-template"
        className="bg-white text-black"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '11pt',
          lineHeight: '1.5',
          maxWidth: '210mm',
          margin: '0 auto',
          padding: '20mm 15mm',
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: '16px', borderBottom: '2px solid #1B4332', paddingBottom: '12px' }}>
          <h1 style={{
            fontSize: '22pt', fontWeight: 700, color: '#1B4332',
            margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '10pt', color: '#444', marginTop: '6px', lineHeight: '1.6' }}>
            {[personalInfo.email, personalInfo.phone, personalInfo.location]
              .filter(Boolean)
              .join(' · ')}
          </div>
          {(personalInfo.linkedin || personalInfo.portfolio) && (
            <div style={{ fontSize: '9pt', color: '#666', marginTop: '2px' }}>
              {[personalInfo.linkedin, personalInfo.portfolio].filter(Boolean).join(' · ')}
            </div>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={sectionHeadingStyle}>Professional Summary</h2>
            <p style={{ margin: 0, color: '#333', fontSize: '10.5pt' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={sectionHeadingStyle}>Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '11pt', color: '#1B4332' }}>{exp.jobTitle}</strong>
                  <span style={{ fontSize: '9pt', color: '#666' }}>
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <div style={{ fontSize: '10pt', color: '#555', marginTop: '1px' }}>
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </div>
                {exp.responsibilities.length > 0 && (
                  <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '10pt', color: '#333' }}>
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} style={{ marginBottom: '2px' }}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '10.5pt' }}>{edu.degree}</strong>
                  <span style={{ fontSize: '9pt', color: '#666' }}>{edu.graduationYear}</span>
                </div>
                <div style={{ fontSize: '10pt', color: '#555' }}>
                  {edu.institution}{edu.honours ? ` — ${edu.honours}` : ''}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <p style={{ margin: 0, fontSize: '10pt', color: '#333' }}>
              {skills.map((s) => s.name).join(' · ')}
            </p>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ fontSize: '10pt', color: '#333', marginBottom: '3px' }}>
                <strong>{cert.name}</strong> — {cert.issuer}, {cert.year}
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <p style={{ margin: 0, fontSize: '10pt', color: '#333' }}>
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(' · ')}
            </p>
          </section>
        )}

        {/* Referees */}
        {showReferees && referees.length > 0 && (
          <section>
            <h2 style={sectionHeadingStyle}>Referees</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {referees.map((ref) => (
                <div key={ref.id} style={{ fontSize: '10pt', color: '#333' }}>
                  <strong>{ref.name}</strong>
                  <br />
                  {ref.title}, {ref.organisation}
                  <br />
                  <span style={{ color: '#666', fontSize: '9pt' }}>{ref.email}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
);

GlobalCVTemplate.displayName = 'GlobalCVTemplate';

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '12pt',
  fontWeight: 700,
  color: '#1B4332',
  margin: '0 0 6px 0',
  borderBottom: '1px solid #ddd',
  paddingBottom: '3px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export default GlobalCVTemplate;
