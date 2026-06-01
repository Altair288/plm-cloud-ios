import { useAuthStore } from '@/store/auth';

/**
 * Reads auth readiness + credentials for use in route guards.
 *
 * `isReady`  – true once the Zustand store has rehydrated from SecureStore.
 *              Show a loading screen while false to avoid flash-of-login.
 *
 * `redirectTo` – the href to send the user to, or null if they can stay.
 */
export function useAuthGuard() {
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasWorkspace = useAuthStore((s) => !!s.userInfo?.currentWorkspace);

  let redirectTo: string | null = null;
  if (hasHydrated) {
    if (!isAuthenticated) redirectTo = '/(auth)/login';
    else if (!hasWorkspace) redirectTo = '/(auth)/workspace-select';
  }

  return {
    isReady: hasHydrated,
    isAuthenticated,
    hasWorkspace,
    redirectTo,
  };
}

/** Lightweight hook – only exposes userInfo + clearAuth for display components. */
export function useAuth() {
  const userInfo = useAuthStore((s) => s.userInfo);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  return { userInfo, isAuthenticated, clearAuth };
}
