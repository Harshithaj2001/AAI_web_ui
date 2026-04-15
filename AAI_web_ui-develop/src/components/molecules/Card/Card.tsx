import { memo, type ReactNode, type CSSProperties } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'article';
}

export const Card = memo(function Card({
  children,
  accent = false,
  className = '',
  style,
  as: Tag = 'div',
}: CardProps) {
  const classes = [styles.card, accent ? styles.cardAccent : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  );
});
