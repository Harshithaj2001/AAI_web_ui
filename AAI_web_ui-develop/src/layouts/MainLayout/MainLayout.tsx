import { memo, type ReactNode } from 'react';
import { Navbar, Footer } from '@components/organisms';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = memo(function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
});
