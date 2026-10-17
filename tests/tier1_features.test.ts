import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import rawSeed from '../data/assignments.seed.json';
import { INITIAL_ASSIGNMENTS } from '@/lib/storage/seedData';
import { StorageProvider } from '@/lib/storage/StorageContext';
import HomePage from '@/app/page';
import AssignmentLibraryPage from '@/app/assignments/page';
import AssignmentDetailPage from '@/app/assignments/[id]/page';
import CourseTimelinePage from '@/app/timeline/page';

// Mock next/navigation
let mockParams = { id: 'EW-01' };
let mockPathname = '/';

vi.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => mockPathname,
}));

// Helper to render inside StorageProvider
function renderInProvider(component: React.ComponentType) {
  return render(
    React.createElement(StorageProvider, null, React.createElement(component, null))
  );
}

describe('RECLAIM Minimal Academic Portfolio Coverage', () => {
  beforeEach(() => {
    localStorage.clear();
    mockParams = { id: 'EW-01' };
    mockPathname = '/';
  });

  describe('1. Authoritative 14-Assignment Seed Ingestion', () => {
    it('ingests exactly 14 records with contiguous IDs EW-01 through EW-14', () => {
      expect(rawSeed.assignments).toHaveLength(14);
      expect(INITIAL_ASSIGNMENTS).toHaveLength(14);

      const ids = INITIAL_ASSIGNMENTS.map((a) => a.id);
      const expectedIds = Array.from({ length: 14 }, (_, i) => `EW-${String(i + 1).padStart(2, '0')}`);
      expect(ids).toEqual(expectedIds);
    });

    it('preserves exact verbatim portal titles for all 14 assignments', () => {
      const expectedPortalTitles: Record<string, string> = {
        'EW-01': 'Toxic Chemicals_Any 5',
        'EW-02': 'Assignment 2_Submit the Class Activity_Map of e waste',
        'EW-03': 'Assignment 3_Elemental Recovery Process Update',
        'EW-04': 'Assignment Zero_Check AAP',
        'EW-05': 'Assignment 1_E waste Traker',
        'EW-06': 'E waste India Vs World Data Task_Class Activity',
        'EW-07': 'Carbon Footprint Task_Excel activity Task',
        'EW-08': 'TE CMPN C PPT_State tracker submission Folder',
        'EW-09': 'E Waste Recovery Process_Modification for Design Patent',
        'EW-10': 'Indian Companies Following E waste Rules_Comparative Study',
        'EW-11': 'Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C',
        'EW-12': 'Campaign For E Waste in Campus_Class Activity',
        'EW-13': 'LEED Certification of Green Buildings in India',
        'EW-14': 'Case Studies E waste',
      };

      INITIAL_ASSIGNMENTS.forEach((a) => {
        expect(a.portalTitle).toBe(expectedPortalTitles[a.id]);
      });
    });

    it('maintains strict category distribution: 4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Admin', () => {
      const counts: Record<string, number> = {};
      INITIAL_ASSIGNMENTS.forEach((a) => {
        counts[a.category] = (counts[a.category] || 0) + 1;
      });

      expect(counts['Data Analytics & Tracking']).toBe(4);
      expect(counts['Technical & Recovery Processes']).toBe(3);
      expect(counts['Research, Policy & Sustainability']).toBe(4);
      expect(counts['Innovation & Awareness']).toBe(2);
      expect(counts['Assessment / Administrative']).toBe(1);
      expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(14);
    });
  });

  describe('2. Three Main Portfolio Pages Render Cleanly', () => {
    it('Route 1: renders Home Page (/) with truthful academic introduction and counts', () => {
      renderInProvider(HomePage);

      expect(screen.getByText(/E-Waste & Environmental Management/i)).toBeDefined();
      expect(screen.getByText(/Coursework Curriculum/i)).toBeDefined();
      expect(screen.getByText(/Downloadable Deliverables/i)).toBeDefined();
      expect(screen.getByText(/Featured Academic Coursework/i)).toBeDefined();
    });

    it('Route 2: renders Assignments Gallery (/assignments) with search and filters', () => {
      renderInProvider(AssignmentLibraryPage);

      expect(screen.getByText('Academic Coursework Gallery')).toBeDefined();
      expect(screen.getByPlaceholderText('Search title, ID, topic...')).toBeDefined();
      expect(screen.getByText(/All Categories/i)).toBeDefined();
    });

    it('Route 3: renders Assignment Detail (/assignments/[id]) in viewer-only mode', () => {
      mockParams = { id: 'EW-05' };
      renderInProvider(AssignmentDetailPage);

      expect(screen.getByText('Assignment 1 — E-Waste Tracker')).toBeDefined();
      expect(screen.getByText(/Portal Exact Title:/)).toBeDefined();
      expect(screen.getByText(/Coursework Deliverables & Interactive Preview/i)).toBeDefined();
      expect(screen.getByText(/Download All \(ZIP\)/i)).toBeDefined();
    });

    it('Route 3 fallback: renders clear awaiting status for assignments without files', () => {
      mockParams = { id: 'EW-01' };
      renderInProvider(AssignmentDetailPage);

      expect(screen.getByText('Toxic Chemicals — Any Five')).toBeDefined();
      expect(screen.getByText('Files Not Available Yet')).toBeDefined();
    });

    it('Route 4: renders Course Timeline (/timeline) with 14 chronological entries', () => {
      renderInProvider(CourseTimelinePage);

      expect(screen.getByText('Course Activity Chronology')).toBeDefined();
      expect(screen.getByText('EW-01')).toBeDefined();
      expect(screen.getByText('EW-14')).toBeDefined();
    });
  });
});
