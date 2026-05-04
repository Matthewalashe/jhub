import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, ProfileSection } from '../types';
import { createEmptyProfile } from '../types';

interface ProfileStore {
  profile: UserProfile;
  completedSections: Set<ProfileSection>;
  setProfile: (profile: UserProfile) => void;
  updatePersonalInfo: (info: Partial<UserProfile['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: UserProfile['experience']) => void;
  updateEducation: (education: UserProfile['education']) => void;
  updateSkills: (skills: UserProfile['skills']) => void;
  updateCertifications: (certifications: UserProfile['certifications']) => void;
  updateLanguages: (languages: UserProfile['languages']) => void;
  updateReferees: (referees: UserProfile['referees']) => void;
  toggleShowReferees: () => void;
  markSectionComplete: (section: ProfileSection) => void;
  resetProfile: () => void;
  getCompletionPercentage: () => number;
  isProfileComplete: () => boolean;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: createEmptyProfile(),
      completedSections: new Set<ProfileSection>(),

      setProfile: (profile) =>
        set({ profile: { ...profile, lastUpdated: new Date().toISOString() } }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          profile: {
            ...state.profile,
            personalInfo: { ...state.profile.personalInfo, ...info },
            lastUpdated: new Date().toISOString(),
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          profile: { ...state.profile, summary, lastUpdated: new Date().toISOString() },
        })),

      updateExperience: (experience) =>
        set((state) => ({
          profile: { ...state.profile, experience, lastUpdated: new Date().toISOString() },
        })),

      updateEducation: (education) =>
        set((state) => ({
          profile: { ...state.profile, education, lastUpdated: new Date().toISOString() },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          profile: { ...state.profile, skills, lastUpdated: new Date().toISOString() },
        })),

      updateCertifications: (certifications) =>
        set((state) => ({
          profile: { ...state.profile, certifications, lastUpdated: new Date().toISOString() },
        })),

      updateLanguages: (languages) =>
        set((state) => ({
          profile: { ...state.profile, languages, lastUpdated: new Date().toISOString() },
        })),

      updateReferees: (referees) =>
        set((state) => ({
          profile: { ...state.profile, referees, lastUpdated: new Date().toISOString() },
        })),

      toggleShowReferees: () =>
        set((state) => ({
          profile: { ...state.profile, showReferees: !state.profile.showReferees },
        })),

      markSectionComplete: (section) =>
        set((state) => {
          const newSet = new Set(state.completedSections);
          newSet.add(section);
          return { completedSections: newSet };
        }),

      resetProfile: () =>
        set({ profile: createEmptyProfile(), completedSections: new Set() }),

      getCompletionPercentage: () => {
        const state = get();
        const totalSections = 8;
        return Math.round((state.completedSections.size / totalSections) * 100);
      },

      isProfileComplete: () => {
        const state = get();
        const p = state.profile;
        return !!(
          p.personalInfo.fullName &&
          p.personalInfo.email &&
          p.summary &&
          p.experience.length > 0 &&
          p.education.length > 0 &&
          p.skills.length > 0
        );
      },
    }),
    {
      name: 'jhub-profile',
      partialize: (state) => ({
        profile: state.profile,
        completedSections: Array.from(state.completedSections),
      }),
      merge: (persisted: unknown, current) => {
        const data = persisted as { profile?: UserProfile; completedSections?: ProfileSection[] };
        return {
          ...current,
          profile: data?.profile ?? current.profile,
          completedSections: new Set(data?.completedSections ?? []),
        };
      },
    }
  )
);
