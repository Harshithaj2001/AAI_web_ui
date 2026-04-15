import { memo } from 'react';
import { Button, Badge, Eyebrow } from '@components/atoms';
import { KpiCard, ActivityItem } from '@components/molecules';
import { SIDEBAR_LINKS } from '@constants/navigation';
import { DASHBOARD_KPIS, ACTIVITY_FEED } from '@constants/data';
import styles from './DashboardSection.module.css';
import layoutStyles from '@styles/layout.module.css';

const LineChart = memo(function LineChart() {
  return (
    <div className={styles.lineChart}>
      <svg
        viewBox="0 0 700 220"
        preserveAspectRatio="none"
        aria-label="Quarterly control health line chart"
        role="img"
      >
        <defs>
          <linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(53,88,216,.24)" />
            <stop offset="100%" stopColor="rgba(53,88,216,0)" />
          </linearGradient>
          <linearGradient id="fillGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(249,204,92,.28)" />
            <stop offset="100%" stopColor="rgba(249,204,92,0)" />
          </linearGradient>
        </defs>
        <g stroke="#E5E7EB" strokeWidth="1">
          <line x1="0" y1="40" x2="700" y2="40" />
          <line x1="0" y1="90" x2="700" y2="90" />
          <line x1="0" y1="140" x2="700" y2="140" />
          <line x1="0" y1="190" x2="700" y2="190" />
        </g>
        <path
          d="M30,160 C100,130 140,150 210,100 S330,70 390,85 S520,130 670,60 L670,220 L30,220 Z"
          fill="url(#fillBlue)"
        />
        <path
          d="M30,175 C110,170 155,150 230,145 S360,110 430,120 S540,105 670,88 L670,220 L30,220 Z"
          fill="url(#fillGold)"
        />
        <path
          d="M30,160 C100,130 140,150 210,100 S330,70 390,85 S520,130 670,60"
          fill="none"
          stroke="#1C39BB"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M30,175 C110,170 155,150 230,145 S360,110 430,120 S540,105 670,88"
          fill="none"
          stroke="#F9CC5C"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

export const DashboardSection = memo(function DashboardSection() {
  return (
    <section
      className={`${layoutStyles.section} ${layoutStyles.container}`}
      id="dashboard"
    >
      <div className={layoutStyles.sectionHead}>
        <div>
          <Eyebrow>Dashboard preview</Eyebrow>
          <h2>Application shell and analytics layout</h2>
          <p>
            A branded preview showing how the design system scales into a modern
            portal or monitoring dashboard.
          </p>
        </div>
      </div>

      <div className={styles.dashboardShell}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <div className={styles.brandMark} aria-hidden="true">
              AA
            </div>
            <div className={styles.brandName}>
              AA <span>|</span> Innovations
            </div>
          </div>
          <nav className={styles.sideNav} aria-label="Dashboard navigation">
            {SIDEBAR_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.sideLink} ${link.active ? styles.sideLinkActive : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className={styles.dashboardMain}>
          <div className={styles.dashTop}>
            <div>
              <h3>Executive risk and controls dashboard</h3>
              <p>
                Use Persian Blue for structure, Soft Warm Gold for spotlight
                metrics, and neutral space for clarity.
              </p>
            </div>
            <div className={styles.buttonRow}>
              <Button variant="secondary" size="sm">
                Export PDF
              </Button>
              <Button variant="accent" size="sm">
                Create Summary
              </Button>
            </div>
          </div>

          <div className={styles.kpiGrid}>
            {DASHBOARD_KPIS.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </div>

          <div className={styles.splitGrid}>
            <div className={styles.chartBox}>
              <div className={styles.chartHeader}>
                <h4>Quarterly control health</h4>
                <Badge variant="primary">Primary data narrative</Badge>
              </div>
              <LineChart />
            </div>

            <div className={styles.activityBox}>
              <h4>Recent activity</h4>
              {ACTIVITY_FEED.map((item) => (
                <ActivityItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
