import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_SMS_API_URL || 'http://localhost:9000/api/v1';

const SMS_ACCESS_KEY = 'sms_access_token';
const SMS_REFRESH_KEY = 'sms_refresh_token';

export const smsTokenStore = {
  getAccess: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SMS_ACCESS_KEY);
  },
  getRefresh: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SMS_REFRESH_KEY);
  },
  set: (access: string, refresh: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SMS_ACCESS_KEY, access);
    localStorage.setItem(SMS_REFRESH_KEY, refresh);
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SMS_ACCESS_KEY);
    localStorage.removeItem(SMS_REFRESH_KEY);
  },
};

const smsClient = axios.create({ baseURL: BASE_URL });

// Attach Bearer token to every request
smsClient.interceptors.request.use((config) => {
  const token = smsTokenStore.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

smsClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = smsTokenStore.getRefresh();
      if (!refreshToken) {
        smsTokenStore.clear();
        if (typeof window !== 'undefined') {
          window.location.href = '/subscriber/login';
        }
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token: string) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(smsClient(original));
          });
        });
      }
      isRefreshing = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        smsTokenStore.set(data.access_token, data.refresh_token);
        refreshQueue.forEach((cb) => cb(data.access_token));
        refreshQueue = [];
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return smsClient(original);
      } catch {
        smsTokenStore.clear();
        if (typeof window !== 'undefined') {
          window.location.href = '/subscriber/login';
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

// ── Auth ──────────────────────────────────────────────────────────────────────

export const smsAuth = {
  register: (data: {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    full_name: string;
    company_name?: string;
  }) => smsClient.post('/auth/subscriber/register', data).then((r) => r.data),

  login: (email: string, password: string) =>
    smsClient.post('/auth/subscriber/login', { email, password }).then((r) => r.data),

  logout: () => smsClient.post('/auth/subscriber/logout').then((r) => r.data),

  forgotPassword: (email: string) =>
    smsClient.post('/auth/subscriber/forgot-password', { email }).then((r) => r.data),

  resetPassword: (
    token: string,
    new_password: string,
    confirm_password: string,
  ) =>
    smsClient
      .post('/auth/subscriber/reset-password', { token, new_password, confirm_password })
      .then((r) => r.data),

  verifyEmail: (token: string) =>
    smsClient.post('/auth/subscriber/verify-email', { token }).then((r) => r.data),

  getGoogleOAuthUrl: () =>
    smsClient.get('/auth/subscriber/oauth/google/authorize').then((r) => r.data),

  getGithubOAuthUrl: () =>
    smsClient.get('/auth/subscriber/oauth/github/authorize').then((r) => r.data),
};

// ── Profile ───────────────────────────────────────────────────────────────────

export const smsProfile = {
  getMe: () => smsClient.get('/me').then((r) => r.data),

  updateMe: (data: {
    full_name?: string;
    company_name?: string;
    country?: string;
    timezone?: string;
  }) => smsClient.patch('/me', data).then((r) => r.data),

  changePassword: (data: {
    current_password?: string;
    new_password: string;
    confirm_password: string;
  }) => smsClient.post('/me/change-password', data).then((r) => r.data),

  getSubscription: () => smsClient.get('/me/subscription').then((r) => r.data),
};

// ── Public Plans ──────────────────────────────────────────────────────────────

export const smsPlans = {
  list: () => smsClient.get('/public/plans').then((r) => r.data),
  getBySlug: (slug: string) =>
    smsClient.get(`/public/plans/${slug}`).then((r) => r.data),
  getFreeTrialConfig: () =>
    smsClient.get('/public/free-trial-config').then((r) => r.data),
};

// ── Checkout ──────────────────────────────────────────────────────────────────

export const smsCheckout = {
  createSession: (
    plan_slug: string,
    billing_interval: 'monthly' | 'yearly',
  ) =>
    smsClient
      .post('/checkout/create-session', { plan_slug, billing_interval })
      .then((r) => r.data),

  cancelSubscription: () =>
    smsClient.post('/checkout/cancel').then((r) => r.data),
};

// ── Error helpers ─────────────────────────────────────────────────────────────

/** Extract a user-facing message from any axios / validation error */
export function extractApiError(err: unknown): string {
  if (!axios.isAxiosError(err)) return 'An unexpected error occurred.';
  const data = err.response?.data;
  if (!data) return err.message || 'Network error.';
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail
      .map((d: { loc?: string[]; msg: string }) =>
        d.loc ? `${d.loc.slice(1).join('.')}: ${d.msg}` : d.msg,
      )
      .join(' · ');
  }
  return 'An unexpected error occurred.';
}

export default smsClient;
