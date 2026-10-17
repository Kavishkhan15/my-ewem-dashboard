'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Assignment, StudentProfile, AnalyticsMetric, ReclaimBackupData, FileRecord } from '@/types/domain';
import { INITIAL_ASSIGNMENTS, INITIAL_PROFILE, INITIAL_ANALYTICS, INITIAL_FILES } from './seedData';

interface StorageContextType {
  assignments: Assignment[];
  profile: StudentProfile;
  analytics: AnalyticsMetric[];
  analyticsMetrics: AnalyticsMetric[];
  files: FileRecord[];
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  updateProfile: (profile: StudentProfile) => void;
  updateMetric: (id: string, updates: Partial<AnalyticsMetric>) => void;
  addFile: (file: FileRecord) => void;
  deleteFile: (id: string) => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => { success: boolean; message: string; error?: string };
  resetToSeed: () => void;
  isLoaded: boolean;
}

const STORAGE_KEYS = {
  ASSIGNMENTS: 'reclaim_assignments_v3',
  PROFILE: 'reclaim_profile_v3',
  ANALYTICS: 'reclaim_analytics_v3',
  FILES: 'reclaim_files_v3',
  THEME: 'reclaim_theme_v3',
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [analytics, setAnalytics] = useState<AnalyticsMetric[]>(INITIAL_ANALYTICS);
  const [files, setFiles] = useState<FileRecord[]>(INITIAL_FILES);
  const [theme, setThemeState] = useState<'dark' | 'light'>('light');
  const [isLoaded, setIsLoaded] = useState(true);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const storedAnalytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      const storedFiles = localStorage.getItem(STORAGE_KEYS.FILES);
      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light' | null;

      if (storedAssignments) {
        setAssignments(JSON.parse(storedAssignments));
      }
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedAnalytics) {
        setAnalytics(JSON.parse(storedAnalytics));
      }
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
      const activeTheme = storedTheme || 'light';
      setThemeState(activeTheme);
      document.documentElement.classList.toggle('light', activeTheme === 'light');
      document.documentElement.classList.toggle('dark', activeTheme === 'dark');
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...updates, lastModified: new Date().toISOString() } : item
      );
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
  };

  const updateMetric = (id: string, updates: Partial<AnalyticsMetric>) => {
    setAnalytics((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(updated));
      return updated;
    });
  };

  const addFile = (file: FileRecord) => {
    setFiles((prev) => {
      const updated = [file, ...prev];
      localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(updated));
      return updated;
    });
    // Associate with assignment
    updateAssignment(file.assignmentId, {
      files: [...(assignments.find((a) => a.id === file.assignmentId)?.files || []), file],
    });
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(updated));
      return updated;
    });
  };

  const exportBackup = (): string => {
    const backup: ReclaimBackupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      profile,
      assignments,
      analyticsMetrics: analytics,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackup = (jsonString: string): { success: boolean; message: string; error?: string } => {
    try {
      const data: ReclaimBackupData = JSON.parse(jsonString);
      if (!data.version || !Array.isArray(data.assignments)) {
        return {
          success: false,
          message: 'Invalid backup file format: missing required assignment array.',
          error: 'Invalid backup file format: missing required assignment array.',
        };
      }
      if (data.assignments.length !== 14) {
        return {
          success: false,
          message: `Backup integrity check failed: expected exactly 14 assignments, found ${data.assignments.length}.`,
          error: `Backup integrity check failed: expected exactly 14 assignments, found ${data.assignments.length}.`,
        };
      }
      const expectedIds = Array.from({ length: 14 }, (_, i) => `EW-${String(i + 1).padStart(2, '0')}`);
      const assignmentIds = new Set(data.assignments.map((a) => a.id));
      const hasAllExpectedIds = expectedIds.every((id) => assignmentIds.has(id));
      if (!hasAllExpectedIds) {
        return {
          success: false,
          message: 'Backup integrity check failed: assignments must contain exactly IDs EW-01 through EW-14.',
          error: 'Backup integrity check failed: assignments must contain exactly IDs EW-01 through EW-14.',
        };
      }
      setAssignments(data.assignments);
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(data.assignments));
      if (data.profile) {
        setProfile(data.profile);
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
      }
      if (data.analyticsMetrics && Array.isArray(data.analyticsMetrics)) {
        setAnalytics(data.analyticsMetrics);
        localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(data.analyticsMetrics));
      }
      return { success: true, message: 'Backup imported successfully with all 14 assignments restored.' };
    } catch (e: any) {
      return {
        success: false,
        message: 'JSON parse error: file is corrupted or not a valid JSON document.',
        error: e?.message || 'JSON parse error',
      };
    }
  };

  const resetToSeed = () => {
    setAssignments(INITIAL_ASSIGNMENTS);
    setProfile(INITIAL_PROFILE);
    setAnalytics(INITIAL_ANALYTICS);
    setFiles([]);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(INITIAL_ANALYTICS));
    localStorage.removeItem(STORAGE_KEYS.FILES);
  };

  return (
    <StorageContext.Provider
      value={{
        assignments,
        profile,
        analytics,
        analyticsMetrics: analytics,
        files,
        theme,
        setTheme,
        updateAssignment,
        updateProfile,
        updateMetric,
        addFile,
        deleteFile,
        exportBackup,
        importBackup,
        resetToSeed,
        isLoaded,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
}
