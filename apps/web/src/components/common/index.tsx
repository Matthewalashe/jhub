import { cn } from '../../lib/utils';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className }: ProgressBarProps) {
  return (
    <div className={cn('w-full h-1 bg-border', className)}>
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-surface text-muted border-border',
    primary: 'bg-primary-soft text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent-dark border-accent/20',
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <span className={cn(
      'inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border-2 border-border p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 skeleton" />
        <div className="flex-1">
          <div className="h-4 w-3/4 skeleton mb-2" />
          <div className="h-3 w-1/2 skeleton" />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-16 skeleton" />
            <div className="h-5 w-12 skeleton" />
          </div>
        </div>
      </div>
      <div className="h-px bg-border my-4" />
      <div className="flex justify-between">
        <div className="h-3 w-32 skeleton" />
        <div className="h-8 w-24 skeleton" />
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && <div className="mb-4 text-muted/40">{icon}</div>}
      <h3 className="font-display text-lg font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-[40ch] mb-4">{description}</p>
      {action}
    </div>
  );
}

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-primary text-white text-sm font-bold px-5 py-3 border-2 border-ink shadow-brutal-sm">
        {message}
      </div>
    </div>
  );
}
