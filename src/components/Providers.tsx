'use client';

import type { ReactNode } from 'react';
import { SubscriberAuthProvider } from '@/auth/SubscriberAuthContext';

export function Providers({ children }: { children: ReactNode }) {
  return <SubscriberAuthProvider>{children}</SubscriberAuthProvider>;
}
