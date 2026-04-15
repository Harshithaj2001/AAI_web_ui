import { memo, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const Select = memo(function Select({
  label,
  options,
  id,
  className = '',
  ...rest
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${styles.select} ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
});
