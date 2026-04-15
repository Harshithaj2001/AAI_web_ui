import { memo } from 'react';
import { Badge } from '@components/atoms';
import type { ActivityData } from '@/types';
import styles from './ActivityItem.module.css';

interface ActivityItemProps extends ActivityData {}

export const ActivityItem = memo(function ActivityItem({
  title,
  description,
  badgeLabel,
  badgeVariant,
}: ActivityItemProps) {
  return (
    <div className={styles.item}>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <Badge variant={badgeVariant}>{badgeLabel}</Badge>
    </div>
  );
});
