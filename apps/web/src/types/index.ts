/* ═══════════════════════════════════════════════════════
   JHUB — Core TypeScript Interfaces
   ═══════════════════════════════════════════════════════ */

// ── Master Profile ──────────────────────────────────────

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  honours?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface Referee {
  id: string;
  name: string;
  title: string;
  organisation: string;
  email: string;
  phone: string;
}

export interface UserProfile {
  id: string;
  userId?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  referees: Referee[];
  showReferees: boolean;
  lastUpdated: string;
}

// ── Jobs ────────────────────────────────────────────────

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'Onsite' | 'Hybrid';
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  description: string;
  requirements: string[];
  responsibilities: string[];
  hrEmail?: string;
  deadline: string;
  postedDate: string;
  source: 'direct' | 'aggregated';
  isBoosted: boolean;
  externalUrl?: string;
  salary?: string;
}

// ── Opportunities ───────────────────────────────────────

export interface Scholarship {
  id: string;
  slug: string;
  title: string;
  provider: string;
  eligibility: string;
  deadline: string;
  link: string;
  country: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  provider: string;
  mode: 'Online' | 'In-person' | 'Hybrid';
  priceNote: 'Free' | 'Paid' | 'Freemium';
  link: string;
  category: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  city: string;
  mode: 'In-person' | 'Online' | 'Hybrid';
  date: string;
  venue: string;
  description: string;
  link: string;
}

export type Opportunity =
  | { type: 'scholarship'; data: Scholarship }
  | { type: 'course'; data: Course }
  | { type: 'event'; data: Event };

// ── CV Templates ────────────────────────────────────────

export type CVTemplate = 'global' | 'european' | 'american' | 'au' | 'ecowas';

// ── Profile Builder ─────────────────────────────────────

export type ProfileSection =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'referees';

export const PROFILE_SECTIONS: { key: ProfileSection; label: string; icon: string }[] = [
  { key: 'personal', label: 'Personal Info', icon: 'User' },
  { key: 'summary', label: 'Professional Summary', icon: 'FileText' },
  { key: 'experience', label: 'Work Experience', icon: 'Briefcase' },
  { key: 'education', label: 'Education', icon: 'GraduationCap' },
  { key: 'skills', label: 'Skills', icon: 'Zap' },
  { key: 'certifications', label: 'Certifications', icon: 'Award' },
  { key: 'languages', label: 'Languages', icon: 'Globe' },
  { key: 'referees', label: 'Referees', icon: 'Users' },
];

// ── Helpers ─────────────────────────────────────────────

export function createEmptyProfile(): UserProfile {
  return {
    id: crypto.randomUUID(),
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    referees: [],
    showReferees: false,
    lastUpdated: new Date().toISOString(),
  };
}

export function createWorkExperience(): WorkExperience {
  return {
    id: crypto.randomUUID(),
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    responsibilities: [],
  };
}

export function createEducation(): Education {
  return {
    id: crypto.randomUUID(),
    degree: '',
    institution: '',
    graduationYear: '',
  };
}

export function createCertification(): Certification {
  return {
    id: crypto.randomUUID(),
    name: '',
    issuer: '',
    year: '',
  };
}

export function createLanguage(): Language {
  return {
    id: crypto.randomUUID(),
    name: '',
    proficiency: 'Conversational',
  };
}

export function createReferee(): Referee {
  return {
    id: crypto.randomUUID(),
    name: '',
    title: '',
    organisation: '',
    email: '',
    phone: '',
  };
}
