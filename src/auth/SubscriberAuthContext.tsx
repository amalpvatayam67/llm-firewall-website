'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { smsAuth, smsProfile, smsTokenStore } from '../services/smsApi';

export type SubscriberUser = {
  id: number;
  username: string;
  email: string;
  full_name: string;
  company_name: string | null;
  avatar_url: string | null;
  country: string | null;
  timezone: string;
  identity_provider: string;
  is_email_verified: boolean;
  has_local_password: boolean;
  active_plan_slug: string | null;
  active_plan_name: string | null;
  created_at: string;
};

type SubscriberAuthValue = {
  subscriber: SubscriberUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSubscriber: () => Promise<void>;
};

const SubscriberAuthContext = createContext<SubscriberAuthValue | undefined>(
  undefined,
);

export function SubscriberAuthProvider({ children }: { children: ReactNode }) {
  const [subscriber, setSubscriber] = useState<SubscriberUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSubscriber = useCallback(async () => {
    if (!smsTokenStore.getAccess()) {
      setSubscriber(null);
      setLoading(false);
      return;
    }
    try {
      const me = await smsProfile.getMe();
      setSubscriber(me);
    } catch {
      smsTokenStore.clear();
      setSubscriber(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSubscriber();
  }, [refreshSubscriber]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await smsAuth.login(email, password);
    smsTokenStore.set(data.access_token, data.refresh_token);
    const me = await smsProfile.getMe();
    setSubscriber(me);
  }, []);

  const logout = useCallback(() => {
    smsAuth.logout().catch(() => {});
    smsTokenStore.clear();
    setSubscriber(null);
  }, []);

  const value = useMemo(
    () => ({
      subscriber,
      isLoggedIn: !!subscriber,
      loading,
      login,
      logout,
      refreshSubscriber,
    }),
    [subscriber, loading, login, logout, refreshSubscriber],
  );

  return (
    <SubscriberAuthContext.Provider value={value}>
      {children}
    </SubscriberAuthContext.Provider>
  );
}

export function useSubscriberAuth() {
  const ctx = useContext(SubscriberAuthContext);
  if (!ctx)
    throw new Error(
      'useSubscriberAuth must be used inside SubscriberAuthProvider',
    );
  return ctx;
}
