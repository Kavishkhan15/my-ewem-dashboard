'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Download,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
  Presentation,
  FileCode,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Search,
  Laptop,
  Tablet,
  Smartphone,
  Check,
} from 'lucide-react';
import { FileRecord } from '@/types/domain';
import { Button } from '@/components/ui/primitives';

interface UniversalFileViewerProps {
  file: FileRecord;
  onClose?: () => void;
}

export function UniversalFileViewer({ file, onClose }: UniversalFileViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [htmlViewport, setHtmlViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const slides = file.slideImages || [];
  const hasSlides = slides.length > 0;
  const targetDownloadUrl = file.publicUrl || file.contentUrl || '#';

  // Keyboard navigation: Escape exits fullscreen, Left/Right navigates presentation slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      if (file.previewType === 'presentation' && hasSlides) {
        if (e.key === 'ArrowLeft') {
          setSlideIndex((i) => Math.max(0, i - 1));
        } else if (e.key === 'ArrowRight') {
          setSlideIndex((i) => Math.min(slides.length - 1, i + 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, file.previewType, hasSlides, slides.length]);

  return (
    <div
      className={`flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 shadow-tactile ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none bg-canvas border-none p-4 md:p-6'
          : 'w-full min-h-[540px]'
      }`}
    >
      {/* Precision Instrument Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-raised border-b border-border">
        <div className="flex items-center gap-3 truncate max-w-xl">
          <span className="p-2 rounded-lg bg-surface border border-border text-emerald-accent shrink-0">
            {file.previewType === 'pdf' && <FileText className="w-4 h-4 text-emerald-accent" />}
            {file.previewType === 'presentation' && <Presentation className="w-4 h-4 text-amber-accent" />}
            {file.previewType === 'spreadsheet' && <FileSpreadsheet className="w-4 h-4 text-cyan-accent" />}
            {file.previewType === 'html' && <FileCode className="w-4 h-4 text-emerald-accent" />}
            {file.previewType === 'image' && <ImageIcon className="w-4 h-4 text-cyan-accent" />}
            {file.previewType === 'document' && <FileText className="w-4 h-4 text-emerald-accent" />}
            {(file.previewType === 'binary' || file.previewType === 'download_only') && (
              <AlertCircle className="w-4 h-4 text-amber-accent" />
            )}
          </span>
          <div className="truncate">
            <h4 className="text-xs md:text-sm font-semibold text-text truncate tracking-tight" title={file.name}>
              {file.name}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted mt-0.5">
              <span>{(file.size / 1024).toFixed(1)} KB</span>
              <span>&bull;</span>
              <span className="uppercase text-text-muted/80">{file.previewType}</span>
              {file.verifiedSafe && (
                <>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1 text-emerald-accent">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Integrity
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls for Image view */}
          {file.previewType === 'image' && (
            <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                className="p-1.5 text-text-muted hover:text-text rounded-md hover:bg-surface-raised transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-2 text-text-muted min-w-[3rem] text-center select-none">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(3.0, z + 0.25))}
                className="p-1.5 text-text-muted hover:text-text rounded-md hover:bg-surface-raised transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-text-muted hover:text-text rounded-md hover:bg-surface-raised transition-colors border-l border-border ml-0.5"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Viewport switcher for HTML sandboxed coursework */}
          {file.previewType === 'html' && (
            <div className="hidden sm:flex items-center gap-0.5 bg-surface border border-border rounded-lg p-0.5">
              <button
                onClick={() => setHtmlViewport('desktop')}
                className={`p-1.5 rounded-md transition-colors ${
                  htmlViewport === 'desktop' ? 'bg-surface-raised text-emerald-accent' : 'text-text-muted hover:text-text'
                }`}
                title="Desktop Viewport (100%)"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setHtmlViewport('tablet')}
                className={`p-1.5 rounded-md transition-colors ${
                  htmlViewport === 'tablet' ? 'bg-surface-raised text-emerald-accent' : 'text-text-muted hover:text-text'
                }`}
                title="Tablet Viewport (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setHtmlViewport('mobile')}
                className={`p-1.5 rounded-md transition-colors ${
                  htmlViewport === 'mobile' ? 'bg-surface-raised text-emerald-accent' : 'text-text-muted hover:text-text'
                }`}
                title="Mobile Viewport (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2.5 text-xs gap-1.5"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isFullscreen ? 'Exit' : 'Expand'}</span>
          </Button>

          {/* Download Original File */}
          <a href={targetDownloadUrl} download={file.name} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="default" className="h-8 px-3 text-xs gap-1.5 font-medium">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </a>

          {/* Close button if inside modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface-raised transition-colors ml-1"
              title="Close Viewer"
              aria-label="Close Viewer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Preview Rendering Canvas */}
      <div className="flex-1 bg-canvas overflow-hidden relative flex items-center justify-center min-h-[480px]">
        {/* 1. PDF Preview */}
        {file.previewType === 'pdf' && (
          <div className="w-full h-full flex flex-col p-2">
            <iframe
              src={`${file.publicUrl}#toolbar=1&navpanes=0`}
              title={file.name}
              className="w-full flex-1 min-h-[520px] border-0 rounded-lg bg-surface"
            />
          </div>
        )}

        {/* 2. Presentation Deck (PPT/PPTX) with Minimalist Prev/Next Counter */}
        {file.previewType === 'presentation' && (
          <div className="w-full h-full flex flex-col justify-between items-center p-3 md:p-6 select-none">
            {hasSlides ? (
              <div className="w-full flex-1 flex flex-col items-center justify-center relative">
                {/* Clean slide stage */}
                <div className="relative max-w-5xl w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-border flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slides[slideIndex]}
                    alt={`Slide ${slideIndex + 1} of ${slides.length}`}
                    className="max-h-full max-w-full object-contain select-none"
                  />

                  {/* Progress hairline tracker */}
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10">
                    <div
                      className="h-full bg-emerald-accent transition-all duration-200"
                      style={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Minimalist Prev/Next Controls Pill */}
                <div className="mt-4 flex items-center gap-2 bg-surface-raised border border-border rounded-full px-3 py-1.5 shadow-tactile">
                  <button
                    onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
                    disabled={slideIndex === 0}
                    className="p-1 rounded-full text-text-muted hover:text-text hover:bg-surface disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-90"
                    title="Previous Slide"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="px-2 font-mono text-xs text-text tracking-wider tabular-nums select-none">
                    <span className="font-semibold text-text">
                      {String(slideIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-text-muted/60 mx-1.5">/</span>
                    <span className="text-text-muted">
                      {String(slides.length).padStart(2, '0')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSlideIndex((i) => Math.min(slides.length - 1, i + 1))}
                    disabled={slideIndex === slides.length - 1}
                    className="p-1 rounded-full text-text-muted hover:text-text hover:bg-surface disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-90"
                    title="Next Slide"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : file.pdfPreviewUrl ? (
              <iframe
                src={`${file.pdfPreviewUrl}#toolbar=1`}
                title={file.name}
                className="w-full flex-1 min-h-[500px] border-0 rounded-lg bg-surface"
              />
            ) : (
              <div className="text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-accent/10 border border-amber-accent/20 flex items-center justify-center mx-auto text-amber-accent">
                  <Presentation className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-text">{file.name}</h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  PowerPoint deliverable ready for inspection. Download original presentation file or view in local deck viewer.
                </p>
                <a href={targetDownloadUrl} download={file.name}>
                  <Button size="sm" className="gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Presentation</span>
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}

        {/* 3. Word Document Preview (DOC/DOCX) */}
        {file.previewType === 'document' && (
          <div className="w-full h-full p-2 flex flex-col">
            {file.pdfPreviewUrl ? (
              <iframe
                src={`${file.pdfPreviewUrl}#toolbar=1`}
                title={file.name}
                className="w-full flex-1 min-h-[520px] border-0 rounded-lg bg-surface"
              />
            ) : (
              <div className="text-center p-12 space-y-4 my-auto">
                <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center mx-auto text-emerald-accent">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text">{file.name}</h4>
                  <p className="text-xs text-text-muted max-w-sm mx-auto mt-1">
                    Word document deliverable indexed with SHA-256 integrity verification. Download original document to review formatted text, references, and appendices.
                  </p>
                </div>
                <a href={targetDownloadUrl} download={file.name}>
                  <Button size="sm" className="gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download DOCX</span>
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}

        {/* 4. Excel & Spreadsheets (XLSX / CSV) - Tactile Multi-Sheet Binder Tabs */}
        {file.previewType === 'spreadsheet' && (
          <SpreadsheetInteractiveViewer file={file} targetDownloadUrl={targetDownloadUrl} />
        )}

        {/* 5. Sandboxed HTML Coursework Applications */}
        {file.previewType === 'html' && (
          <div className="w-full h-full flex flex-col">
            <div className="bg-surface-raised px-4 py-2 border-b border-border flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-accent text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Isolated Sandbox Active &bull; Execution Origin Restricted
              </span>
              <a
                href={file.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text flex items-center gap-1 text-[11px] hover:underline"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-canvas">
              <div
                className={`h-full transition-all duration-300 bg-white rounded-lg shadow-xl overflow-hidden ${
                  htmlViewport === 'mobile'
                    ? 'w-[390px] border border-border'
                    : htmlViewport === 'tablet'
                    ? 'w-[768px] border border-border'
                    : 'w-full'
                }`}
              >
                <iframe
                  src={file.publicUrl}
                  sandbox="allow-scripts allow-forms"
                  title={file.name}
                  className="w-full h-full min-h-[500px] border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. Image Viewer */}
        {file.previewType === 'image' && (
          <div className="w-full h-full flex items-center justify-center overflow-auto p-4 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={file.publicUrl || file.contentUrl}
              alt={file.name}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-xl border border-border transition-transform duration-200"
            />
          </div>
        )}

        {/* 7. Binary / Download Fallback */}
        {(file.previewType === 'binary' || file.previewType === 'download_only') && (
          <div className="text-center p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-accent/10 border border-amber-accent/20 flex items-center justify-center mx-auto text-amber-accent">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-text">{file.name}</h4>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              This deliverable is archived for verified submission. Direct in-browser parsing is not supported for this filetype.
            </p>
            <a href={targetDownloadUrl} download={file.name}>
              <Button size="sm" className="gap-2">
                <Download className="w-3.5 h-3.5" />
                <span>Download Deliverable</span>
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Technical Footer Provenance Bar */}
      <div className="px-4 py-2.5 bg-surface-raised border-t border-border flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted">
        <span>
          Assignment Link:{' '}
          <strong className="text-emerald-accent font-semibold">{file.assignmentId}</strong>
        </span>
        {file.sha256 && (
          <span className="truncate max-w-xs text-text-muted/70" title={`SHA-256: ${file.sha256}`}>
            SHA-256: {file.sha256.substring(0, 16)}...
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Tactile Multi-Sheet Excel / CSV Interactive Viewer
 * Features authentic binder divider tabs, sticky ledger headers, and in-sheet search.
 */
function SpreadsheetInteractiveViewer({
  file,
  targetDownloadUrl,
}: {
  file: FileRecord;
  targetDownloadUrl: string;
}) {
  const [data, setData] = useState<{
    sheetNames: string[];
    sheets: Record<string, { headers: string[]; rows: any[][] }>;
  } | null>(null);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCell, setCopiedCell] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`/api/coursework/spreadsheet/${file.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!isMounted) return;
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
          if (json.sheetNames && json.sheetNames.length > 0) {
            setActiveSheet(json.sheetNames[0]);
          }
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [file.id]);

  const currentSheetData = data?.sheets[activeSheet] || { headers: [], rows: [] };

  const filteredRows = useMemo(() => {
    if (!filterQuery.trim()) return currentSheetData.rows;
    const q = filterQuery.toLowerCase();
    return currentSheetData.rows.filter((row) =>
      row.some((cell) => String(cell || '').toLowerCase().includes(q))
    );
  }, [currentSheetData.rows, filterQuery]);

  const copyCellContent = (val: string, key: string) => {
    navigator.clipboard?.writeText(val);
    setCopiedCell(key);
    setTimeout(() => setCopiedCell(null), 1500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <div className="w-5 h-5 border-2 border-emerald-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-text-muted">Parsing workbook sheets...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center p-8 space-y-3">
        <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center mx-auto text-cyan-accent">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-text">{file.name}</h4>
        <p className="text-xs text-text-muted max-w-sm mx-auto">
          Multi-sheet Excel workbook. Download original spreadsheet to inspect in Microsoft Excel or LibreOffice Calc.
        </p>
        <a href={targetDownloadUrl} download={file.name}>
          <Button size="sm" className="gap-2">
            <Download className="w-3.5 h-3.5" />
            <span>Download XLSX</span>
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col min-h-[480px] bg-surface select-none">
      {/* Tactile Physical Binder Tabs Header Rail */}
      <div className="bg-surface-raised border-b border-border pt-2 px-3 flex flex-wrap items-end justify-between gap-3">
        {/* Binder Tab Strip */}
        <div className="flex items-end gap-1 overflow-x-auto max-w-full -mb-px">
          {data.sheetNames.map((sheet, idx) => {
            const isActive = activeSheet === sheet;
            return (
              <button
                key={sheet}
                onClick={() => {
                  setActiveSheet(sheet);
                  setFilterQuery('');
                }}
                className={`relative px-3.5 py-1.5 rounded-t-md text-xs font-mono transition-all duration-150 shrink-0 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-surface text-emerald-accent font-semibold border-t-2 border-t-emerald-accent border-x-border border-b-surface z-10'
                    : 'bg-surface-raised/40 hover:bg-surface-raised text-text-muted hover:text-text border-transparent border-b-border'
                }`}
                title={`Sheet: ${sheet}`}
              >
                <span className="text-[10px] text-text-muted font-mono">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>{sheet}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search & Stats Bar */}
        <div className="flex items-center gap-3 pb-2 text-[11px] font-mono text-text-muted">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Filter sheet cells..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="bg-surface border border-border rounded pl-6 pr-2 py-0.5 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-emerald-accent w-36 md:w-44 transition-colors"
            />
          </div>
          <span className="shrink-0 hidden sm:inline">
            {filteredRows.length} {filteredRows.length === 1 ? 'row' : 'rows'}
          </span>
        </div>
      </div>

      {/* Spreadsheet Data Grid */}
      <div className="flex-1 overflow-auto max-h-[500px]">
        {currentSheetData.headers.length === 0 ? (
          <div className="p-12 text-center text-xs text-text-muted font-mono">
            Sheet is empty or has no header row.
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-surface-raised border-b border-border sticky top-0 z-10 text-text">
                <th className="p-2 border-r border-border text-text-muted w-12 text-center text-[10px] uppercase select-none">
                  #
                </th>
                {currentSheetData.headers.map((h, idx) => (
                  <th
                    key={idx}
                    className="p-2.5 border-r border-border font-semibold text-[11px] text-text whitespace-nowrap tracking-tight select-none"
                  >
                    {h || `Col ${idx + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-emerald-accent/[0.04] transition-colors even:bg-surface-raised/20"
                >
                  <td className="p-2 border-r border-border text-center text-[10px] text-text-muted bg-surface-raised/30 select-none">
                    {rowIdx + 1}
                  </td>
                  {currentSheetData.headers.map((_, colIdx) => {
                    const rawVal = row[colIdx];
                    const valStr = rawVal !== undefined && rawVal !== null ? String(rawVal) : '';
                    const cellKey = `${rowIdx}-${colIdx}`;
                    const isCopied = copiedCell === cellKey;

                    return (
                      <td
                        key={colIdx}
                        onClick={() => copyCellContent(valStr, cellKey)}
                        className="p-2.5 border-r border-border/40 whitespace-nowrap text-text text-xs cursor-pointer group hover:bg-emerald-accent/10 transition-colors relative"
                        title="Click to copy cell value"
                      >
                        <span>{valStr}</span>
                        {isCopied && (
                          <span className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 bg-emerald-accent/20 text-emerald-accent rounded text-[9px] flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
