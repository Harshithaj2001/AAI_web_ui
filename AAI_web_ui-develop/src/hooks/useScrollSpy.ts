import { useEffect, useState } from 'react';

/**
 * Observes a list of section IDs and returns the currently visible one.
 * Uses IntersectionObserver for performance instead of scroll listeners.
 */
export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: `-${offset}px 0px -40% 0px`, threshold: 0.1 },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
