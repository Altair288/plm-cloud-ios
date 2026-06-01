import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStoreAdapter } from '@/utils/storage';
import { Config } from '@/constants/config';
import type { AuthState, UserInfo, WorkspaceSession } from '@/types/auth';

interface AuthStore extends AuthState {
  // ── Mutations ──────────────────────────────────────────────────────────────
  /** Mark the persist store as fully rehydrated (called by onRehydrateStorage). */
  setHasHydrated: (value: boolean) => void;

  /** Persist platform + optional workspace tokens after login. */
  setTokens: (opts: {
    platformToken: string;
    platformTokenName: string;
    workspaceToken?: string;
    workspaceTokenName?: string;
  }) => void;

  /** Update the workspace token pair after a workspace switch. */
  setWorkspaceToken: (token: string, tokenName: string) => void;

  /** Store user info (from GET /auth/me). */
  setUserInfo: (info: UserInfo) => void;

  /** Update workspace token + patch userInfo.currentWorkspace atomically. */
  setWorkspaceSession: (session: WorkspaceSession) => void;

  /** Wipe all auth state (logout / 401). */
  clearAuth: () => void;
}

const initialState: Omit<AuthState, '_hasHydrated'> = {
  platformToken: null,
  platformTokenName: null,
  workspaceToken: null,
  workspaceTokenName: null,
  userInfo: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      _hasHydrated: false,

      setHasHydrated: (value) => set({ _hasHydrated: value }),

      setTokens: ({ platformToken, platformTokenName, workspaceToken, workspaceTokenName }) =>
        set({
          platformToken,
          platformTokenName,
          workspaceToken: workspaceToken ?? null,
          workspaceTokenName: workspaceTokenName ?? null,
          isAuthenticated: true,
        }),

      setWorkspaceToken: (token, tokenName) =>
        set({ workspaceToken: token, workspaceTokenName: tokenName }),

      setUserInfo: (info) => set({ userInfo: info }),

      setWorkspaceSession: (session) =>
        set((state) => ({
          workspaceToken: session.workspaceToken,
          workspaceTokenName: session.workspaceTokenName,
          userInfo: state.userInfo
            ? { ...state.userInfo, currentWorkspace: session }
            : null,
        })),

      clearAuth: () =>
        set({
          ...initialState,
          // Preserve hydration flag so the guard doesn't re-show the splash
          _hasHydrated: true,
        }),
    }),
    {
      name: Config.authStorageKey,
      storage: createJSONStorage(() => secureStoreAdapter),
      // _hasHydrated is runtime-only – never persisted
      partialize: (state) => {
        const { _hasHydrated: _, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
