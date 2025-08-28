import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export default function useIsOpsUser() {
  const { user } = useUser();
  const [isOpsUser, setIsOpsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const key = `is_ops_user:${user.id}`;
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { value, exp } = JSON.parse(cached);
        if (exp > Date.now()) {
          setIsOpsUser(Boolean(value));
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      /* ignore malformed cache */
    }

    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ops-users/${user.id}/check`, {
          credentials: 'include',
          signal: controller.signal,
        });
        const data = res.ok ? await res.json() : { is_ops_user: false };
        const value = Boolean(data?.is_ops_user);
        setIsOpsUser(value);
        try {
          localStorage.setItem(
            key,
            JSON.stringify({ value, exp: Date.now() + CACHE_TTL_MS })
          );
        } catch (e) {
          /* ignore storage errors */
        }
      } catch (e) {
        setIsOpsUser(false);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [user]);

  return { isOpsUser, loading };
}
