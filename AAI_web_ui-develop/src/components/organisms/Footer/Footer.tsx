import { memo } from 'react';
import { Badge } from '@components/atoms';
import { Card } from '@components/molecules';
import styles from './Footer.module.css';
import layoutStyles from '@styles/layout.module.css';

export const Footer = memo(function Footer() {
  return (
    <footer className={`${styles.footer} ${layoutStyles.container}`}>
      <Card>
        <div className={styles.footerInner}>
          <div>
            <h3 className={styles.footerTitle}>AA | Innovations</h3>
            <p>
              Premium, modern, enterprise-ready UI kit using Soft Warm Gold and
              Persian Blue.
            </p>
          </div>
          <div className={styles.badgeRow}>
            <Badge variant="primary">Persian Blue leads</Badge>
            <Badge variant="accent">Soft Warm Gold elevates</Badge>
          </div>
        </div>
      </Card>
    </footer>
  );
});
