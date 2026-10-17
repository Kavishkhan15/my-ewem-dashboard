'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderKanban,
  CalendarDays,
  Home,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { useStorage } from '@/lib/storage/StorageContext';
import { cn } from '@/components/ui/primitives';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Assignments', href: '/assignments', icon: FolderKanban },
  { label: 'Timeline', href: '/timeline', icon: CalendarDays },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useStorage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text">
      {/* Minimalist Physical Header with Crisp Hairline Border */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Restrained Monospace Brandmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent rounded py-1 px-1 -ml-1 transition-colors"
            aria-label="E-Waste Academic Portfolio Home"
            title="E-Waste | Academic Portfolio"
          >
            <span
              className="w-2 h-2 rounded-sm bg-emerald-accent transition-transform duration-150 group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="font-mono text-base font-semibold tracking-wider text-text">
              E-Waste
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-text-muted border-l border-border pl-2.5 ml-1">
              EW/EM Studio
            </span>
          </Link>

          {/* Desktop Primary Navigation: EXACTLY 3 ITEMS (Home | Assignments | Timeline) */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (Boolean(pathname) && item.href !== '/' && pathname!.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent border',
                    isActive
                      ? 'bg-surface-raised text-emerald-accent font-semibold border-border shadow-xs'
                      : 'text-text-muted hover:text-text hover:bg-surface-raised/60 border-transparent'
                  )}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools: Tactile Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-border bg-surface hover:bg-surface-raised active:translate-y-px text-text-muted hover:text-text transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-accent" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-accent" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-md border border-border bg-surface hover:bg-surface-raised active:translate-y-px text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent"
              aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-b border-border bg-surface px-4 py-3 space-y-1 animate-fadeIn"
          >
            <nav aria-label="Mobile navigation" className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (Boolean(pathname) && item.href !== '/' && pathname!.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors border',
                      isActive
                        ? 'bg-surface-raised text-emerald-accent font-semibold border-border'
                        : 'text-text-muted hover:text-text hover:bg-surface-raised/50 border-transparent'
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted px-1">
              <span>14 Deliverables</span>
              <span>TE CMPN &bull; EW/EM</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Portfolio Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Minimalist, Human-First Academic Footer */}
      <footer className="border-t border-border bg-surface py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-emerald-accent" aria-hidden="true" />
              <span className="text-text font-semibold tracking-wider">E-Waste</span>
              <span className="text-border">/</span>
              <span>Environmental Management</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>14 Authoritative Coursework Deliverables</span>
              <span className="text-border" aria-hidden="true">&bull;</span>
              <span>Faculty &amp; Peer Review Ready</span>
              <span className="text-border" aria-hidden="true">&bull;</span>
              <span>Dual-Truth Verification</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
