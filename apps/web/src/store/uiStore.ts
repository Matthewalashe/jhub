import { create } from 'zustand';
import type { CVTemplate } from '../types';

interface UIStore {
  activeTemplate: CVTemplate;
  setActiveTemplate: (template: CVTemplate) => void;
  activeProfileSection: number;
  setActiveProfileSection: (index: number) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeTemplate: 'global',
  setActiveTemplate: (template) => set({ activeTemplate: template }),
  activeProfileSection: 0,
  setActiveProfileSection: (index) => set({ activeProfileSection: index }),
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
