'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  ArrowRight,
  FileText,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge } from '@/components/ui/primitives';

export default function CourseTimelinePage() {
  const { assignments, isLoaded } = useStorage();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-8 text-center font-mono text-xs tracking-wider text-text-muted">
          LOADING COURSEWORK CHRONOLOGY...
        </div>
      </div>
    );
  }

  // Sort assignments strictly by portal activity date and secondary ID
  const timelineSorted = [...assignments].sort((a, b) => {
    const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
    if (comp !== 0) return comp;
    return a.id.localeCompare(b.id);
  });

  // Group by month
  const monthlyGroups: { monthYear: string; items: typeof timelineSorted }[] = [];
  timelineSorted.forEach((assignment) => {
    const dateObj = new Date(assignment.portalActivityDate);
    const monthYear = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    let group = monthlyGroups.find((g) => g.monthYear === monthYear);
    if (!group) {
      group = { monthYear, items: [] };
      monthlyGroups.push(group);
    }
    group.items.push(assignment);
  });

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Editorial Header */}
      <div className="border-b border-border/60 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-surface border border-border text-xs font-mono text-emerald-accent uppercase tracking-tech">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
          <span>Curricular Progression &bull; July &ndash; October 2026</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tightest text-text font-display">
            Course Activity Chronology
          </h1>
          <p className="text-base text-text-muted max-w-2xl font-light">
            Sequential index of 15 coursework activity and research milestone records. Grouped by calendar milestone.
          </p>
        </div>
      </div>

      {/* Swiss Chronological Stream by Month */}
      <div className="space-y-12">
        {monthlyGroups.map((group) => (
          <div key={group.monthYear} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-accent">
                {group.monthYear}
              </h2>
              <div className="h-px bg-border/80 flex-1" />
              <span className="text-xs font-mono text-text-muted">
                {group.items.length} {group.items.length === 1 ? 'Milestone' : 'Milestones'}
              </span>
            </div>

            <div className="divide-y divide-border/60 border border-border rounded-xl bg-surface overflow-hidden">
              {group.items.map((assignment) => {
                const hasFiles = assignment.files && assignment.files.length > 0;
                const isDeadline = assignment.id === 'EW-15' && assignment.dueDate;

                return (
                  <div
                    key={assignment.id}
                    className="p-5 sm:p-6 hover:bg-surface-raised/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                  >
                    {/* Left details */}
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2.5 flex-wrap text-xs font-mono">
                        <span className="font-bold text-emerald-accent px-2 py-0.5 rounded bg-surface-raised border border-border">
                          {assignment.id}
                        </span>
                        <span className="text-text-muted flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-accent" />
                          <span>
                            {isDeadline ? 'October 7, 2026 — 11:59 PM (Deadline)' : assignment.portalActivityDate}
                          </span>
                        </span>
                        {isDeadline && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-accent/10 border border-amber-accent/30 text-amber-accent font-semibold">
                            Submission Deadline
                          </span>
                        )}
                        <StatusBadge type="category" value={assignment.category} />
                        {hasFiles ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border text-emerald-accent font-semibold">
                            {assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border/70 text-text-muted">
                            Awaiting files
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <Link
                          href={`/assignments/${assignment.id}`}
                          className="text-base sm:text-lg font-bold text-text group-hover:text-emerald-accent transition-colors block"
                        >
                          {assignment.displayTitle}
                        </Link>
                        <div className="text-xs font-mono text-text-muted truncate">
                          <span className="text-text-muted/40 uppercase mr-1">Portal:</span>
                          {assignment.portalTitle}
                        </div>
                      </div>
                    </div>

                    {/* Right Action Button */}
                    <div className="shrink-0 self-start md:self-auto">
                      <Link href={`/assignments/${assignment.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 text-xs font-medium group-hover:border-emerald-accent/50 group-hover:text-emerald-accent"
                        >
                          <span>Inspect Deliverable</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
