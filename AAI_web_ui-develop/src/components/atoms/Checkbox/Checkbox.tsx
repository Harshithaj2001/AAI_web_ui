import { memo, type InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = memo(function Checkbox({
  label,
  id,
  className = '',
  ...rest
}: CheckboxProps) {
  const checkId = id ?? `check-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label htmlFor={checkId} className={`${styles.check} ${className}`}>
      <input type="checkbox" id={checkId} {...rest} />
      {label}
    </label>
  );
});
