import { memo } from 'react';
import type { KpiData } from '@/types';
import styles from './KpiCard.module.css';

interface KpiCardProps extends KpiData {}

export const KpiCard = memo(function KpiCard({
  label,
  value,
  trend,
  direction,
  accentValue,
}: KpiCardProps) {
  return (
    <div className={styles.kpi}>
      <div className={styles.label}>{label}</div>
      <div
        className={styles.value}
        style={accentValue ? { color: 'var(--aa-gold-900)' } : undefined}
      >
        {value}
      </div>
      <div className={`${styles.trend} ${styles[direction]}`}>{trend}</div>
    </div>
  );
});
