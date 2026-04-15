import { memo } from 'react';
import { Eyebrow, IconChip } from '@components/atoms';
import { Card, Alert } from '@components/molecules';
import styles from './CardsSection.module.css';
import layoutStyles from '@styles/layout.module.css';

const CARDS_DATA = [
  {
    title: 'Strategy advisory',
    letter: 'S',
    description:
      'Position enterprise initiatives with clear governance, measurable outcomes, and aligned execution.',
    accent: false,
  },
  {
    title: 'Control monitoring',
    letter: 'C',
    description:
      'Monitor key risk indicators, automate evidence collection, and surface control failures faster.',
    accent: false,
  },
  {
    title: 'Executive priority',
    letter: 'E',
    description:
      'Use accent cards for featured metrics, board-ready callouts, high-priority initiatives, or premium summaries.',
    accent: true,
  },
];

export const CardsSection = memo(function CardsSection() {
  return (
    <section
      className={`${layoutStyles.section} ${layoutStyles.container}`}
      id="cards"
    >
      <div className={layoutStyles.sectionHead}>
        <div>
          <Eyebrow>Cards + alerts</Eyebrow>
          <h2>Information containers</h2>
          <p>
            Reusable patterns for consulting pages, executive summaries, and
            platform modules.
          </p>
        </div>
      </div>

      <div className={layoutStyles.grid3}>
        {CARDS_DATA.map((card) => (
          <Card key={card.title} as="article" accent={card.accent}>
            <div className={styles.cardTitle}>
              <h3>{card.title}</h3>
              <IconChip letter={card.letter} />
            </div>
            <p>{card.description}</p>
          </Card>
        ))}
      </div>

      <div className={styles.spacer} />

      <div className={styles.alertStack}>
        <Alert variant="info" icon="ℹ️" title="Info alert">
          Persian Blue works best for system notices, informational banners, and
          navigation-linked status messages.
        </Alert>
        <Alert variant="premium" icon="✦" title="Premium alert">
          Soft Warm Gold works well for elevated insights, approvals, featured
          guidance, and executive recommendations.
        </Alert>
        <Alert variant="error" icon="⚠️" title="Error alert">
          Reserve red for urgent exceptions only so the interface keeps its calm,
          credible tone.
        </Alert>
      </div>
    </section>
  );
});
