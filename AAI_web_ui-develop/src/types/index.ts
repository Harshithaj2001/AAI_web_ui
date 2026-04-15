export type ButtonVariant =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'ghost'
  | 'dark';

export type ButtonSize = 'sm' | 'md';

export type BadgeVariant =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline';

export type AlertVariant = 'info' | 'premium' | 'error';

export type KpiTrend = 'up' | 'down';

export interface NavLink {
  label: string;
  href: string;
}

export interface MetricData {
  value: string;
  label: string;
}

export interface KpiData {
  label: string;
  value: string;
  trend: string;
  direction: KpiTrend;
  accentValue?: boolean;
}

export interface ActivityData {
  title: string;
  description: string;
  badgeLabel: string;
  badgeVariant: BadgeVariant;
}

export interface TableRow {
  controlId: string;
  area: string;
  status: string;
  statusVariant: BadgeVariant;
  owner: string;
  lastReview: string;
  nextAction: string;
  highlighted?: boolean;
}

export interface SideNavLink {
  label: string;
  href: string;
  active?: boolean;
}

export type Theme = 'light' | 'dark';
