import { memo, useCallback } from 'react';
import styles from './Tabs.module.css';

interface TabsProps {
  items: string[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export const Tabs = memo(function Tabs({
  items,
  activeIndex,
  onTabChange,
}: TabsProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTabChange(idx);
      } else if (e.key === 'ArrowRight') {
        onTabChange(Math.min(idx + 1, items.length - 1));
      } else if (e.key === 'ArrowLeft') {
        onTabChange(Math.max(idx - 1, 0));
      }
    },
    [onTabChange, items.length],
  );

  return (
    <div className={styles.tabs} role="tablist">
      {items.map((label, i) => (
        <button
          key={label}
          role="tab"
          aria-selected={i === activeIndex}
          tabIndex={i === activeIndex ? 0 : -1}
          className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ''}`}
          onClick={() => onTabChange(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        >
          {label}
        </button>
      ))}
    </div>
  );
});
