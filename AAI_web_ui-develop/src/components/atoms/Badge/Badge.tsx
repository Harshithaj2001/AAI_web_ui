import { memo, type ReactNode } from 'react';
import type { BadgeVariant } from '@/types';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export const Badge = memo(function Badge({
  variant = 'primary',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[`badge-${variant}`]} ${className}`}
    >
      {children}
    </span>
  );
});
