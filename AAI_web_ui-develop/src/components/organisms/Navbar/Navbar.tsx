import { memo, useMemo, useCallback } from 'react';
import { Button } from '@components/atoms';
import { NAV_LINKS } from '@constants/navigation';
import { useScrollSpy } from '@hooks/useScrollSpy';
import styles from './Navbar.module.css';

export const Navbar = memo(function Navbar() {
  const sectionIds = useMemo(
    () => NAV_LINKS.map((l) => l.href.replace('#', '')),
    [],
  );
  const activeId = useScrollSpy(sectionIds);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    },
    [],
  );

  return (
    <header className={styles.navbarWrap}>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden="true">
            AA
          </div>
          <div className={styles.brandName}>
            AA <span>|</span> Innovations
          </div>
        </div>

        <nav className={styles.navLinks} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                activeId === link.href.replace('#', '') ? styles.active : ''
              }
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.navActions}>
          <Button variant="secondary" size="sm">
            Download Brief
          </Button>
          <Button variant="accent" size="sm">
            Request Consultation
          </Button>
        </div>
      </div>
    </header>
  );
});
