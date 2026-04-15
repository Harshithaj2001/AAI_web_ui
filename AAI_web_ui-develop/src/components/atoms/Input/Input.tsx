import { memo, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = memo(function Input({
  label,
  id,
  className = '',
  ...rest
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${styles.input} ${className}`}
        {...rest}
      />
    </div>
  );
});
