/**
 * Cover Letter Template Engine
 * Generates structured cover letters from profile + job data
 */

import type { UserProfile } from '../types';

export interface CoverLetterData {
  recipientName?: string;
  jobTitle: string;
  company: string;
  whyThisRole: string;
}

export function generateCoverLetter(
  profile: UserProfile,
  jobData: CoverLetterData
): string {
  const { personalInfo, summary, experience, skills } = profile;
  const { recipientName, jobTitle, company, whyThisRole } = jobData;

  const greeting = recipientName
    ? `Dear ${recipientName},`
    : `Dear ${company} Hiring Team,`;

  const skillsList = skills
    .slice(0, 5)
    .map((s) => s.name)
    .join(', ');

  const recentRole = experience[0];
  const experienceSnippet = recentRole
    ? `In my most recent role as ${recentRole.jobTitle} at ${recentRole.company}, I ${recentRole.responsibilities[0]?.toLowerCase() || 'contributed to delivering impactful results'}.`
    : '';

  const summarySnippet = summary || 'I bring a track record of delivering measurable outcomes across projects.';

  const letter = `${greeting}

I am writing to express my interest in the ${jobTitle} position at ${company}. ${summarySnippet}

${experienceSnippet}${skillsList ? ` My core skills include ${skillsList}.` : ''}

${whyThisRole || `I am particularly drawn to ${company} and believe my background aligns well with the requirements of this role.`}

I would welcome the opportunity to discuss how I can contribute to your team. Thank you for your time and consideration.

Sincerely,
${personalInfo.fullName}
${[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' · ')}`;

  return letter.slice(0, 1500);
}

export function getCoverLetterCharState(length: number): 'normal' | 'warning' | 'danger' | 'locked' {
  if (length >= 1500) return 'locked';
  if (length >= 1400) return 'danger';
  if (length >= 1200) return 'warning';
  return 'normal';
}
