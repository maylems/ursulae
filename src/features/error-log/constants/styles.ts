import type { PolicyAction } from '../api/types';

export const actionStyles: Record<PolicyAction, string> = {
  warn: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
  throttle: 'bg-orange-500/15 text-orange-500 border-orange-500/20',
  switch: 'bg-blue-500/15 text-blue-500 border-blue-500/20',
  block: 'bg-destructive/15 text-destructive border-destructive/20',
  none: 'bg-muted text-muted-foreground border-transparent'
};
