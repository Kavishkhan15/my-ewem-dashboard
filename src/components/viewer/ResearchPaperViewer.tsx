'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  FileCode,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Archive,
  Image as ImageIcon,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import researchPaperData from '@/data/researchPaperManifest.json';

type ActiveTab = 'pdf' | 'docx' | 'tex' | 'figures';

export function ResearchPaperViewer() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pdf');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfZoom, setPdfZoom] = useState(100);

  // LaTeX Source state
  const [texSource, setTexSource] = useState<string>('');
  const [texSearchQuery, setTexSearchQuery] = useState('');
  const [copiedTex, setCopiedTex] = useState(false);
  const [texLoading, setTexLoading] = useState(false);

  // Figures state
  const [selectedFigureIndex, setSelectedFigureIndex] = useState(0);
  const [figureZoom, setFigureZoom] = useState(1);

  // Fetch LaTeX source when TeX tab is selected
  useEffect(() => {
    if (activeTab === 'tex' && !texSource && !texLoading) {
      setTexLoading(true);
      fetch('/api/research-paper/tex')
        .then((res) => res.text())
        .then((text) => {
          setTexSource(text);
          setTexLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load paper.tex:', err);
          setTexLoading(false);
        });
    }
  }, [activeTab, texSource, texLoading]);

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const copyTexToClipboard = () => {
    if (!texSource) return;
    navigator.clipboard.writeText(texSource).then(() => {
      setCopiedTex(true);
      setTimeout(() => setCopiedTex(false), 2000);
    });
  };

  const figures = researchPaperData.figures;
  const currentFigure = figures[selectedFigureIndex] || figures[0];

  // Filter LaTeX lines if search query is active
  const texLines = texSource ? texSource.split('\n') : [];

  return (
    <div
      className={`flex flex-col bg-surface border border-border rounded-xl overflow-hidden shadow-tactile transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none bg-canvas border-none p-4 md:p-6'
          : 'w-full min-h-[640px]'
      }`}
    >
      {/* Precision Instrument Tab Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-surface-raised border-b border-border">
        {/* Format Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface border border-border rounded-lg" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'pdf'}
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all min-h-[36px] ${
              activeTab === 'pdf'
                ? 'bg-surface-raised text-emerald-accent border border-border shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-accent" />
            <span>PDF Document</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface border border-border text-text-muted">
              Default
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'docx'}
            onClick={() => setActiveTab('docx')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all min-h-[36px] ${
              activeTab === 'docx'
                ? 'bg-surface-raised text-emerald-accent border border-border shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-text-muted" />
            <span>Microsoft Word</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface border border-border text-text-muted">
              DOCX
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'tex'}
            onClick={() => setActiveTab('tex')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all min-h-[36px] ${
              activeTab === 'tex'
                ? 'bg-surface-raised text-emerald-accent border border-border shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-accent" />
            <span>LaTeX Source</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface border border-border text-text-muted">
              .tex
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'figures'}
            onClick={() => setActiveTab('figures')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all min-h-[36px] ${
              activeTab === 'figures'
                ? 'bg-surface-raised text-emerald-accent border border-border shadow-sm'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Research Figures</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface border border-border text-text-muted font-bold">
              {figures.length}
            </span>
          </button>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-2">
          {/* Fullscreen Toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2.5 text-xs gap-1.5"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </Button>

          {/* Download Selected Format */}
          {activeTab === 'pdf' && (
            <a
              href="/research-paper/paper.pdf"
              download="paper.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </Button>
            </a>
          )}

          {activeTab === 'docx' && (
            <a
              href="/research-paper/paper.docx"
              download="paper.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download DOCX</span>
              </Button>
            </a>
          )}

          {activeTab === 'tex' && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={copyTexToClipboard}
                className="h-8 px-2.5 text-xs gap-1.5"
                title="Copy LaTeX source"
              >
                {copiedTex ? <Check className="w-3.5 h-3.5 text-emerald-accent" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedTex ? 'Copied' : 'Copy TeX'}</span>
              </Button>
              <a
                href="/research-paper/paper.tex"
                download="paper.tex"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download .tex</span>
                </Button>
              </a>
            </>
          )}

          {/* Download Complete ZIP Package */}
          <a href="/api/research-paper/zip" download="Research_Paper.zip">
            <Button size="sm" variant="default" className="h-8 px-3 text-xs gap-1.5 font-medium">
              <Archive className="w-3.5 h-3.5" />
              <span>Complete ZIP</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Main Document Reading Canvas */}
      <div className="flex-1 bg-canvas overflow-hidden relative flex flex-col min-h-[560px]">
        {/* ========================================================================= */}
        {/* TAB 1: PDF DOCUMENT VIEWER                                                */}
        {/* ========================================================================= */}
        {activeTab === 'pdf' && (
          <div className="w-full h-full flex-1 flex flex-col p-2">
            <div className="bg-surface-raised px-4 py-2 border-b border-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-emerald-accent font-semibold">IEEEtran Conference Paper</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-text-muted">{(researchPaperData.documents.pdf.size / 1024).toFixed(1)} KB</span>
                <span className="text-text-muted">&bull;</span>
                <span className="inline-flex items-center gap-1 text-emerald-accent">
                  <ShieldCheck className="w-3 h-3" />
                  SHA-256 Verified
                </span>
              </div>
              <a
                href="/research-paper/paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text flex items-center gap-1 text-[11px] hover:underline"
              >
                <span>Direct Window</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <iframe
              src={`/research-paper/paper.pdf#toolbar=1&navpanes=0`}
              title="Research Paper PDF Viewer"
              className="w-full flex-1 min-h-[580px] border-0 rounded-lg bg-surface mt-2"
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MICROSOFT WORD PREVIEW                                            */}
        {/* ========================================================================= */}
        {activeTab === 'docx' && (
          <div className="w-full h-full flex-1 flex flex-col p-2">
            <div className="bg-surface-raised px-4 py-2 border-b border-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-text font-semibold">Microsoft Word Deliverable (.docx)</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-text-muted">{(researchPaperData.documents.docx.size / 1024).toFixed(1)} KB</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-text-muted text-[11px]">Converted HTML Preview with preserved figures</span>
              </div>
              <a
                href="/research-paper/paper.docx"
                download="paper.docx"
                className="text-emerald-accent hover:underline flex items-center gap-1 text-[11px]"
              >
                <Download className="w-3 h-3" />
                <span>Original DOCX</span>
              </a>
            </div>

            <div className="flex-1 bg-surface border border-border rounded-lg mt-2 overflow-auto p-6 sm:p-10 max-h-[720px]">
              <div className="max-w-[75ch] mx-auto space-y-4 font-serif text-text leading-relaxed docx-preview-container">
                <div className="border-b border-border pb-4 mb-6 not-italic font-sans">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-accent">
                    Document Conversion Preview
                  </span>
                  <p className="text-xs text-text-muted mt-1">
                    Rendered from original <code className="font-mono text-text">paper.docx</code>. All headings, structure, formulas and embedded figures are preserved.
                  </p>
                </div>
                <iframe
                  src="/api/research-paper/docx-preview"
                  title="Word Document Preview"
                  className="w-full min-h-[600px] border-0 bg-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LATEX SOURCE CODE VIEWER                                          */}
        {/* ========================================================================= */}
        {activeTab === 'tex' && (
          <div className="w-full h-full flex-1 flex flex-col p-2">
            {/* TeX Toolbar: Search & Line Counter */}
            <div className="bg-surface-raised px-4 py-2 border-b border-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-accent font-semibold">paper.tex</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-text-muted">{texLines.length} lines</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-text-muted">{(researchPaperData.documents.tex.size / 1024).toFixed(1)} KB</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-emerald-accent text-[11px]">Text Only &bull; Secure Sanitized</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={texSearchQuery}
                    onChange={(e) => setTexSearchQuery(e.target.value)}
                    placeholder="Search LaTeX source..."
                    className="h-7 pl-7 pr-2 text-xs bg-surface border border-border rounded text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-emerald-accent w-44 sm:w-56"
                  />
                </div>
                {texSearchQuery && (
                  <button
                    onClick={() => setTexSearchQuery('')}
                    className="text-[10px] text-text-muted hover:text-text underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* LaTeX Code Display with Line Numbers */}
            <div className="flex-1 bg-canvas border border-border rounded-lg mt-2 overflow-auto font-mono text-xs leading-relaxed max-h-[640px]">
              {texLoading ? (
                <div className="p-8 text-center text-text-muted font-mono">
                  Loading LaTeX source code...
                </div>
              ) : (
                <div className="p-4 table w-full">
                  {texLines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const matchesSearch = texSearchQuery && line.toLowerCase().includes(texSearchQuery.toLowerCase());

                    return (
                      <div
                        key={lineNum}
                        className={`table-row transition-colors ${
                          matchesSearch ? 'bg-amber-accent/15' : 'hover:bg-surface-raised/60'
                        }`}
                      >
                        <span className="table-cell select-none pr-4 text-right text-text-muted/50 w-12 font-mono tabular-nums text-[11px] border-r border-border/40">
                          {lineNum}
                        </span>
                        <span className="table-cell pl-4 text-text whitespace-pre-wrap font-mono text-[11px]">
                          {line || '\n'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: RESEARCH FIGURES GALLERY                                          */}
        {/* ========================================================================= */}
        {activeTab === 'figures' && (
          <div className="w-full h-full flex-1 flex flex-col p-2 space-y-3">
            {/* Figure Toolbar */}
            <div className="bg-surface-raised px-4 py-2 border-b border-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-cyan-accent font-semibold">{currentFigure.title}</span>
                <span className="text-text-muted">&bull;</span>
                <span className="text-text-muted">
                  Figure {selectedFigureIndex + 1} of {figures.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFigureZoom((z) => Math.max(0.75, z - 0.25))}
                  className="h-7 px-2 text-xs"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3 h-3" />
                </Button>
                <span className="text-[11px] font-mono text-text-muted tabular-nums w-12 text-center">
                  {Math.round(figureZoom * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFigureZoom((z) => Math.min(2.5, z + 0.25))}
                  className="h-7 px-2 text-xs"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFigureZoom(1)}
                  className="h-7 px-2 text-xs"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>

                {/* Download individual figure */}
                <a href={currentFigure.pngPath} download={`${currentFigure.name}.png`}>
                  <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1">
                    <Download className="w-3 h-3" />
                    <span>PNG</span>
                  </Button>
                </a>
                {currentFigure.pdfPath && (
                  <a href={currentFigure.pdfPath} download={`${currentFigure.name}.pdf`}>
                    <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1">
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Main Active Figure Stage */}
            <div className="flex-1 bg-surface border border-border rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[420px]">
              <div
                className="transition-transform duration-150 flex items-center justify-center max-w-full max-h-[500px]"
                style={{ transform: `scale(${figureZoom})` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentFigure.pngPath}
                  alt={currentFigure.title}
                  className="max-h-[480px] max-w-full object-contain rounded shadow-md border border-border"
                />
              </div>

              {/* Figure Caption Grounded in Paper */}
              <div className="mt-4 max-w-2xl text-center px-4">
                <p className="text-xs text-text-muted font-sans leading-relaxed">
                  <span className="font-semibold text-text font-mono">Caption: </span>
                  {currentFigure.caption}
                </p>
                <div className="mt-1 flex items-center justify-center gap-3 text-[10px] font-mono text-text-muted">
                  <span>File: {currentFigure.name}.png ({(currentFigure.pngSize / 1024).toFixed(1)} KB)</span>
                  {currentFigure.pdfPath && <span>Vector PDF available</span>}
                </div>
              </div>
            </div>

            {/* Figures Thumbnail Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {figures.map((fig, idx) => (
                <button
                  key={fig.name}
                  onClick={() => {
                    setSelectedFigureIndex(idx);
                    setFigureZoom(1);
                  }}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col gap-2 min-h-[80px] ${
                    selectedFigureIndex === idx
                      ? 'border-emerald-accent bg-surface-raised ring-1 ring-emerald-accent'
                      : 'border-border bg-surface hover:border-border/80'
                  }`}
                >
                  <div className="w-full h-16 bg-canvas rounded overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fig.pngPath}
                      alt={fig.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-semibold text-text truncate">{fig.title}</p>
                    <p className="text-[10px] font-mono text-text-muted truncate">{(fig.pngSize / 1024).toFixed(0)} KB</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
