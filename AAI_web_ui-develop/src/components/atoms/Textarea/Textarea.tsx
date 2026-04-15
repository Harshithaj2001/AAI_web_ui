import { memo, type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = memo(function Textarea({
  label,
  id,
  className = '',
  ...rest
}: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`${styles.textarea} ${className}`}
        {...rest}
      />
    </div>
  );
});
