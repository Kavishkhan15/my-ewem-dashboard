'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  ArrowRight,
  Download,
  Calendar,
  X,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Card, Button, StatusBadge, cn } from '@/components/ui/primitives';
import { AssignmentCategory } from '@/types/domain';

export default function AssignmentLibraryPage() {
  const { assignments, isLoaded } = useStorage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categories: { label: string; value: string; count?: number }[] = useMemo(() => {
    const list: { label: string; value: string; count?: number }[] = [
      { label: 'All Records', value: 'all', count: assignments.length },
      { label: 'Academic Research', value: 'Academic Research' },
      { label: 'Data Analytics', value: 'Data Analytics & Tracking' },
      { label: 'Technical & Recovery', value: 'Technical & Recovery Processes' },
      { label: 'Research & Policy', value: 'Research, Policy & Sustainability' },
      { label: 'Innovation', value: 'Innovation & Awareness' },
      { label: 'Administrative', value: 'Assessment / Administrative' },
    ];
    return list.map((cat) => {
      if (cat.value === 'all') return cat;
      const count = assignments.filter((a) => a.category === cat.value).length;
      return { ...cat, count };
    });
  }, [assignments]);

  // Filter and sort assignments
  const filteredAssignments = useMemo(() => {
    return assignments
      .filter((a) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          a.displayTitle.toLowerCase().includes(query) ||
          a.portalTitle.toLowerCase().includes(query) ||
          a.id.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query);

        const matchesCategory =
          selectedCategory === 'all' || a.category === selectedCategory;

        const matchesAvailability =
          availabilityFilter === 'all' ||
          (availabilityFilter === 'has_files' && a.files.length > 0) ||
          (availabilityFilter === 'no_files' && a.files.length === 0);

        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [assignments, searchQuery, selectedCategory, availabilityFilter, sortOrder]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-sm font-mono text-text-muted animate-pulse">
          Loading coursework archive...
        </div>
      </div>
    );
  }

  // Helper to extract unique uppercase file extensions
  const getFileExtensions = (files: any[]) => {
    if (!files || files.length === 0) return [];
    return [
      ...new Set(
        files.map((f) => {
          const ext = f.ext || (f.name ? f.name.slice(f.name.lastIndexOf('.')) : '');
          return ext.toUpperCase().replace('.', '');
        })
      ),
    ];
  };

  // Asymmetric editorial bento span calculator based on index & total items
  const getBentoSpan = (index: number, total: number) => {
    if (total === 1) return 'col-span-12';
    if (total === 2) return 'col-span-12 md:col-span-6';

    const spanCycle = [
      'col-span-12 md:col-span-12 lg:col-span-7', // Anchor lead
      'col-span-12 md:col-span-6 lg:col-span-5',  // Companion technical
      'col-span-12 md:col-span-6 lg:col-span-5',  // Elemental process
      'col-span-12 md:col-span-12 lg:col-span-7', // Assessment review
      'col-span-12 md:col-span-12 lg:col-span-8', // Flagship dataset
      'col-span-12 md:col-span-6 lg:col-span-4',  // Comparative data
      'col-span-12 md:col-span-6 lg:col-span-4',  // Carbon footprint
      'col-span-12 md:col-span-12 lg:col-span-8', // State tracker PPT
      'col-span-12 md:col-span-6 lg:col-span-6',  // Patent recovery
      'col-span-12 md:col-span-6 lg:col-span-6',  // Corporate compliance
      'col-span-12 md:col-span-12 lg:col-span-7', // Pitch deck
      'col-span-12 md:col-span-6 lg:col-span-5',  // Campus campaign
      'col-span-12 md:col-span-6 lg:col-span-5',  // LEED green buildings
      'col-span-12 md:col-span-12 lg:col-span-7', // Case studies synthesis
    ];
    return spanCycle[index % spanCycle.length];
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent">
              Curriculum Repository
            </span>
            <span className="text-border text-xs">•</span>
            <span className="text-xs font-mono text-text-muted">
              {assignments.length} Official Records
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-text font-display">
            Academic Coursework Gallery
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-light max-w-2xl">
            Explore authoritative EW/EM deliverables across tracking datasets, regulatory audits, and elemental recovery processes.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-surface-raised/80 p-1 rounded-lg border border-border/60">
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              viewMode === 'grid'
                ? 'bg-surface text-emerald-accent shadow-sm border border-border/50'
                : 'text-text-muted hover:text-text'
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bento Grid</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            aria-label="Table view"
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              viewMode === 'table'
                ? 'bg-surface text-emerald-accent shadow-sm border border-border/50'
                : 'text-text-muted hover:text-text'
            )}
          >
            <ListIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Archive List</span>
          </button>
        </div>
      </div>

      {/* Refined Minimalist Search & Filter Interface */}
      <div className="space-y-4">
        {/* Search Bar & Secondary Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search assignments by title, ID, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-surface/80 border border-border/80 text-text placeholder-text-muted/70 focus:outline-none focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent/30 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Availability Select */}
          <div className="shrink-0 sm:w-48">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl bg-surface/80 border border-border/80 text-text focus:outline-none focus:border-emerald-accent transition-colors font-mono cursor-pointer"
            >
              <option value="all">All Deliverables</option>
              <option value="has_files">
                With Available Files ({assignments.filter((a) => a.files && a.files.length > 0).length})
              </option>
              <option value="no_files">
                Awaiting Files ({assignments.filter((a) => !a.files || a.files.length === 0).length})
              </option>
            </select>
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border/80 bg-surface/80 hover:bg-surface-raised text-xs font-mono text-text-muted hover:text-text transition-colors"
            title="Toggle chronological order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-accent" />
            <span className="hidden md:inline">Chronology:</span>
            <span>{sortOrder === 'asc' ? 'Earliest' : 'Latest'}</span>
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border',
                  isSelected
                    ? 'bg-emerald-accent/10 border-emerald-accent/40 text-emerald-accent font-semibold shadow-sm'
                    : 'bg-surface/50 border-border/60 text-text-muted hover:text-text hover:bg-surface-raised/60 hover:border-border'
                )}
              >
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span
                    className={cn(
                      'ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full',
                      isSelected
                        ? 'bg-emerald-accent/20 text-emerald-accent'
                        : 'bg-surface-raised text-text-muted'
                    )}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter Summary Status */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted/80 pt-1">
          <div>
            Displaying <span className="font-bold text-text">{filteredAssignments.length}</span> of {assignments.length} assignments
            {selectedCategory !== 'all' && (
              <span className="ml-2 text-emerald-accent font-sans">
                • Filtered by category
              </span>
            )}
          </div>
          {(searchQuery || selectedCategory !== 'all' || availabilityFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setAvailabilityFilter('all');
              }}
              className="text-xs text-emerald-accent hover:underline flex items-center gap-1"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <Card className="p-12 text-center space-y-4 my-8 border-dashed border-border/80">
          <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center mx-auto text-text-muted">
            <Search className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-text">No Coursework Found</h3>
            <p className="text-xs font-mono text-text-muted max-w-sm mx-auto">
              No assignments matched your search query or filter selection. Try modifying keywords or resetting filters.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setAvailabilityFilter('all');
            }}
          >
            Reset All Filters
          </Button>
        </Card>
      )}

      {/* Asymmetric Editorial Bento Layout */}
      {viewMode === 'grid' && filteredAssignments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {filteredAssignments.map((assignment, index) => {
            const hasFiles = assignment.files && assignment.files.length > 0;
            const exts = getFileExtensions(assignment.files);
            const spanClass = getBentoSpan(index, filteredAssignments.length);

            return (
              <div
                key={assignment.id}
                className={cn(
                  'group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface/90 hover:bg-surface-raised/40 hover:border-emerald-accent/40 transition-all duration-200 p-6 sm:p-7 shadow-sm',
                  spanClass
                )}
              >
                <div className="space-y-4">
                  {/* Top Header: ID + Portal Date + Portal Observation */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-accent px-2.5 py-1 rounded-md bg-emerald-accent/10 border border-emerald-accent/20">
                        {assignment.id}
                      </span>
                      {assignment.portalBadgeObserved && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-accent/90 bg-emerald-accent/5 border border-emerald-accent/20 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-accent" />
                          <span>Turned In</span>
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-text-muted flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-cyan-accent" />
                      <span>{assignment.portalActivityDate}</span>
                    </span>
                  </div>

                  {/* Title & Portal Raw String */}
                  <div className="space-y-1.5">
                    <Link
                      href={`/assignments/${assignment.id}`}
                      className="block group-hover:text-emerald-accent transition-colors"
                    >
                      <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-text leading-snug group-hover:text-emerald-accent transition-colors">
                        {assignment.displayTitle}
                      </h3>
                    </Link>
                    <p className="text-xs font-mono text-text-muted/70 tracking-wide line-clamp-1">
                      <span className="text-text-muted/40 uppercase text-[10px] mr-1.5">Portal:</span>
                      {assignment.portalTitle}
                    </p>
                  </div>

                  {/* Category & Format Tags */}
                  <div className="space-y-2.5 pt-1">
                    <StatusBadge type="category" value={assignment.category} />

                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {hasFiles ? (
                        <>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border text-emerald-accent font-semibold flex items-center gap-1">
                            <FileText className="w-3 h-3 text-emerald-accent" />
                            <span>
                              {assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}
                            </span>
                          </span>
                          {exts.map((ext) => (
                            <span
                              key={ext}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-raised border border-border/80 text-text-muted"
                            >
                              {ext}
                            </span>
                          ))}
                        </>
                      ) : (
                        /* Calm, dignified tactile badge for assignments awaiting files */
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide bg-surface-raised border border-border/70 text-text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
                          Awaiting File Ingestion
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="border-t border-border/60 pt-4 mt-6 flex items-center justify-between gap-2.5">
                  <Link href={`/assignments/${assignment.id}`} className="flex-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full justify-between text-xs font-medium group/btn hover:border-emerald-accent/50 hover:text-emerald-accent"
                    >
                      <span>Inspect Deliverable</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>

                  {hasFiles ? (
                    <a
                      href={`/api/download/${assignment.id}`}
                      download
                      className="inline-flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-border/80 bg-surface-raised/40 hover:bg-surface-raised text-text-muted hover:text-emerald-accent hover:border-emerald-accent/50 text-xs font-mono transition-colors shrink-0"
                      title="Download Assignment Files (ZIP)"
                      aria-label={`Download ${assignment.id} files as ZIP`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">ZIP</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-text-muted/40 px-2 py-1 select-none">
                      No archive
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Structured Archive Table Mode */}
      {viewMode === 'table' && filteredAssignments.length > 0 && (
        <div className="border border-border/80 rounded-2xl bg-surface/90 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-surface-raised/80 font-mono text-xs text-text-muted">
                  <th className="p-4 pl-6">ID</th>
                  <th className="p-4">Deliverable Title</th>
                  <th className="p-4">Domain Category</th>
                  <th className="p-4">Portal Date</th>
                  <th className="p-4">Deliverables</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/60 font-sans">
                {filteredAssignments.map((assignment) => {
                  const hasFiles = assignment.files && assignment.files.length > 0;
                  const exts = getFileExtensions(assignment.files);

                  return (
                    <tr
                      key={assignment.id}
                      className="hover:bg-surface-raised/40 transition-colors group"
                    >
                      <td className="p-4 pl-6 font-mono text-xs font-bold text-emerald-accent whitespace-nowrap">
                        {assignment.id}
                      </td>
                      <td className="p-4 max-w-md">
                        <Link
                          href={`/assignments/${assignment.id}`}
                          className="font-medium text-text group-hover:text-emerald-accent transition-colors block"
                        >
                          {assignment.displayTitle}
                        </Link>
                        <div className="text-xs text-text-muted/70 font-mono truncate mt-0.5">
                          <span className="text-text-muted/40 mr-1">REF:</span>
                          {assignment.portalTitle}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge type="category" value={assignment.category} />
                      </td>
                      <td className="p-4 font-mono text-xs text-text-muted whitespace-nowrap">
                        {assignment.portalActivityDate}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {hasFiles ? (
                          <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs text-emerald-accent">
                            <span className="font-semibold">
                              {assignment.files.length} file{assignment.files.length !== 1 ? 's' : ''}
                            </span>
                            <span className="text-[10px] text-text-muted">
                              ({exts.join(', ')})
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-text-muted bg-surface-raised border border-border/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
                            Awaiting Ingestion
                          </span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link href={`/assignments/${assignment.id}`}>
                            <Button size="sm" variant="outline" className="text-xs">
                              Inspect
                            </Button>
                          </Link>
                          {hasFiles && (
                            <a
                              href={`/api/download/${assignment.id}`}
                              download
                              className="p-2 rounded-lg border border-border/80 hover:text-emerald-accent hover:border-emerald-accent/50 text-text-muted transition-colors"
                              title="Download ZIP Archive"
                              aria-label={`Download ${assignment.id} ZIP`}
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
