'use client';

import { useSession } from 'next-auth/react';

export function useEsPremium(): boolean {
  const { data: session } = useSession();
  return !!session?.user?.hasPaid;
}
