'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Layers,
  FileArchive,
  Download,
  AlertCircle,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCode,
  Image as ImageIcon,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { Button, StatusBadge, cn } from '@/components/ui/primitives';
import { UniversalFileViewer } from '@/components/viewer/UniversalFileViewer';
import { ResearchPaperViewer } from '@/components/viewer/ResearchPaperViewer';
import { FileRecord } from '@/types/domain';

export default function AssignmentDetailPage() {
  const params = useParams();
  const { assignments, isLoaded } = useStorage();

  const id = params?.id as string;
  const assignment = useMemo(() => assignments.find((a) => a.id === id), [assignments, id]);

  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-8 text-center font-mono text-xs tracking-wider text-text-muted">
          LOADING COURSEWORK DELIVERABLES...
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 border border-border bg-surface rounded-lg text-center space-y-4">
        <div className="w-10 h-10 mx-auto rounded border border-border flex items-center justify-center text-text-muted font-mono font-bold">
          404
        </div>
        <h2 className="text-xl font-bold font-display text-text">Coursework Record Not Found</h2>
        <p className="text-xs font-mono text-text-muted max-w-[65ch] mx-auto">
          No authoritative assignment matches identifier: <span className="text-emerald-accent">{id}</span>.
          Valid coursework identifiers are EW-01 through EW-15.
        </p>
        <Link href="/assignments" className="inline-block pt-2">
          <Button variant="outline" size="sm">
            Return to Coursework Gallery
          </Button>
        </Link>
      </div>
    );
  }

  const hasFiles = assignment.files && assignment.files.length > 0;
  const activeFile = hasFiles
    ? assignment.files.find((f) => f.id === activeFileId) || assignment.files[0]
    : null;

  // Format indicators for file items
  const getFileIcon = (previewType: FileRecord['previewType']) => {
    switch (previewType) {
      case 'spreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-accent" />;
      case 'presentation':
        return <Presentation className="w-4 h-4 text-emerald-accent" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-emerald-accent" />;
      case 'html':
        return <FileCode className="w-4 h-4 text-emerald-accent" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-emerald-accent" />;
      default:
        return <FileText className="w-4 h-4 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <Link
          href="/assignments"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-emerald-accent transition-colors group py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>COURSEWORK GALLERY</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-text-muted">RECORD:</span>
          <span className="font-bold text-emerald-accent px-2 py-0.5 rounded bg-surface-raised border border-border">
            {assignment.id}
          </span>
        </div>
      </div>

      {/* Assignment Header */}
      <div className="border border-border bg-surface p-6 sm:p-8 rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/30 text-emerald-accent font-bold">
              {assignment.id}
            </span>
            <StatusBadge type="category" value={assignment.category} />
          </div>

          <div className="flex items-center gap-2 text-text-muted">
            <Calendar className="w-3.5 h-3.5 text-text-muted" />
            {assignment.id === 'EW-15' ? (
              <span>Submission Deadline: <strong className="text-amber-accent font-mono">October 7, 2026, 11:59 PM</strong></span>
            ) : (
              <span>Course Activity: <strong className="text-text font-mono">{assignment.portalActivityDate}</strong></span>
            )}
          </div>
        </div>

        <div className="space-y-2 pt-1 border-t border-border/50">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text font-display tracking-tight">
            {assignment.displayTitle}
          </h1>

          {assignment.id === 'EW-15' ? (
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="text-sm sm:text-base font-semibold text-text font-display leading-snug">
                Explanation Reliability and Failure Detection in Phishing URL Classification Under Dataset Shift
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
                <span>Author: <strong className="text-text">Kasim Ishaque Ghanchi</strong></span>
                <span>&bull;</span>
                <span>Deadline: <strong className="text-amber-accent font-mono">October 7, 2026 — 11:59 PM</strong></span>
                <span>&bull;</span>
                <span>Max Points: <strong className="text-text">20</strong></span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 pt-0.5">
              <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider shrink-0 mt-0.5">
                Original Portal Title:
              </span>
              <span className="text-xs font-mono text-text-muted bg-surface-raised px-2.5 py-0.5 rounded border border-border/60 break-all">
                {assignment.portalTitle}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Responsive Layout: Compact Left Panel (Files & Downloads) + Expansive Reading Canvas */}
      {hasFiles ? (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Compact Left File Navigation & Download Panel */}
          <aside className="space-y-4">
            <div className="border border-border bg-surface rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-text flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-accent" />
                  <span>Coursework Deliverables & Interactive Preview</span>
                </h2>
                <span className="text-xs font-mono text-emerald-accent px-2 py-0.5 rounded bg-emerald-accent/10 border border-emerald-accent/20">
                  {assignment.files.length}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] text-text-muted font-mono pb-1">
                  Select a deliverable to inspect:
                </div>

                {assignment.files.map((file) => {
                  const isSelected = activeFile?.id === file.id;
                  const downloadUrl = file.publicUrl || file.contentUrl || '#';

                  return (
                    <div
                      key={file.id}
                      className={cn(
                        'group flex items-center justify-between p-2.5 rounded-lg border transition-all text-left',
                        isSelected
                          ? 'bg-surface-raised border-emerald-accent/80 shadow-xs'
                          : 'bg-surface hover:bg-surface-raised border-border'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFileId(file.id)}
                        className="flex items-center gap-2.5 flex-1 min-w-0 pr-2 text-left"
                        title={`Preview ${file.name}`}
                      >
                        <span className="shrink-0">{getFileIcon(file.previewType)}</span>
                        <div className="min-w-0 flex-1">
                          <div
                            className={cn(
                              'text-xs font-mono truncate',
                              isSelected ? 'text-emerald-accent font-semibold' : 'text-text group-hover:text-emerald-accent'
                            )}
                            title={file.name}
                          >
                            {file.name}
                          </div>
                          <div className="text-[10px] font-mono text-text-muted flex items-center gap-2 pt-0.5">
                            <span>{(file.size / 1024).toFixed(1)} KB</span>
                            <span>•</span>
                            <span className="uppercase">{file.previewType}</span>
                          </div>
                        </div>
                      </button>

                      <a
                        href={downloadUrl}
                        download={file.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-text-muted hover:text-emerald-accent rounded hover:bg-surface border border-transparent hover:border-border transition-colors shrink-0"
                        title={`Download ${file.name}`}
                        aria-label={`Download ${file.name}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Download All (ZIP) Action */}
              <div className="pt-3 border-t border-border/60">
                <a
                  href={`/api/download/${assignment.id}`}
                  download
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-emerald-accent/10 hover:bg-emerald-accent/20 border border-emerald-accent/30 text-emerald-accent font-mono text-xs font-semibold transition-colors"
                >
                  <FileArchive className="w-4 h-4" />
                  <span>Download All (ZIP)</span>
                </a>
              </div>
            </div>

            {/* Academic Curriculum Scope Note */}
            <div className="border border-border bg-surface/60 p-4 rounded-xl space-y-2 text-xs font-mono">
              <div className="text-text font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-accent" />
                <span>Curriculum Context</span>
              </div>
              <p className="text-text-muted leading-relaxed font-sans text-xs">
                Authoritative coursework submission cataloged under <strong className="text-text">{assignment.category}</strong>. Delivered in original file formats for academic review.
              </p>
            </div>
          </aside>

          {/* Expansive Reading Canvas (Takes most horizontal space on desktop) */}
          <main className="space-y-4 min-w-0">
            {/* Action Bar Above Canvas */}
            <div className="border border-border bg-surface px-4 py-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 truncate">
                <span className="text-text-muted">PREVIEWING:</span>
                {activeFile ? (
                  <span className="font-bold text-text truncate max-w-sm sm:max-w-lg" title={activeFile.name}>
                    {activeFile.name}
                  </span>
                ) : null}
              </div>

              {activeFile && (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeFile.publicUrl || activeFile.contentUrl || '#'}
                    download={activeFile.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-surface border border-border hover:border-emerald-accent/50 text-text transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-accent" />
                    <span>Download File</span>
                  </a>
                </div>
              )}
            </div>

            {/* Universal Interactive Document Preview Mount / Research Paper Specialized Viewer */}
            {assignment.id === 'EW-15' ? (
              <div className="w-full">
                <ResearchPaperViewer />
              </div>
            ) : activeFile ? (
              <div className="w-full">
                <UniversalFileViewer file={activeFile} />
              </div>
            ) : null}
          </main>
        </div>
      ) : (
        /* Dignified, Clean Empty State For Assignments Awaiting Ingestion */
        <div className="border border-border bg-surface rounded-xl p-8 sm:p-14 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border border-border bg-surface-raised flex items-center justify-center mx-auto text-text-muted">
            <AlertCircle className="w-6 h-6 text-emerald-accent" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-bold font-display text-text">Files Not Available Yet</h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
              No coursework deliverables are currently registered for assignment {assignment.id}. Real student materials will appear here once provided.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/assignments">
              <Button variant="outline" size="sm">
                Return to Coursework Gallery
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
