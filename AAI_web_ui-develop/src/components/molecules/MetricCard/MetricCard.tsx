import { memo } from 'react';
import type { MetricData } from '@/types';
import styles from './MetricCard.module.css';

interface MetricCardProps extends MetricData {}

export const MetricCard = memo(function MetricCard({
  value,
  label,
}: MetricCardProps) {
  return (
    <div className={styles.metric}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
});
