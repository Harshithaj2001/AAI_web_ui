import { memo } from 'react';
import { Button, Badge, Eyebrow } from '@components/atoms';
import { Card } from '@components/molecules';
import styles from './ButtonsSection.module.css';
import layoutStyles from '@styles/layout.module.css';

export const ButtonsSection = memo(function ButtonsSection() {
  return (
    <section
      className={`${layoutStyles.section} ${layoutStyles.container}`}
      id="buttons"
    >
      <div className={layoutStyles.sectionHead}>
        <div>
          <Eyebrow>Buttons + badges</Eyebrow>
          <h2>Action styles</h2>
          <p>
            Persian Blue drives trust and structure. Soft Warm Gold is reserved
            for emphasis and premium interactions.
          </p>
        </div>
      </div>

      <div className={layoutStyles.grid3}>
        <Card>
          <h3>Buttons</h3>
          <p className={styles.muted}>
            Primary for main actions. Accent for premium CTAs. Secondary and
            ghost for supporting actions.
          </p>
          <div className={styles.buttonRow}>
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="dark">Dark</Button>
          </div>
        </Card>

        <Card>
          <h3>Badges</h3>
          <p className={styles.muted}>
            Use gold for featured tags and blue for standard states.
          </p>
          <div className={styles.badgeRow}>
            <Badge variant="primary">Active program</Badge>
            <Badge variant="accent">Featured insight</Badge>
            <Badge variant="success">Healthy</Badge>
            <Badge variant="warning">Watchlist</Badge>
            <Badge variant="error">Escalated</Badge>
            <Badge variant="outline">Neutral</Badge>
          </div>
        </Card>

        <Card accent>
          <h3>Brand guidance</h3>
          <p>
            Keep gold focused on highlights, icons, active markers, and premium
            callouts. Let blue carry navigation, structure, and primary actions.
          </p>
          <div className={styles.badgeRow}>
            <Badge variant="accent">10% gold emphasis</Badge>
            <Badge variant="primary">30% blue structure</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
});
