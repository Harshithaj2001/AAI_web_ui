import { lazy, Suspense, memo } from 'react';
import { HeroSection, ButtonsSection } from '@components/organisms';

const CardsSection = lazy(
  () =>
    import('@components/organisms/CardsSection').then((m) => ({
      default: m.CardsSection,
    })),
);
const FormsSection = lazy(
  () =>
    import('@components/organisms/FormsSection').then((m) => ({
      default: m.FormsSection,
    })),
);
const TablesSection = lazy(
  () =>
    import('@components/organisms/TablesSection').then((m) => ({
      default: m.TablesSection,
    })),
);
const DashboardSection = lazy(
  () =>
    import('@components/organisms/DashboardSection').then((m) => ({
      default: m.DashboardSection,
    })),
);
const ModalSection = lazy(
  () =>
    import('@components/organisms/ModalSection').then((m) => ({
      default: m.ModalSection,
    })),
);

const SectionFallback = () => (
  <div
    style={{
      minHeight: 200,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--aa-neutral-400)',
    }}
  >
    Loading...
  </div>
);

export const HomePage = memo(function HomePage() {
  return (
    <>
      <HeroSection />
      <ButtonsSection />
      <Suspense fallback={<SectionFallback />}>
        <CardsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FormsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TablesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <DashboardSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ModalSection />
      </Suspense>
    </>
  );
});
