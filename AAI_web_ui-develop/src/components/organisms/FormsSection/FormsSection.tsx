import { memo, useState, useCallback } from 'react';
import { Eyebrow, Badge, Input, Select, Textarea, Checkbox } from '@components/atoms';
import { Card, Tabs } from '@components/molecules';
import { FORM_TABS, SERVICE_OPTIONS, PRIORITY_OPTIONS } from '@constants/data';
import styles from './FormsSection.module.css';
import layoutStyles from '@styles/layout.module.css';

export const FormsSection = memo(function FormsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = useCallback((idx: number) => {
    setActiveTab(idx);
  }, []);

  return (
    <section
      className={`${layoutStyles.section} ${layoutStyles.container}`}
      id="forms"
    >
      <div className={layoutStyles.sectionHead}>
        <div>
          <Eyebrow>Forms + tabs</Eyebrow>
          <h2>Input patterns</h2>
          <p>
            Built for intake workflows, assessments, contact forms, client
            onboarding, and portal submissions.
          </p>
        </div>
      </div>

      <div className={layoutStyles.grid3}>
        <Card style={{ gridColumn: 'span 2' }}>
          <Tabs
            items={FORM_TABS}
            activeIndex={activeTab}
            onTabChange={handleTabChange}
          />
          <div className={styles.formGrid}>
            <Input label="Full name" placeholder="Sapna Paul" />
            <Input
              label="Work email"
              type="email"
              placeholder="name@aainnovations.com"
            />
            <Select label="Service line" options={SERVICE_OPTIONS} />
            <Select label="Priority level" options={PRIORITY_OPTIONS} />
            <div className={styles.fullWidth}>
              <Textarea
                label="Project summary"
                placeholder="Describe the initiative, current challenge, and desired outcome."
              />
            </div>
          </div>
          <div className={styles.checkRow}>
            <Checkbox label="Include executive update" defaultChecked />
            <Checkbox label="Add dashboard preview" />
            <Checkbox label="Require stakeholder approval" defaultChecked />
          </div>
        </Card>

        <Card>
          <h3>Form notes</h3>
          <p>
            Use blue focus states for trust and clarity. Avoid gold on large
            input areas; reserve it for badges, labels, or premium step markers.
          </p>
          <div className={styles.badgeRow}>
            <Badge variant="primary">Blue focus ring</Badge>
            <Badge variant="accent">Gold milestone</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
});
