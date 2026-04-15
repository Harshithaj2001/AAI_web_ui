import type { NavLink, SideNavLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Buttons', href: '#buttons' },
  { label: 'Cards', href: '#cards' },
  { label: 'Forms', href: '#forms' },
  { label: 'Tables', href: '#tables' },
  { label: 'Dashboard', href: '#dashboard' },
];

export const SIDEBAR_LINKS: SideNavLink[] = [
  { label: 'Executive Overview', href: '#', active: true },
  { label: 'Risk Monitoring', href: '#' },
  { label: 'Controls', href: '#' },
  { label: 'Testing', href: '#' },
  { label: 'Issues & Remediation', href: '#' },
  { label: 'Reporting', href: '#' },
];
