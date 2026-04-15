import { memo, type ReactNode } from 'react';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export const Eyebrow = memo(function Eyebrow({
  children,
  className = '',
}: EyebrowProps) {
  return <div className={`${styles.eyebrow} ${className}`}>{children}</div>;
});
