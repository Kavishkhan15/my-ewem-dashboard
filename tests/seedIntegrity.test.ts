import { describe, it, expect } from 'vitest';
import rawSeed from '../data/assignments.seed.json';

describe('Authoritative 15-Assignment Seed Integrity', () => {
  it('contains exactly 15 assignment records', () => {
    expect(rawSeed.assignments).toHaveLength(15);
  });

  it('contains sequential IDs from EW-01 through EW-15', () => {
    const ids = rawSeed.assignments.map((a: any) => a.id);
    const expectedIds = Array.from({ length: 15 }, (_, i) => `EW-${String(i + 1).padStart(2, '0')}`);
    expect(ids).toEqual(expectedIds);
  });

  it('observes green badges on exactly 13 assignments (EW-02 to EW-14, false for EW-01 and EW-15)', () => {
    const ew01 = rawSeed.assignments.find((a: any) => a.id === 'EW-01');
    expect(ew01).toBeDefined();
    expect(ew01!.portalBadgeObserved).toBe(false);
    expect(ew01!.portalBadgeText).toBeNull();

    const ew15 = rawSeed.assignments.find((a: any) => a.id === 'EW-15');
    expect(ew15).toBeDefined();
    expect(ew15!.portalBadgeObserved).toBe(false);
    expect(ew15!.portalBadgeText).toBeNull();

    const badgeObserved = rawSeed.assignments.filter((a: any) => a.id !== 'EW-01' && a.id !== 'EW-15');
    expect(badgeObserved).toHaveLength(13);
    badgeObserved.forEach((a: any) => {
      expect(a.portalBadgeObserved).toBe(true);
      expect(a.portalBadgeText).toBe('Turned in');
    });
  });

  it('verifies EW-15 specific fields and metadata', () => {
    const ew15 = rawSeed.assignments.find((a: any) => a.id === 'EW-15');
    expect(ew15).toBeDefined();
    expect(ew15!.dueDate).toBe('2026-10-07T23:59:00');
    expect(ew15!.category).toBe('Academic Research');
    expect(ew15!.portalBadgeObserved).toBe(false);
    expect(ew15!.portalBadgeText).toBeNull();
  });

  it('initializes actual submission and review states to unverified/not_reviewed', () => {
    rawSeed.assignments.forEach((a: any) => {
      expect(a.actualSubmissionStatus).toBe('unverified');
      expect(a.workStatus).toBe('not_reviewed');
      expect(a.qualityStatus).toBe('not_assessed');
      expect(a.grade).toBeNull();
      expect(a.published).toBe(false);

      if (a.id === 'EW-15') {
        expect(a.dueDate).toBe('2026-10-07T23:59:00');
      } else {
        expect(a.dueDate).toBeNull();
      }
    });
  });

  it('matches exact category distribution: 4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Admin, 1 Academic Research', () => {
    const counts: Record<string, number> = {};
    rawSeed.assignments.forEach((a: any) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });

    expect(counts['Data Analytics & Tracking']).toBe(4);
    expect(counts['Technical & Recovery Processes']).toBe(3);
    expect(counts['Research, Policy & Sustainability']).toBe(4);
    expect(counts['Innovation & Awareness']).toBe(2);
    expect(counts['Assessment / Administrative']).toBe(1);
    expect(counts['Academic Research']).toBe(1);
  });
});
