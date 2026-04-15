import { memo } from 'react';
import { Eyebrow, Badge } from '@components/atoms';
import { Card } from '@components/molecules';
import { CONTROL_TABLE_DATA } from '@constants/data';
import styles from './TablesSection.module.css';
import layoutStyles from '@styles/layout.module.css';

export const TablesSection = memo(function TablesSection() {
  return (
    <section
      className={`${layoutStyles.section} ${layoutStyles.container}`}
      id="tables"
    >
      <div className={layoutStyles.sectionHead}>
        <div>
          <Eyebrow>Tables + data</Eyebrow>
          <h2>Operational reporting style</h2>
          <p>
            Designed for issue logs, control testing, remediation tracking, and
            executive reporting.
          </p>
        </div>
      </div>

      <Card>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Control ID</th>
                <th>Area</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Last Review</th>
                <th>Next Action</th>
              </tr>
            </thead>
            <tbody>
              {CONTROL_TABLE_DATA.map((row) => (
                <tr
                  key={row.controlId}
                  className={row.highlighted ? styles.highlight : ''}
                >
                  <td>{row.controlId}</td>
                  <td>{row.area}</td>
                  <td>
                    <Badge variant={row.statusVariant}>{row.status}</Badge>
                  </td>
                  <td>{row.owner}</td>
                  <td>{row.lastReview}</td>
                  <td>{row.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
});
