import type {
  MetricData,
  KpiData,
  ActivityData,
  TableRow,
} from '@/types';

export const HERO_METRICS: MetricData[] = [
  { value: '98%', label: 'control coverage visibility' },
  { value: '24h', label: 'issue triage turnaround' },
  { value: '42%', label: 'faster evidence retrieval' },
  { value: 'AA+', label: 'brand confidence score' },
];

export const DASHBOARD_KPIS: KpiData[] = [
  {
    label: 'Open issues',
    value: '28',
    trend: '+4 this week',
    direction: 'down',
  },
  {
    label: 'Controls automated',
    value: '61%',
    trend: '+8% quarter over quarter',
    direction: 'up',
  },
  {
    label: 'Evidence cycle time',
    value: '2.1d',
    trend: '-0.8d improvement',
    direction: 'up',
  },
  {
    label: 'Featured compliance KPI',
    value: '94%',
    trend: 'gold used for emphasis',
    direction: 'up',
    accentValue: true,
  },
];

export const ACTIVITY_FEED: ActivityData[] = [
  {
    title: 'SOX exception closed',
    description: 'ERP access review completed',
    badgeLabel: 'Closed',
    badgeVariant: 'success',
  },
  {
    title: 'AI risk review added',
    description: 'New governance workflow staged',
    badgeLabel: 'Featured',
    badgeVariant: 'accent',
  },
  {
    title: 'Testing evidence overdue',
    description: 'Vendor security control sample pending',
    badgeLabel: 'Watch',
    badgeVariant: 'warning',
  },
  {
    title: 'Quarterly report published',
    description: 'Board pack distributed to leadership',
    badgeLabel: 'Published',
    badgeVariant: 'primary',
  },
];

export const CONTROL_TABLE_DATA: TableRow[] = [
  {
    controlId: 'ITGC-01',
    area: 'User Access Review',
    status: 'Healthy',
    statusVariant: 'success',
    owner: 'IAM Team',
    lastReview: 'Mar 24',
    nextAction: 'Quarterly validation',
  },
  {
    controlId: 'CCM-08',
    area: 'Change Monitoring',
    status: 'Featured',
    statusVariant: 'accent',
    owner: 'Platform Ops',
    lastReview: 'Mar 27',
    nextAction: 'Board-ready summary',
    highlighted: true,
  },
  {
    controlId: 'SOX-14',
    area: 'Interface Reconciliation',
    status: 'Watchlist',
    statusVariant: 'warning',
    owner: 'ERP Controls',
    lastReview: 'Mar 25',
    nextAction: 'Review exception logic',
  },
  {
    controlId: 'AI-03',
    area: 'Model Governance',
    status: 'In progress',
    statusVariant: 'primary',
    owner: 'AI Risk Office',
    lastReview: 'Mar 28',
    nextAction: 'Finalize oversight workflow',
  },
];

export const SERVICE_OPTIONS = [
  'Cybersecurity & GRC',
  'Internal Audit',
  'AI Governance',
];

export const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

export const FORM_TABS = ['General', 'Risk Details', 'Evidence', 'Approvals'];
