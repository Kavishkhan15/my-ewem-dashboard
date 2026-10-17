'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Badge component with strict semantic truth styling and physical instrument aesthetics
export function StatusBadge({
  type,
  value,
  className,
}: {
  type: 'portal' | 'submission' | 'work' | 'quality' | 'category';
  value: string | null | boolean;
  className?: string;
}) {
  let label = String(value || 'N/A');
  let colorClasses = 'bg-surface-raised border-border text-text-muted';

  if (type === 'portal') {
    if (value === true || value === 'Turned in') {
      label = 'Turned in (Observed)';
      colorClasses = 'bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent';
    } else {
      label = 'Not Observed';
      colorClasses = 'bg-surface-raised border-border text-text-muted';
    }
  } else if (type === 'submission') {
    switch (value) {
      case 'unverified':
        label = 'Unverified';
        colorClasses = 'bg-amber-accent/10 border-amber-accent/30 text-amber-accent';
        break;
      case 'submitted':
        label = 'Verified Submitted';
        colorClasses = 'bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent';
        break;
      case 'not_submitted':
        label = 'Not Submitted';
        colorClasses = 'bg-danger-accent/10 border-danger-accent/30 text-danger-accent';
        break;
      case 'resubmission_needed':
        label = 'Resubmission Needed';
        colorClasses = 'bg-amber-accent/20 border-amber-accent/50 text-amber-accent';
        break;
    }
  } else if (type === 'work') {
    switch (value) {
      case 'not_reviewed':
        label = 'Not Reviewed';
        colorClasses = 'bg-surface-raised border-border text-text-muted';
        break;
      case 'planned':
        label = 'Planned';
        colorClasses = 'bg-cyan-accent/10 border-cyan-accent/30 text-cyan-accent';
        break;
      case 'in_progress':
        label = 'In Progress';
        colorClasses = 'bg-amber-accent/10 border-amber-accent/30 text-amber-accent';
        break;
      case 'ready_for_review':
        label = 'Ready for Review';
        colorClasses = 'bg-lime-accent/10 border-lime-accent/30 text-lime-accent';
        break;
      case 'verified_complete':
        label = 'Verified Complete';
        colorClasses = 'bg-emerald-accent/20 border-emerald-accent/40 text-emerald-accent font-semibold';
        break;
    }
  } else if (type === 'quality') {
    switch (value) {
      case 'not_assessed':
        label = 'Not Assessed';
        colorClasses = 'bg-surface-raised border-border text-text-muted';
        break;
      case 'needs_improvement':
        label = 'Needs Improvement';
        colorClasses = 'bg-amber-accent/10 border-amber-accent/30 text-amber-accent';
        break;
      case 'meets_requirements':
        label = 'Meets Requirements';
        colorClasses = 'bg-cyan-accent/10 border-cyan-accent/30 text-cyan-accent';
        break;
      case 'polished':
        label = 'Polished';
        colorClasses = 'bg-lime-accent/20 border-lime-accent/40 text-lime-accent font-medium';
        break;
    }
  } else if (type === 'category') {
    switch (value) {
      case 'Data Analytics & Tracking':
        colorClasses = 'bg-cyan-accent/10 border-cyan-accent/30 text-cyan-accent';
        break;
      case 'Technical & Recovery Processes':
        colorClasses = 'bg-lime-accent/10 border-lime-accent/30 text-lime-accent';
        break;
      case 'Research, Policy & Sustainability':
        colorClasses = 'bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent';
        break;
      case 'Innovation & Awareness':
        colorClasses = 'bg-amber-accent/10 border-amber-accent/30 text-amber-accent';
        break;
      case 'Assessment / Administrative':
        colorClasses = 'bg-surface-raised border-border text-text-muted';
        break;
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border whitespace-nowrap tracking-wide',
        colorClasses,
        className
      )}
    >
      {label}
    </span>
  );
}

// Card primitive with crisp hairline borders and tactile surface
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-lg p-5 shadow-sm transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Button primitive with tactile feedback and physical response
export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}) {
  const base =
    'inline-flex items-center justify-center font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-accent active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-emerald-accent text-canvas font-semibold hover:bg-emerald-accent/90',
    outline: 'border border-border bg-surface text-text hover:bg-surface-raised hover:border-border-active',
    ghost: 'text-text-muted hover:text-text hover:bg-surface-raised',
    danger: 'bg-danger-accent text-canvas hover:opacity-90',
  };
  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
