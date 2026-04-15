import { memo, type ReactNode } from 'react';
import type { AlertVariant } from '@/types';
import styles from './Alert.module.css';

interface AlertProps {
  variant: AlertVariant;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const Alert = memo(function Alert({
  variant,
  icon,
  title,
  children,
}: AlertProps) {
  return (
    <div className={`${styles.alert} ${styles[`alert-${variant}`]}`} role="alert">
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      <div>
        <strong className={styles.title}>{title}</strong>
        {children}
      </div>
    </div>
  );
});
