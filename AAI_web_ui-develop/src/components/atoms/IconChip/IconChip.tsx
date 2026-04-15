import { memo } from 'react';
import styles from './IconChip.module.css';

interface IconChipProps {
  letter: string;
  className?: string;
}

export const IconChip = memo(function IconChip({
  letter,
  className = '',
}: IconChipProps) {
  return (
    <div className={`${styles.iconChip} ${className}`} aria-hidden="true">
      {letter}
    </div>
  );
});
