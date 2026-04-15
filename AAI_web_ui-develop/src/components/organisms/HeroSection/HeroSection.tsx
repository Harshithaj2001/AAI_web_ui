import { memo } from 'react';
import { Button, Badge, Eyebrow } from '@components/atoms';
import { MetricCard } from '@components/molecules';
import { HERO_METRICS } from '@constants/data';
import styles from './HeroSection.module.css';
import layoutStyles from '@styles/layout.module.css';

const BAR_HEIGHTS = ['48%', '62%', '56%', '74%', '66%', '88%'];

export const HeroSection = memo(function HeroSection() {
  return (
    <section className={`${styles.hero} ${layoutStyles.container}`} id="overview">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <Eyebrow>Soft Warm Gold + Persian Blue</Eyebrow>
          <h1>
            AA | Innovations
            <br />
            Branded HTML + CSS UI Kit
          </h1>
          <p>
            A premium, enterprise-ready design system with components for
            consulting websites, dashboards, proposals, portals, and GRC
            platforms. Persian Blue leads. Soft Warm Gold elevates.
          </p>
          <div className={styles.heroActions}>
            <Button variant="primary">Explore Components</Button>
            <Button variant="accent">View Dashboard Style</Button>
            <Button variant="ghost">See Brand Tokens</Button>
          </div>
          <div className={styles.heroNotes}>
            <div className={styles.heroNote}>Professional consulting tone</div>
            <div className={styles.heroNote}>
              Premium accents without flashiness
            </div>
            <div className={styles.heroNote}>
              Reusable for web, apps, decks, and portals
            </div>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.panelLabel}>Executive Snapshot</div>
          <div className={styles.metrics}>
            {HERO_METRICS.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>
          <div className={styles.miniChart}>
            <div className={styles.chartHeader}>
              <strong>Control Health Trend</strong>
              <Badge variant="accent">Highlighted KPI</Badge>
            </div>
            <div className={styles.bars}>
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={`${styles.bar} ${i % 2 === 0 ? styles.barBlue : ''}`}
                  style={{ height: h }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
