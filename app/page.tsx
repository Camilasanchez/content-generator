import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const HomeClient = dynamic(
  () => import('@/components/HomeClient'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: false
  }
);

import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export const metadata: Metadata = {
  title: 'Inicio - LinkedIn Genius',
};

export default function HomePage() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}