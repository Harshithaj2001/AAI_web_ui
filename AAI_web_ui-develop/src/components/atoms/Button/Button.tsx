import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { ButtonVariant, ButtonSize } from '@/types';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export const Button = memo(function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[`btn-${variant}`],
    size === 'sm' ? styles['btn-sm'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
});
