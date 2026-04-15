import { memo } from 'react';
import { Button, Badge, Eyebrow } from '@components/atoms';
import styles from './ModalSection.module.css';
import layoutStyles from '@styles/layout.module.css';

export const ModalSection = memo(function ModalSection() {
  return (
    <section
      className={`${layoutStyles.section} ${layoutStyles.container}`}
      id="modal"
    >
      <div className={layoutStyles.sectionHead}>
        <div>
          <Eyebrow>Modal preview</Eyebrow>
          <h2>Overlay interaction</h2>
          <p>
            Use this style for confirmation, approval, summary, and workflow
            handoff states.
          </p>
        </div>
      </div>

      <div className={styles.modalPreview}>
        <div className={styles.modalCard} role="dialog" aria-modal="true">
          <Badge variant="accent">Executive action</Badge>
          <h3 className={styles.modalTitle}>Publish board-ready summary?</h3>
          <p>
            This action will generate the executive snapshot using the current AA
            | Innovations theme and include highlighted gold accents for featured
            insights.
          </p>
          <div className={styles.modalActions}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Publish Summary</Button>
          </div>
        </div>
      </div>
    </section>
  );
});
